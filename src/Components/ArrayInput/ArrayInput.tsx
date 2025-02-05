"use client";
import { TextField, IconButton } from "@mui/material";
import Grid from "@mui/material/Grid2";
import { Delete, Add } from "@mui/icons-material";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const ArrayInput = ({ formik }: any) => {
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            (_: any, i: number) => i !== index
        );
        formik.setFieldValue("steps", updatedSteps);
    };

    return (
        <Grid container spacing={2} size={12}>
            <Grid
                component={"div"}
                size={12}
                display="flex"
                alignItems="center"
            >
                <TextField
                    fullWidth
                    label="Pasos *"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <IconButton onClick={handleAddStep} color="primary">
                    <Add />
                </IconButton>
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
