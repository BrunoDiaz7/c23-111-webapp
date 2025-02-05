import { Autocomplete, TextField, Chip, Stack } from "@mui/material";
import { useRecipeContext } from "@/context/recipeContext";
import theme from "@/theme/theme";

export const SearchBar = () => {
    const { ingredients, setSelectedIngredients } = useRecipeContext();

    return (
        <Stack spacing={3} sx={{ width: "100%" }}>
            <Autocomplete
                multiple
                options={ingredients}
                onChange={(event, value) => setSelectedIngredients(value)}
                getOptionLabel={(option) => option}
                defaultValue={[]}
                filterSelectedOptions
                renderTags={(value: readonly string[], getTagsProps) =>
                    value.map((option: string, index: number) => {
                        const { key, ...tagsProps } = getTagsProps({ index });
                        return (
                            <Chip
                                sx={{
                                    backgroundColor: theme.palette.primary.main,
                                    color: "white",
                                }}
                                variant="outlined"
                                label={option}
                                key={key}
                                {...tagsProps}
                            />
                        );
                    })
                }
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Ingresar ingredientes"
                        placeholder="Busca tus ingredientes"
                    />
                )}
            />
        </Stack>
    );
};
