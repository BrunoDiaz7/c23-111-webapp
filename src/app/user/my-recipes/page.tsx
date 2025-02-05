"use client";
import { Box, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useAuth } from "@/context/authContext";
import { getRecipeByUserId } from "@/services/recipes";
import { recipe } from "@/types/recipes";
import { MainLoader, RecipeCard, Header, AddRecipeModal } from "@/Components";
import { toast } from "react-toastify";
import Grid from "@mui/material/Grid2";

const PageContainer = styled("main")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
  alignItems: "center",
  padding: 0,
  gap: "10px",
});

const UserPage = () => {
  const { user } = useAuth();
  const [userRecipes, setUserRecipes] = useState<recipe[]>([]);
  const [loading, setLoading] = useState(true);

  const userId = user?._id;

  useEffect(() => {
    if (!userId) return;

    const fetchRecipes = async (id: string) => {
      try {
        setLoading(true);
        const response = await getRecipeByUserId(id);
        setUserRecipes(response.data.user.myRecipes);
      } catch (error) {
        toast.error(`Error al obtener recetas: ${error}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRecipes(userId);
  }, [userId]);

  return (
    <PageContainer>
      <Header sx={{ width: "100%" }} />
      <Typography sx={{ marginTop: "2%" }} variant="h1">
        Mis Recetas
      </Typography>
      <Typography variant="h2">
        Has subido{" "}
        <span style={{ color: "#F48E28" }}>{userRecipes.length}</span> recetas
      </Typography>
      <Box className='flex flex-col items-center mt-10'>
        <Typography variant="h4" sx={{fontWeight: 500}}>
          ¿Tienes más creaciones para compartir?
        </Typography>
        <AddRecipeModal />
      </Box>
      {loading ? (
        <MainLoader isOpen={loading} />
      ) : (
        <Grid container spacing={2} className="flex justify-center mt-15">
          {userRecipes?.map((recipe) => (
            <Grid key={recipe._id} size={{ lg: 5, md: 7 }}>
              <RecipeCard
                recipe={recipe}
                _id={recipe._id}
                status={recipe.status}
                sx={{ margin: "2% 0" }}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </PageContainer>
  );
};

export default UserPage;
