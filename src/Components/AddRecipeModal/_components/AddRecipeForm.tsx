import { useFormik } from "formik";
import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Select,
  Chip,
  MenuItem,
  IconButton,
  styled,
  FormControl,
  FormHelperText,
} from "@mui/material";
import { AddRecipeSchema } from "../_utils/validations";
import { useAuth } from "@/context/authContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { CommonButton } from "@/Components";
import WarningIcon from "@mui/icons-material/Warning";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRecipeContext } from "@/context/recipeContext";

const SectionContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "20px",
  minHeight: 400,
});

export const AddRecipeForm = () => {
  const [visible, setVisible] = useState<"section1" | "section2" | "section3">(
    "section1"
  );
  const [image, setImage] = useState(null);
  const { user } = useAuth();
  const { ingredients, categories } = useRecipeContext();
  const token = Cookies.get("token");
  const [steps, setSteps] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [stepInput, setStepInput] = useState("");
  const [loading, setLoading] = useState(false);
  const BASE_URL = process.env.NEXT_PUBLIC_API_URL;

  const formik = useFormik({
    initialValues: {
      name: "",
      description: "",
      userId: user?._id,
      steps: [],
      ingredients: [],
      category: [],
      file: null,
    },
    validationSchema: AddRecipeSchema,
    onSubmit: async (values, {resetForm}) => {
      const formData = new FormData();
      formData.append("name", values.name);
      formData.append("description", values.description);
      formData.append("userId", values.userId || "");

      selectedCategories.forEach((cat) => formData.append("category[]", cat));
      selectedIngredients.forEach((item) =>
        formData.append("ingredients[]", item)
      );
      steps.forEach((step) => formData.append("steps[]", step));
      if (image) formData.append("file", image);

      try {
        setLoading(true);
        const response = await fetch(`${BASE_URL}recipes`, {
          method: "POST",
          body: formData,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.ok) {
          toast.success("Receta subida exitosamente!");
          resetForm()
          setSelectedCategories([])
          setSelectedIngredients([])
          setImage(null)
          setSteps([])
        }
      } catch (error) {
        toast.error(`Error al subir la receta ${error}`);
      } finally {
        setLoading(false);
      }
    },
  })
  const handleRemoveCategory = (category: string) => {
    setSelectedCategories(selectedCategories.filter((cat) => cat !== category));
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddIngredient = (e: any) => {
    if (e.key === "Enter" && e.target.value.trim()) {
      e.preventDefault();
      const newIngredient = e.target.value.trim();
      if (!selectedIngredients.includes(newIngredient)) {
        setSelectedIngredients([...selectedIngredients, newIngredient]);
      }
      e.target.value = "";
    }
  };
  const handleRemoveIngredient = (ingredient: string) => {
    setSelectedIngredients(
      selectedIngredients.filter((ing) => ing !== ingredient)
    );
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddStep = (e: any) => {
    if (e.key === "Enter" && stepInput.trim()) {
      e.preventDefault();
      setSteps([...steps, stepInput.trim()]);
      setStepInput("");
    }
  };

  const handleRemoveStep = (index: number) => {
    setSteps(steps.filter((_, i) => i !== index));
  };

  // Funciones para cambiar entre secciones
  const nextStep = () => {
    if (visible === "section1") setVisible("section2");
    else if (visible === "section2") setVisible("section3");
  };

  const prevStep = () => {
    if (visible === "section3") setVisible("section2");
    else if (visible === "section2") setVisible("section1");
  };

  return (
    <Box sx={{ display: "flex", width: "100%" }}>
      <Box sx={{ width: "100%" }}>
        <form
          onSubmit={formik.handleSubmit}
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "7px",
            margin: "10px",
          }}
        >
          {/* Sección 1 */}
          {visible === "section1" && (
            <SectionContainer>
              <Typography variant="h3" sx={{ color: "#f48e28" }}>
                Nombre y una breve descripcion de tu receta
              </Typography>
              <Typography variant="body2">
                Nombre <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.name && Boolean(formik.errors.name)}
                required
                fullWidth
                helperText={
                  formik.touched.name &&
                  formik.errors.name && (
                    <>
                      <WarningIcon
                        sx={{
                          verticalAlign: "middle",
                          marginRight: "5px",
                          fontSize: "15px",
                        }}
                      />
                      <span style={{ verticalAlign: "middle" }}>
                        {formik.errors.name}
                      </span>
                    </>
                  )
                }
              />
              <Typography variant="body2">
                Descripción <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                name="description"
                multiline
                rows={4}
                value={formik.values.description}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.description &&
                  Boolean(formik.errors.description)
                }
                fullWidth
                helperText={
                  formik.touched.description &&
                  formik.errors.description && (
                    <>
                      <WarningIcon
                        sx={{
                          verticalAlign: "middle",
                          marginRight: "5px",
                          fontSize: "15px",
                        }}
                      />
                      <span style={{ verticalAlign: "middle" }}>
                        {formik.errors.description}
                      </span>
                    </>
                  )
                }
              />
            </SectionContainer>
          )}

          {/* Sección 2 */}
          {visible === "section2" && (
            <SectionContainer>
              <Typography variant="h3" sx={{ color: "#f48e28" }}>
                Categorias e Ingredientes necesarios.
              </Typography>

              <Typography variant="body2">
                Categoría <span style={{ color: "red" }}>*</span>
              </Typography>

              <FormControl
                fullWidth
                error={
                  formik.touched.category && Boolean(formik.errors.category)
                }
              >
                <Select
                  labelId="categories-label"
                  multiple
                  name="category"
                  value={selectedCategories}
                  onChange={(event) => {
                    setSelectedCategories(event.target.value as string[]);
                    formik.setFieldValue('category', event.target.value)
                  }}
                  onBlur={() => formik.setFieldTouched("categories", true)}
                  renderValue={() => null}
                >
                  {categories.map((cat) => (
                    <MenuItem key={cat} value={cat}>
                      {cat}
                    </MenuItem>
                  ))}
                </Select>

                {/* Mostrar categorías seleccionadas abajo */}
                <div>
                  {selectedCategories.map((value) => (
                    <Chip
                      key={value}
                      label={value}
                      onDelete={() => handleRemoveCategory(value)}
                      deleteIcon={<DeleteIcon />}
                    />
                  ))}
                </div>

                {formik.touched.category && formik.errors.category && (
                  <FormHelperText>
                    <WarningIcon
                      sx={{
                        verticalAlign: "middle",
                        marginRight: "5px",
                        fontSize: "15px",
                      }}
                    />
                    {formik.errors.category}
                  </FormHelperText>
                )}
              </FormControl>

              <Typography variant="body2">
                Ingredientes <span style={{ color: "red" }}>*</span>
              </Typography>

              <TextField
                label="Escribe tus ingredientes o seleccionalos"
                onKeyDown={handleAddIngredient}
                fullWidth
                onBlur={formik.handleBlur}
                error={formik.touched.ingredients && Boolean(formik.errors.ingredients)}
                helperText={
                  formik.touched.ingredients && formik.errors.ingredients && (
                    <>
                      <WarningIcon
                        sx={{
                          verticalAlign: "middle",
                          marginRight: "5px",
                          fontSize: "15px",
                        }}
                      />
                      <span style={{ verticalAlign: "middle" }}>
                        {formik.errors.ingredients}
                      </span>
                    </>
                  )
                }
              />

              <Select
                multiple
                value={selectedIngredients}
                //@ts-expect-error no error
                onChange={(e) => setSelectedIngredients(e.target.value)}
                renderValue={() => null}
                fullWidth
              >
                {ingredients.map((ingredient) => (
                  <MenuItem key={ingredient} value={ingredient}>
                    {ingredient}
                  </MenuItem>
                ))}
              </Select>

              {/* Mostrar ingredientes seleccionados abajo */}
              <div>
                {selectedIngredients.map((value) => (
                  <Chip
                    key={value}
                    label={value}
                    onDelete={() => handleRemoveIngredient(value)}
                    deleteIcon={<DeleteIcon />}
                  />
                ))}
              </div>
            </SectionContainer>
          )}

          {/* Sección 3 */}
          {visible === "section3" && (
            <SectionContainer>
              <Typography variant="h3" sx={{ color: "#f48e28" }}>
                Detalla los pasos a seguir y sube una imagen de ejemplo
              </Typography>
              <Typography variant="body2">
                Pasos a seguir <span style={{ color: "red" }}>*</span>
              </Typography>
              <TextField
                label="instrucciones para tu receta"
                value={stepInput}
                onChange={(e) => setStepInput(e.target.value)}
                onKeyDown={handleAddStep}
                fullWidth
                error={formik.touched.steps && Boolean(formik.errors.steps)}
                onBlur={formik.handleBlur}
                helperText={
                  formik.touched.steps && formik.errors.steps && (
                    <>
                      <WarningIcon
                        sx={{
                          verticalAlign: "middle",
                          marginRight: "5px",
                          fontSize: "15px",
                        }}
                      />
                      <span style={{ verticalAlign: "middle" }}>
                        {formik.errors.steps}
                      </span>
                    </>
                  )
                }
              />
              {steps.map((step, index) => (
                <Typography variant="body2" sx={{ color: "gray" }} key={index}>
                  {index + 1}. {step}
                  <IconButton
                    onClick={() => handleRemoveStep(index)}
                    size="small"
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Typography>
              ))}
              <Typography variant="body2">
                Imagen <span style={{ color: "red" }}>*</span>
              </Typography>
              <input
                type="file"
                //@ts-expect-error no error
                onChange={(e) => setImage(e.target.files[0])}
                required
              />
            </SectionContainer>
          )}

          {/* Botones de navegación */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginTop: "10px",
            }}
          >
            {visible !== "section1" && (
              <CommonButton
                text="Anterior"
                buttonSize="small"
                variant="outlined"
                clickHandler={prevStep}
              />
            )}
            {visible !== "section3" ? (
              <CommonButton
                text="Siguiente"
                buttonSize="small"
                variant="contained"
                clickHandler={nextStep}
              />
            ) : (
              <CommonButton
                text="Subir"
                buttonSize="small"
                variant="contained"
                type="submit"
                loading={loading}
              />
            )}
          </Box>
        </form>
      </Box>
    </Box>
  );
};
