"use client";
import { Container, styled, Typography } from "@mui/material";
import Image from "next/image";
import { CommonButton } from "@/Components";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/authContext";

const StyledContainer = styled(Container)({
    display: "flex",
    flexDirection: "column",
    textAlign: "center",
    margin: "10% 0 0 0",
    alignItems: "center",
});
export const EmptyRecipesContainer = () => {
    const { isAuthenticated } = useAuth();
    const router = useRouter()

    return (
        <StyledContainer>
            <Image
                src="/empty-state-icon.png"
                alt="No hay resultados que mostrar"
                width="100"
                height="100"
            />
            <Typography variant="h3" sx={{ color: "gray", mt: "20px" }}>
                No hay resultados.
            </Typography>

            {isAuthenticated && (
                <>
                    <Typography variant="h4">o</Typography>
                    <Typography variant="h3" sx={{ color: "gray", mb: "25px" }}>
                        Puedes subir tu propia receta
                    </Typography>
                    <CommonButton
                    text="Subir receta"
                    buttonSize="small"
                    variant="contained"
                    clickHandler={() => router.push("/user/new-recipe")} />
                </>
            )}
        </StyledContainer>
    );
};
