"use client";
import { RecipeList, SideBar, Header, MainLoader, MobileFilter } from "@/Components";
import { Typography, Box, useMediaQuery, Theme } from "@mui/material";
import { getAllRecipes } from "@/services/recipes";
import { useEffect, useState } from "react";
import { useRecipeContext } from "@/context/recipeContext";
import Grid from "@mui/material/Grid2";
import theme from "@/theme/theme";

export default function Home() {
  const { loadRecipes, setIngredients, setCategories, setRecipes } =
    useRecipeContext();
  const [loading, setLoading] = useState(false);
  const isMobile = useMediaQuery<Theme>(() => theme.breakpoints.down("sm"))

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
        const response: any = await getAllRecipes();
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
          sx={{
            display: "grid",
            gridTemplateColumns: "20rem 1fr",
            [theme.breakpoints.down("sm")]: { gridTemplateColumns: "0 auto" },
            columnGap: 0,
            width: "100%",
            height: "100vh",
          }}
        >
            <SideBar />

          <Grid
            component="main"
            sx={{
              display: "flex",
              flexDirection: "column",
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

              {isMobile && (
                <MobileFilter />
              )}
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
