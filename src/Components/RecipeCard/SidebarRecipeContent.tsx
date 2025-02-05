import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  Rating,
  Typography,
} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import { useState } from "react";
import Image from "next/image";
import { recipeWithRates } from "@/types/recipes";
import { addRateById } from "@/services/rates";
import { Form, CommonButton } from "@/Components";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { rateSchema } from "@/app/auth/_utils/validation/validation";
import { commentFields } from "@/app/auth/_utils/fields/fields";
import { useAuth } from "@/context/authContext";
import { usePathname } from "next/navigation";
import { privateInstance } from "@/services/axios";

type RecipeCardProps = recipeWithRates;

const backColor = (status: string | undefined) => {
  if (status === "approved") {
    return "#7bd76b";
  } else if (status === "pending") {
    return "#f48e28";
  } else {
    return "#FE645E";
  }
};

export const SidebarRecipeContent: React.FC<{
  prop: RecipeCardProps & {
    updateRates: (id: string) => void;
    updateRecipes?: () => void;
    isAdmin?: boolean;
  };
}> = ({ prop }) => {
  const {
    name,
    steps,
    ingredients,
    description,
    image,
    rates,
    rateAverage,
    updateRates,
    updateRecipes,
    status,
    _id,
  } = prop;
  const updateStatusRecipe = async (status: string) => {
    try {
       await privateInstance(`/recipes/${_id}`, {
        data: {
          status,
        },
        method: "patch",
      });
      if (updateRecipes) await updateRecipes();
      toast.success("Receta editada correctamente");
    } catch (error) {
      toast.error(`Ocurrio un error al editar la receta ${error}`);
    }
  };
  // const deleteRecipe = async () => {
  //     try {
  //         const { data } = await privateInstance(`/recipes/${_id}`, {
  //             method: "delete",
  //         });
  //         if (updateRecipes) await updateRecipes();
  //         console.log(data);
  //         toast.success("Receta rechazada");
  //     } catch (error) {
  //         toast.error("Ocurrio un error al eliminar la receta");
  //         console.log(error);
  //     }
  // };
  const { isAuthenticated } = useAuth();
  const [rating, setRating] = useState(rateAverage);
  const pathname = usePathname();
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: rateSchema,
    onSubmit: async (values) => {
      try {
        await addRate(values.comment);
      } catch (error) {
        throw error;
      }
    },
  });

  const [loading, setLoading] = useState(false);

  const convertToDate = (isoString: string) => {
    const date = new Date(isoString);
    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const year = date.getUTCFullYear(); // Año
    return `${day}-${month}-${year}`;
  };
  const { user } = useAuth();
  const userRol = user?.rol;

  const addRate = async (comment: string) => {
    try {
      setLoading(true);
      await addRateById(prop._id, {
        comment,
        rating: rating,
        reviewer: user?._id ?? "",
        recipe: prop._id,
      });
      await updateRates(prop._id);

      toast.success("¡Gracias por tu opinión!");
    } catch (error) {
      if (error) {
        toast.error(`${error}`);
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <>
      <Box className="grid grid-cols-1 gap-y-4 p-0">
        <Image
          src={image}
          alt=""
          className="aspect-video"
          width={480}
          height={480}
        />

        <Box className="px-8 flex flex-col gap-y-6">
          <Box className="flex justify-between items-center">
            <Box>
              <Typography className="font-bold text-2xl text-primary">
                {name}
              </Typography>
              <Typography variant="caption" className="mr-3">
                📋 {steps?.length || 0} pasos
              </Typography>
              <Typography variant="caption">
                🍴 {ingredients?.length || 0} ingredientes
              </Typography>
            </Box>
            <Typography className="text-gray-500 text-sm font-semibold">
              {rates?.length || 0} <StarRoundedIcon sx={{ color: "#faaf00" }} />
            </Typography>
          </Box>
          <Divider />
          <Box>
            <Typography className="font-semibold">Descripción</Typography>
            <Typography className="text-gray-500 text-sm">
              {description}
            </Typography>
          </Box>
          <Box>
            <Typography className="font-semibold">Ingredientes</Typography>
            <List className="flex flex-col gap-y-1">
              {ingredients?.map((ingredient: string, index: number) => (
                <ListItem key={index}>
                  <Box className="bg-primary h-3 w-1 mr-2 inline-block"></Box>
                  <Typography className="text-gray-500 text-sm inline">
                    {ingredient}
                  </Typography>
                </ListItem>
              ))}
            </List>
          </Box>
          <Box>
            <Typography className="font-semibold">¡Manos a la obra!</Typography>
            {steps?.map((step: string, index: number) => (
              <Box key={index}>
                <Typography className="font-semibold text-primary mt-3">
                  Paso {index + 1}
                </Typography>
                <Typography className="text-gray-500 text-sm">
                  {step}
                </Typography>
              </Box>
            ))}
          </Box>
          <Divider />

          {/* Formulario */}
          {pathname === "/user/my-recipes" ? (
            <Typography
              variant="h1"
              sx={{ color: backColor(status), textAlign: "center" }}
            >
              {status.toLocaleUpperCase()}
            </Typography>
          ) : (
            <>
              <Box component="div" className="flex flex-col gap-y-2">
                {!isAuthenticated ? (
                  <Typography className="font-semibold text-center text-red-500">
                    Necesitas iniciar sesión para dejar tu opinión
                  </Typography>
                ) : (
                  pathname === "/" && (
                    <>
                      <Typography className="font-semibold text-center">
                        ¿Qué opinas de esta receta?
                      </Typography>
                      <Box className="flex justify-center mb-3">
                        <Rating
                          name="simple-controlled"
                          value={rating}
                          disabled={!isAuthenticated}
                          onChange={(event, newValue) => {
                            setRating(Number(newValue));
                          }}
                        />
                      </Box>

                      <Form
                        fields={commentFields}
                        formik={formik}
                        disabled={!isAuthenticated}
                      >
                        <CommonButton
                          text="Enviar"
                          buttonSize="medium"
                          variant="contained"
                          fontWeight={600}
                          type="submit"
                          loading={loading}
                          disabled={!isAuthenticated}
                        />
                      </Form>
                    </>
                  )
                )}
              </Box>

              {userRol === "admin" && pathname === "/admin" ? (
                <>
                  <Button
                    color="success"
                    variant="contained"
                    onClick={() => updateStatusRecipe("approved")}
                  >
                    Aceptar
                  </Button>
                  <Button
                    className="mb-5"
                    color="error"
                    variant="contained"
                    onClick={() => updateStatusRecipe("rejected")}
                  >
                    Rechazar
                  </Button>
                </>
              ) : (
                <>
                  <Typography className="font-semibold">Comentarios</Typography>

                  {rates?.map((rate, index) => (
                    <Box className="display flex pb-5" key={rate?._id || index}>
                      <Avatar
                        alt={rate?.reviewer?.name}
                        src="/static/images/avatar/1.jpg"
                      />
                      <Box className="flex flex-col gap-y-2 ml-3 w-full">
                        <Box>
                          <div className="flex justify-between items-center">
                            <Typography className="font-xl font-normal">
                              {rate?.reviewer?.name || "Anónimo"}
                            </Typography>
                            <Typography
                              variant="caption"
                              className="text-primary font-semibold"
                            >
                              {convertToDate(rate?.createdAt)}
                            </Typography>
                          </div>
                          <Rating
                            name="read-only"
                            value={rate?.rating}
                            readOnly
                            size="small"
                          />
                        </Box>

                        <Typography className="text-gray-500 text-sm">
                          {rate?.comment}
                        </Typography>
                      </Box>
                    </Box>
                  ))}
                </>
              )}
            </>
          )}
        </Box>
      </Box>
    </>
  );
};
