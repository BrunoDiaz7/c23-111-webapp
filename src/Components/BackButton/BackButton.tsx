"use client";
import { useRouter } from "next/navigation";
import ArrowBackRoundedIcon from "@mui/icons-material/ArrowBackRounded";
import { CommonButton } from "../CommonButton/CommonButton";

export const BackButton = () => {
    const router = useRouter();

    return (
        <CommonButton
            text="Inicio"
            buttonSize="small"
            variant="contained"
            startIcon={<ArrowBackRoundedIcon />}
            clickHandler={() => router.push("/")}
            sx={{
                m: "14px",
            }}
        />
    );
};
