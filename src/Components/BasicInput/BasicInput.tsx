"use client";
import { FormControl, TextField, useMediaQuery, Theme, styled } from "@mui/material";
import WarningIcon from "@mui/icons-material/Warning";
import theme from "@/theme/theme";

type BasicInputProps = {
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    helperText?: string;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    multiline?: boolean | undefined;
    disabled?: boolean;
};

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

export const BasicInput: React.FC<BasicInputProps> = ({
    label,
    name,
    type,
    placeholder,
    multiline,
    formik,
    disabled,
}) => {
    const smUp = useMediaQuery<Theme>(() => theme.breakpoints.up("sm"));
    const touchedAndError = formik.touched[name] && formik.errors[name];
    return (
        <FormControl sx={{ width: "100%" }}>
            <Label>{label}</Label>
            <TextField
                error={!!touchedAndError}
                variant="outlined"
                name={name}
                type={type}
                multiline={multiline && smUp ? true : false}
                rows={4}
                placeholder={placeholder}
                fullWidth
                disabled={disabled}
                helperText={
                    touchedAndError ? (
                        <>
                            <WarningIcon
                                sx={{
                                    verticalAlign: "middle",
                                    marginRight: "5px",
                                    fontSize: "15px",
                                }}
                            />
                            <span style={{ verticalAlign: "middle" }}>
                                {formik.errors[name]}
                            </span>
                        </>
                    ) : null
                }
                onBlur={formik.handleBlur}
                onChange={formik.handleChange}
                value={formik.values[name]}
            />
        </FormControl>
    );
};
