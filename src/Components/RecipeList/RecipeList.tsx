"use client";

import { useRecipeContext } from "@/context/recipeContext";
import { RecipeCard } from "../RecipeCard/RecipeCard";
import { EmptyRecipesContainer } from "../EmptyRecipesContainer/EmptyRecipesContainer";
import { Typography } from "@mui/material";
import theme from "@/theme/theme";
import { recipe } from "@/types/recipes";
import { motion } from "framer-motion";

export const RecipeList = () => {
    const { recipes, selectedIngredients, selectedCategories } =
        useRecipeContext();

    const { fullMatchRecipes, partialMatchRecipes } = recipes.reduce(
        (acc, recipe) => {
            const matchesCategories = selectedCategories.every((category) =>
                recipe.category?.includes(category)
            );

            if (!matchesCategories) {
                return acc;
            }

            const matchedIngredients = recipe.ingredients.filter((ingredient) =>
                selectedIngredients.includes(ingredient)
            );

            const missingIngredient = recipe.ingredients.filter(
                (ingredient) => !selectedIngredients.includes(ingredient)
            );

            if (missingIngredient.length === 0) {
                acc.fullMatchRecipes.push(recipe);
            } else if (matchedIngredients.length >= 1) {
                acc.partialMatchRecipes.push({
                    ...recipe,
                    missingIngredient,
                });
            }

            return acc;
        },
        {
            fullMatchRecipes: [] as typeof recipes,
            partialMatchRecipes: [] as recipe[],
        }
    );

    const cardVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
        exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
    };

    return (
        <section style={{ marginBottom: "5%", width: "75%" }}>
            {fullMatchRecipes.length > 0 ? (
                <>
                    <Typography className="py-4" variant="h3">
                        Puedes cocinar{" "}
                        <span style={{ color: theme.palette.primary.main }}>
                            {fullMatchRecipes.length}
                        </span>{" "}
                        recetas!
                    </Typography>
                    {fullMatchRecipes.map((recipe) => (
                        <motion.div
                            key={recipe.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <RecipeCard
                            recipe={recipe}
                            />
                        </motion.div>
                    ))}
                </>
            ) : (
                <EmptyRecipesContainer />
            )}

            {partialMatchRecipes.length > 0 && (
                <>
                    <Typography className="py-4" variant="h4">
                        También puedes intentar con estas recetas (contiene alguno de los ingredientes seleccionados):
                    </Typography>
                    {partialMatchRecipes.map((recipe) => (
                        <motion.div
                            key={recipe.id}
                            variants={cardVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                        >
                            <RecipeCard
                            recipe={recipe}
                            />
                        </motion.div>
                    ))}
                </>
            )}
        </section>
    );
};
