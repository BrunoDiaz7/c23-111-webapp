"use client";
import { Button, styled } from "@mui/material";
import { MouseEventHandler } from "react";

type CommonButtonProps = {
    text: string;
    clickHandler?: MouseEventHandler<HTMLButtonElement>;
    variant: "text" | "outlined" | "contained";
    buttonSize: "xsmall" | "small" | "medium" | "large" | "fullWidth";
    color?: "primary" | "secondary" | "error";
    fontWeight?: number;
    disabled?: boolean;
    type?: "submit" | "reset" | undefined;
    sx?: object;
    loading?: boolean;
    startIcon?: React.ReactNode;
    endIcon?: React.ReactNode;
};

type ButtonSize = {
    width: string;
    height: string;
};

type ButtonSizes = {
    xsmall: ButtonSize;
    small: ButtonSize;
    medium: ButtonSize;
    large: ButtonSize;
    fullWidth: ButtonSize;
};

const buttonSizes: ButtonSizes = {
    xsmall: {
        width: "85px",
        height: "55px",
    },
    small: {
        width: "152px",
        height: "39.996px",
    },
    fullWidth: {
        height: "39.996px",
        width: "100%",
    },
    medium: {
        width: "230px",
        height: "60px",
    },
    large: {
        width: "436px",
        height: "48px",
    },
};

const StyledButton = styled(Button)<{
    buttonsize: "xsmall" | "small" | "medium" | "large" | "fullWidth";
    fontWeight: number;
}>`
    box-shadow: none;
    text-transform: none;
    font-weight: ${({ fontWeight }) => fontWeight};
    font-size: 19px;
    //   font-style: normal;
    padding: 6px 12px;
    line-height: normal;
    border-radius: 15px;
    background: linear-gradient(#efab68, #f48e28);
    /* width: 100%; */
    /* max-width: ${({ buttonsize }) => buttonSizes[buttonsize].width}; */
    height: ${({ buttonsize }) => buttonSizes[buttonsize].height};
    "&:hover": {
        box-shadow: none;
    }
    "&:active": {
        box-shadow: none;
    }
    "&:focus": {
        box-shadow: none;
    }
`;

export const CommonButton: React.FC<CommonButtonProps> = ({
    text,
    variant,
    clickHandler,
    buttonSize,
    color,
    type,
    fontWeight = 300,
    disabled = false,
    sx,
    loading = false,
    startIcon,
    endIcon,
}) => {
    return (
        <StyledButton
            variant={variant}
            color={color}
            onClick={clickHandler}
            fontWeight={fontWeight}
            sx={Object.assign(
                {
                    color:
                        variant === "outlined"
                            ? color === "primary"
                                ? "#F48E28"
                                : "#F5DDC4"
                            : "#FFF",
                },
                sx
            )}
            buttonsize={buttonSize}
            disabled={disabled}
            type={type}
            loading={loading}
            startIcon={startIcon}
            endIcon={endIcon}
        >
            {text}
        </StyledButton>
    );
};
