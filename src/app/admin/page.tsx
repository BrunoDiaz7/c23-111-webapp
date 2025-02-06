"use client";
import { RecipeCard, Header, MainLoader } from "@/Components";
import { getRecipesByStatus } from "@/services/recipes";
import { recipe } from "@/types/recipes";
import { Box, Typography } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";

export default function AdminPage() {
    const [loading, setLoading] = useState(false);
    const [pendingRecipes, setPendingRecipes] = useState<recipe[]>([]);

    const fetchRecipes = async () => {
        try {
            setLoading(true);
            const response = await getRecipesByStatus();
            setPendingRecipes(response.data.result);
        } catch (error) {
            toast.error(`Error al obtener recetas: ${error}`);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchRecipes();
    }, []);

    return (
        <>
            {loading ? (
                <MainLoader isOpen={loading} />
            ) : (
                <>
                    <Header />
                    <Box className="flex flex-col items-center justify-center max-h-full mt-16 w-full px-5">
                        <Typography
                            variant="h1"
                            sx={{
                                textAlign: "center",
                            }}
                        >
                            ¡Bienvenido al panel de administración!
                        </Typography>

                        <Typography
                            variant="h4"
                            sx={{ textAlign: "center", mt: "10px" }}
                        >
                            Aprueba o rechaza las recetas enviadas por los
                            usuarios. ¡Gracias por mantener nuestra comunidad
                            organizada!
                        </Typography>
                        <Typography variant="h4" sx={{ marginTop: "4%" }}>
                            Hay{" "}
                            <span style={{ color: "#F48E28" }}>
                                {pendingRecipes.length}
                            </span>{" "}
                            recetas pendientes de aprobación
                        </Typography>
                        <Grid
                            className="flex justify-center mt-15"
                            container
                            spacing={2}
                        >
                            {pendingRecipes.map((recipe) => {
                                return (
                                    <Grid
                                        key={recipe.id}
                                        size={{ lg: 5, md: 7 }}
                                    >
                                        <RecipeCard
                                            sx={{ margin: "2% 0" }}
                                            key={recipe.id}
                                            recipe={recipe}
                                            _id={recipe._id}
                                            updateRecipes={fetchRecipes}
                                            status={recipe.status}
                                        />
                                    </Grid>
                                );
                            })}
                        </Grid>
                    </Box>
                </>
            )}
        </>
    );
}
