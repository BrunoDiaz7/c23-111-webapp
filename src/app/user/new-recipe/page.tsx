"use client";
import { styled, Typography, Box } from "@mui/material";
import { useFormik } from "formik";
import { fields } from "./_utils";
import { Form, CommonButton, MainLoader, Header } from "@/Components";
import { useEffect, useState } from "react";
import { useRecipeContext } from "@/context/recipeContext";

const PageContainer = styled("main")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  padding: 0,
  gap: "10px",
});

const FormContainer = styled(Box)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  height: "100%",
  width: "95%",
  backgroundColor: "#ffff",
  borderRadius: "10px",
  margin: "10%",
  boxShadow: "14px 11px 14px -3px rgba(0,0,0,0.62)",
});

const NewRecipePage = () => {
  const [loading, setLoading] = useState(false);
  const { setIngredients } = useRecipeContext();

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const cachedIngredients = localStorage.getItem("ingredients");
        if (cachedIngredients) {
          setIngredients(JSON.parse(cachedIngredients));
          return;
        }
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [setIngredients]);

  const initialValues = Object.fromEntries(
    fields?.map((field: any) => [field?.name, ""])
  );

  const formik = useFormik({
    initialValues,
    onSubmit: (values) => console.log(values),
  });
  return (
    <>
      {loading ? (
        <MainLoader isOpen={loading} />
      ) : (
        <PageContainer>
          <Header sx={{ width: "100%" }} />
          <Typography sx={{ marginTop: "2%" }} variant="h1">
            Sube tu propia receta!
          </Typography>
          <Typography sx={{textAlign: "center"}} variant="h4">
            Completa los campos y aporta a nuestra gran selección de recetas.
          </Typography>
          <FormContainer sx={{ marginTop: "5%" }}>
            <Form sx={{ width: "90%" }} formik={formik} fields={fields}>
              <CommonButton
                text="Listo!"
                variant="contained"
                buttonSize="fullWidth"
                type="submit"
              />
            </Form>
          </FormContainer>
        </PageContainer>
      )}
    </>
  );
};

export default NewRecipePage;
