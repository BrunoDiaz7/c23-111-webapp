/* eslint-disable no-alert, @typescript-eslint/no-explicit-any */
import { TextField, IconButton, styled } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Delete, Add, Edit, Save, Warning } from "@mui/icons-material";
import { useState } from "react";
import theme from "@/theme/theme";

const Label = styled("label")({
  color: "#494949",
  fontSize: "15px",
  fontWeight: "500",
  marginBottom: "5px",
  "&::after": {
    content: "' *'",
    color: "#fe645e",
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

export const ArrayInput: React.FC<ArrayInputProps> = ({
  formik,
  name,
  label,
  placeholder,
}) => {
  const [inputValue, setInputValue] = useState("");
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [editedValue, setEditedValue] = useState("");
  const touchedAndError = formik.touched[name] && formik.errors[name];

  const handleAddStep = () => {
    if (inputValue.trim() !== "") {
      const newSteps = [...formik.values.steps, inputValue];
      formik.setFieldValue("steps", newSteps);
      setInputValue("");
    }
  };

  const handleRemoveStep = (index: number) => {
    const updatedSteps = formik.values.steps.filter((_: any, i: number) => i !== index);
    formik.setFieldValue("steps", updatedSteps);
    if (editIndex === index) {
      setEditIndex(null);
      setEditedValue("");
    }
  };

  const handleStartEdit = (index: number, value: string) => {
    setEditIndex(index);
    setEditedValue(value);
  };

  const handleSaveEdit = () => {
    if (editIndex !== null && editedValue.trim() !== "") {
      const updatedSteps = [...formik.values.steps];
      updatedSteps[editIndex] = editedValue;
      formik.setFieldValue("steps", updatedSteps);
      setEditIndex(null);
      setEditedValue("");
    }
  };

  return (
    <Grid container spacing={2} size={12}>
      <Grid component="div" size={12} display="flex" className="flex-col">
        <Label>{label}</Label>
        <div className="flex">
          <TextField
            fullWidth
            error={Boolean(touchedAndError)}
            name={name}
            placeholder={placeholder}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                handleAddStep();
              }
            }}
            helperText={
              touchedAndError ? (
                <>
                  <Warning sx={{ verticalAlign: "middle", marginRight: "5px", fontSize: "15px" }} />
                  <span style={{ verticalAlign: "middle" }}>{formik.errors[name]}</span>
                </>
              ) : null
            }
          />
          <IconButton onClick={handleAddStep} color="primary">
            <Add />
          </IconButton>
        </div>
      </Grid>

      {Array.isArray(formik.values.steps) &&
        formik.values.steps.map((step: string, index: number) => (
          <Grid component="div" size={12} key={index} display="flex" alignItems="center" gap={1}>
            {editIndex === index ? (
              <TextField
                fullWidth
                value={editedValue}
                onChange={(e) => setEditedValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    handleSaveEdit();
                  }
                }}
              />
            ) : (
              <TextField fullWidth value={step} disabled />
            )}
            {editIndex === index ? (
              <IconButton onClick={handleSaveEdit} color="success">
                <Save />
              </IconButton>
            ) : (
              <IconButton onClick={() => handleStartEdit(index, step)} color="primary">
                <Edit />
              </IconButton>
            )}
            <IconButton onClick={() => handleRemoveStep(index)} color="error">
              <Delete />
            </IconButton>
          </Grid>
        ))}
    </Grid>
  );
};
