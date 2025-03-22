import { useRecipeContext } from "@/context/recipeContext";
import { FilterBox, SearchBar } from "@/Components";
import {Box, Divider} from "@mui/material";
import {RestaurantRounded, CategoryRounded} from "@mui/icons-material";


export const MobileFilter = () => {
  const { ingredients, categories, selectedIngredients } = useRecipeContext();

  return (
    <>
                <Box sx={{ padding: "10px" }}>
                    <SearchBar sx={{backgroundColor: "white"}} />
                    <FilterBox
                        title="Ingredientes"
                        subtitle={ingredients.length}
                        items={ingredients} // Pasamos los ingredientes aquí
                        Icon={RestaurantRounded}
                    />
                    {selectedIngredients.length > 0 && (
                        <>
                        <Divider />
                        <FilterBox
                            title="Categorías"
                            subtitle={categories.length}
                            items={categories} // Pasamos las categorías aquí
                            Icon={CategoryRounded}
                        />
                        </>
                    )}
                </Box>
    </>
  )
};
