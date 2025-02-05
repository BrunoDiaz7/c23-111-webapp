"use client";
import { Box, Card, Chip, Divider, styled, Typography } from "@mui/material";
import theme from "@/theme/theme";
import { useRecipeContext } from "@/context/recipeContext";

const TagsStyle = styled(Box)`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0px 6px;
    padding: 12px;
`;

const ChipStyle = styled(Chip)`
    border-color: ${theme.palette.primary.main};
    color: ${theme.palette.primary.main};
    padding: 0px 10px;
`;

const StyledCardHeader = styled(Box)`
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
`;

const StyledTextHeader = styled(Box)`
    text-align: center;
`;

type FilterBoxProps = {
    title: string;
    subtitle: number;
    items: string[];
    Icon: React.ElementType; // Componente del ícono que usará la tarjeta
};

export const FilterBox: React.FC<FilterBoxProps> = ({
    title,
    subtitle,
    items,
    Icon,
}) => {
    const {
        categories,
        selectedIngredients,
        setSelectedIngredients,
        selectedCategories,
        setSelectedCategories,
        showAll,
        setShowAll,
    } = useRecipeContext();

    const maxVisible = 7;
    const isExpanded = showAll === title;
    const visibleItems = isExpanded ? items : items.slice(0, maxVisible);

    const handleIngredientsToggle = (ingredient: string) => {
        if (selectedIngredients.includes(ingredient)) {
            setSelectedIngredients(
                selectedIngredients.filter((i) => i !== ingredient)
            );
        } else {
            setSelectedIngredients([...selectedIngredients, ingredient]);
        }
    };

    const handleCategoriesToggle = (category: string) => {
        if (selectedCategories.includes(category)) {
            setSelectedCategories(
                selectedCategories.filter((i) => i !== category)
            );
        } else {
            setSelectedCategories([...selectedCategories, category]);
        }
    };
    const isIngredient = title.toLocaleLowerCase().includes("ingredient");
    const clear = () => {
        if (isIngredient) {
            setSelectedIngredients([]);
        } else {
            setSelectedCategories([]);
        }
    };
    const hasSelectedItems = () => {
        if (isIngredient) {
            return selectedIngredients.length > 0;
        } else {
            return selectedCategories.length > 0;
        }
    };
    return (
        <>
            <Card
                sx={{
                    display: "flex",
                    flexDirection: "column",
                    maxWidth: "90%",
                    py: 1,
                    borderRadius: 2,
                    boxShadow: "none",
                }}
            >
                <StyledCardHeader>
                    <Icon
                        sx={{
                            fontSize: 70,
                            color: "primary.main",
                            backgroundColor: "secondary.main",
                            borderRadius: "50%",
                            padding: 2,
                        }}
                    />
                    <StyledTextHeader>
                        <Typography variant="body1">{title}</Typography>
                        <Typography variant="caption" sx={{ color: "gray" }}>
                            {title === "Ingredientes"
                                ? `${selectedIngredients.length} / ${subtitle} Ingredientes`
                                : `${selectedCategories.length} / ${subtitle} Categorias`}
                        </Typography>
                    </StyledTextHeader>
                </StyledCardHeader>

                <TagsStyle>
                    {visibleItems.map((item) => (
                        <ChipStyle
                            key={item}
                            className="mt-5"
                            variant={
                                selectedIngredients.includes(item) ||
                                selectedCategories.includes(item)
                                    ? "filled"
                                    : "outlined"
                            }
                            label={item}
                            onClick={() => {
                                if (categories.includes(item)) {
                                    handleCategoriesToggle(item);
                                } else {
                                    handleIngredientsToggle(item);
                                }
                            }}
                        />
                    ))}

                    {/* Boton limpiar */}
                    <ChipStyle
                        disabled={!hasSelectedItems()}
                        sx={{
                            backgroundColor: theme.palette.primary.main,
                            color: "#ffff",
                            "&:hover": {
                                color: theme.palette.primary.main, // Cambia el color del texto al hover
                            },
                        }}
                        className="mt-5"
                        variant="outlined"
                        label="Limpiar"
                        onClick={clear}
                    />
                    {!isExpanded && items.length > maxVisible && (
                        <ChipStyle
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: "#ffffff",
                                "&:hover": {
                                    color: theme.palette.primary.main, // Cambia el color del texto al hover
                                },
                            }}
                            className="mt-5 "
                            variant="outlined"
                            label="+ ver más"
                            onClick={() => setShowAll(title)}
                        />
                    )}
                    {isExpanded && (
                        <ChipStyle
                            sx={{
                                backgroundColor: theme.palette.primary.main,
                                color: "#ffff",
                                "&:hover": {
                                    color: theme.palette.primary.main, // Cambia el color del texto al hover
                                },
                            }}
                            className="mt-5"
                            variant="outlined"
                            label="ver menos"
                            onClick={() => setShowAll(null)}
                        />
                    )}
                </TagsStyle>
            </Card>
            <Divider />
        </>
    );
};
