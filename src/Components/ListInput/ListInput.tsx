import { Chip, Autocomplete, TextField, Stack, styled } from "@mui/material";
import theme from "@/theme/theme";
import { useRecipeContext } from "@/context/recipeContext";

const Label = styled("label")({
  color: " #494949",
  fontSize: "15px",
  fontStyle: "normal",
  fontWeight: "500",
  lineHeight: "normal",
  marginBottom: "5px",
  "&::after": {
    content: "' *'",
    color: " #fe645e",
  },
  [theme.breakpoints.down("sm")]: {
    fontSize: "13px",
  },
});

type ListInputProps = {
  label: string;
  placeholder: string;
  name: string;
  formik: any;
};
export const ListInput: React.FC<ListInputProps> = ({
  label,
  placeholder,
  name,
  formik,
}) => {
const {ingredients} = useRecipeContext();

  return (
    <Stack sx={{ width: "100%" }}>
      <Label>{label}</Label>
      <Autocomplete
        multiple
        options={ingredients}
        value={formik.values[name] || []}
        onChange={(_, newValue) => {
          formik.setFieldValue(name, newValue);
        }}
        freeSolo
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
          placeholder={placeholder}
          error={Boolean(formik.touched[name] && formik.errors[name])}
          helperText={formik.touched[name] && formik.errors[name]}
        />
        )}
      />
    </Stack>
  );
};
