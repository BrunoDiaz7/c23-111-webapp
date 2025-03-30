"use client";
import { TextField, IconButton, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Delete, Add } from "@mui/icons-material";
import { useState } from "react";
import theme from "@/theme/theme";

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
    fontSize: "12px",
  },
});

type ArrayInputProps = {
  label: string;
  formik: any;
  name: string;
  placeholder: string;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ArrayInput: React.FC<ArrayInputProps> = ({
  formik,
  name,
  label,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");

  const handleAddStep = () => {
    if (inputValue.trim() !== "") {
      const newSteps = [...formik.values.steps, inputValue];
      formik.setFieldValue("steps", newSteps);
      setInputValue("");
    }
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = formik.values.steps.filter(
      (_: any, i: number) => i !== index
    );
    formik.setFieldValue("steps", updatedSteps);
  };

  return (
    <Grid container spacing={2} size={12}>
      <Grid component={"div"} size={12} display="flex" className="flex-col">
        <Label>{label}</Label>
        <div className="flex">
          <TextField
            fullWidth
            name={name}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <IconButton onClick={handleAddStep} color="primary">
            <Add />
          </IconButton>
        </div>
      </Grid>

      {Array.isArray(formik.values.steps) &&
        formik.values.steps.map((step: string, index: number) => (
          <Grid
            component={"div"}
            size={12}
            key={index}
            display="flex"
            alignItems="center"
          >
            <TextField value={step} disabled />
            <IconButton onClick={() => handleRemoveStep(index)}>
              <Delete />
            </IconButton>
          </Grid>
        ))}
    </Grid>
  );
};
