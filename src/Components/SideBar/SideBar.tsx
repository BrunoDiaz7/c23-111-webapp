import { Box, Drawer } from "@mui/material";
import RestaurantRoundedIcon from "@mui/icons-material/RestaurantRounded";
import { FilterBox, SearchBar } from "@/Components";
import { CategoryRounded } from "@mui/icons-material";
import { useRecipeContext } from "@/context/recipeContext";

export function SideBar() {
    const { ingredients, categories, selectedIngredients } = useRecipeContext();

    return (
        <Drawer
            variant="persistent"
            anchor="left"
            className="relative"
            open={true}
            sx={{
                width: "100%",
                "& .MuiDrawer-paper": {
                    width: "100%",
                    boxSizing: "border-box",
                    position: "sticky",
                },
                "& .MuiBox-root": {
                    height: "auto",
                },
            }}
        >
            <Box sx={{ padding: "10px" }}>
                <SearchBar />
                <FilterBox
                    title="Ingredientes"
                    subtitle={ingredients.length}
                    items={ingredients} // Pasamos los ingredientes aquí
                    Icon={RestaurantRoundedIcon}
                />
                {selectedIngredients.length > 0 && (
                    <FilterBox
                        title="Categorías"
                        subtitle={categories.length}
                        items={categories} // Pasamos las categorías aquí
                        Icon={CategoryRounded}
                    />
                )}
            </Box>
        </Drawer>
    );
}
