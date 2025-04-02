import {
  Box,
  styled,
  Typography,
  Divider,
  List,
  ListItem,
} from "@mui/material";
import theme from "@/theme/theme";
import { useState, useEffect } from "react";

const PreviewContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  height: "100%",
  width: "95%",
  backgroundColor: "#ffffff",
  borderRadius: "10px",
  margin: "10px",
  boxShadow: "14px 11px 14px -3px rgba(0,0,0,0.62)",
  [theme.breakpoints.up("md")]: {
    width: "50%",
    margin: "2%",
  },
}));

type RecipePreviewProps = {
  formik: {
    values: {
      file?: string;
      name?: string;
      description?: string;
      steps?: string[];
      category?: string;
      ingredients?: string[];
    };
  };
};

export const RecipePreview: React.FC<RecipePreviewProps> = ({ formik }) => {
  const {
    file,
    name,
    description,
    steps = [],
    ingredients = [],
  } = formik.values;

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  useEffect(() => {
    //@ts-ignore
    if (file instanceof File) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result as string);
      reader.readAsDataURL(file);
    } else if (typeof file === "string") {
      setImagePreview(file);
    } else {
      setImagePreview(null);
    }
  }, [file]);

  return (
    <PreviewContainer>
      {imagePreview && (
        <Box
          component="img"
          src={imagePreview}
          alt="Vista previa de la receta"
          sx={{
            width: "100%",
            maxHeight: 250,
            objectFit: "cover",
            borderRadius: 2,
            marginBottom: 2,
          }}
        />
      )}
      <Box width="100%">
        <Typography variant="h5" fontWeight="bold" color="primary">
          {name || "Nombre"}
        </Typography>
        <Typography variant="caption" sx={{ marginRight: 1 }}>
          📋 {steps.length} pasos
        </Typography>
        <Typography variant="caption">
          🍴 {ingredients.length} ingredientes
        </Typography>
      </Box>

      <Divider sx={{ width: "100%", marginY: 2 }} />

      <Box width="100%">
        <Typography fontWeight="bold">Descripción</Typography>
        <Typography color="text.secondary" fontSize="0.875rem">
          {description || "Descripción"}
        </Typography>
      </Box>

      <Box width="100%" marginTop={2}>
        <Typography fontWeight="bold">Ingredientes</Typography>
        <List>
          {ingredients.length > 0 ? (
            ingredients.map((ingredient, index) => (
              <ListItem key={index}>
                <Box
                  sx={{
                    backgroundColor: "primary.main",
                    height: 12,
                    width: 4,
                    marginRight: 1,
                  }}
                />
                <Typography color="text.secondary" fontSize="0.875rem">
                  {ingredient}
                </Typography>
              </ListItem>
            ))
          ) : (
            <Typography color="text.secondary" fontSize="0.875rem">
              No hay ingredientes.
            </Typography>
          )}
        </List>
      </Box>

      <Divider sx={{ width: "100%", marginY: 2 }} />

      <Box width="100%">
        <Typography fontWeight="bold">¡Manos a la obra!</Typography>
        {steps.length > 0 ? (
          steps.map((step, index) => (
            <Box key={index} marginTop={1}>
              <Typography fontWeight="bold" color="primary">
                Paso {index + 1}
              </Typography>
              <Typography color="text.secondary" fontSize="0.875rem">
                {step}
              </Typography>
            </Box>
          ))
        ) : (
          <Typography color="text.secondary" fontSize="0.875rem">
            No hay pasos definidos.
          </Typography>
        )}
      </Box>
    </PreviewContainer>
  );
};
