"use client";
import { RecipeList, SideBar, Header, MainLoader } from "@/Components";
import { Typography, Box } from "@mui/material";
import { getAllRecipes } from "@/services/recipes";
import { useEffect, useState } from "react";
import { useRecipeContext } from "@/context/recipeContext";
import Grid from "@mui/material/Grid2";

export default function Home() {
  const { loadRecipes, setIngredients, setCategories, setRecipes } =
    useRecipeContext();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRecipes = async () => {
      try {
        setLoading(true);
        const cachedIngredients = localStorage.getItem("ingredients");
        const cachedCategory = localStorage.getItem("category");
        const cachedRecipes = localStorage.getItem("recipes");
        if (cachedIngredients && cachedCategory && cachedRecipes) {
          setIngredients(JSON.parse(cachedIngredients));
          setCategories(JSON.parse(cachedCategory));
          setRecipes(JSON.parse(cachedRecipes));
          return;
        }
        const response = await getAllRecipes();
        const data = await response.data.result;
        loadRecipes(data);
      } catch (error) {
        alert(error);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipes();
  }, [loadRecipes, setIngredients, setCategories, setRecipes]);
  return (
    <>
      {loading ? (
        <MainLoader isOpen={loading} />
      ) : (
        <Grid
          container
          spacing={2}
          className="grid grid-cols-[20rem_1fr]  w-screen h-screen"
        >
          <SideBar />

          <Grid
            component="main"
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "100%",
              width: "100%",
            }}
          >
            <Header />
            <Box className="flex flex-col items-center justify-center max-h-full mt-20 w-full gap-4 px-5">
              <Typography
                variant="h1"
                sx={{
                  textAlign: "center",
                }}
              >
                ¡Empieza a crear tu combinación perfecta!
              </Typography>

              <Typography variant="h4" sx={{ textAlign: "center" }}>
                Usa las etiquetas o el buscador para encontrar lo que necesitas.
              </Typography>

              <Box
                component="section"
                className="flex flex-col items-center justify-center w-full"
              >
                <RecipeList />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
