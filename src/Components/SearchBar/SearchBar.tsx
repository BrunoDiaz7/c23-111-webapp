import { Autocomplete, TextField, Chip, Stack } from "@mui/material";
import { useRecipeContext } from "@/context/recipeContext";
import theme from "@/theme/theme";

type SearchbarProps = {
    sx?: object
}

export const SearchBar: React.FC<SearchbarProps> = ({sx}) => {
    const { ingredients, setSelectedIngredients } = useRecipeContext();

    return (
        <Stack spacing={3} sx={{ width: "100%"}}>
            <Autocomplete
            sx={sx}
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
                    />
                )}
            />
        </Stack>
    );
};
