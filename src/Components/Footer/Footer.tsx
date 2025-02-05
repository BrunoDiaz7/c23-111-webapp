"use client";
import { CommonButton } from "../CommonButton/CommonButton";
import { styled } from "@mui/material";

const StyledFooter = styled("footer")({
    display: "flex",
    height: "35%",
    padding: "35px",
    border: "1px solid red",
    borderRadius: "10px",
    boxShadow: "0px -9px 11px -6px rgba(0,0,0,0.75)",
});

export const Footer: React.FC = () => {
    return (
        <StyledFooter>
            <CommonButton
                text="button"
                variant="contained"
                buttonSize="small"
            />
        </StyledFooter>
    );
};
