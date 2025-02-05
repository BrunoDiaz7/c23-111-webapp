/* eslint-disable @typescript-eslint/no-unused-expressions */
"use client";
import { Dialog, DialogContent, DialogTitle, Box } from "@mui/material";
import { CommonButton } from "@/Components";
import { useState } from "react";
import { AddRecipeForm } from "./_components/AddRecipeForm";

export const AddRecipeModal = () => {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        document.activeElement instanceof HTMLElement && document.activeElement.blur(); // Quita el foco del botón
        setOpen(!open);
    };

    return (
        <>
            <CommonButton
                text="Subir receta"
                variant="contained"
                buttonSize="small"
                clickHandler={handleClick}
            />
            <Dialog
                open={open}
                onClose={handleClick}
                maxWidth="lg"
                disableAutoFocus
                disableEnforceFocus
                sx={{ gap: "15px", "& .MuiPaper-root": { minWidth: "60%" } }}
            >
                <Box
                    tabIndex={-1}
                    sx={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        width: "100%",
                        outline: "none",
                    }}
                >
                    <DialogTitle variant="h1">
                        Sube tu propia receta!
                    </DialogTitle>
                    <DialogTitle variant="h4">
                        Completa los campos y aporta a nuestra gran selección
                        de recetas
                    </DialogTitle>
                    <DialogContent sx={{ width: "80%" }}>
                        <AddRecipeForm />
                    </DialogContent>
                </Box>
            </Dialog>
        </>
    );
};
