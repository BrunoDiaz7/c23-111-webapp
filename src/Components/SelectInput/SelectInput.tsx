"use client";
import {
    Checkbox,
    FormControl,
    ListItemText,
    MenuItem,
    Select,
    styled,
} from "@mui/material";
import { Option } from "@/types/form";

import theme from "@/theme/theme";

const StyledSelect = styled(Select)({
    boxShadow: "none",
    textTransform: "none",
    fontWeight: 500,
    fontSize: "16px",
    fontStyle: "normal",
    lineHeight: "normal",
    width: "100%",
    height: "48px",
    "&.MuiInputBase-root": {
        borderRadius: "8px",
        border: "0.8px solid #494949",
    },
    "& .MuiFormHelperText-root": {
        fontSize: "12px",
        fontStyle: "normal",
        fontWeight: 400,
        lineHeight: "16px",
    },
    [theme.breakpoints.down("sm")]: {
        fontSize: "10px",
        border: "0.6px solid #494949",
        borderRadius: "5.6px",
        height: "34px",
    },
});

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

const StyledMenuItem = styled(MenuItem)({
    "& .MuiTypography-root": {
        [theme.breakpoints.down("sm")]: {
            fontSize: "12px",
        },
    },
    "& .MuiSvgIcon-root": {
        [theme.breakpoints.down("sm")]: {
            fontSize: "16px",
        },
    },
});

type SelectInputProps = {
    label: string;
    name: string;
    options?: Option[];
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    isMultipleSelect?: boolean;
};

const renderSelectedValue = (
    selected: string | string[],
    options?: Option[]
): string => {
    if (Array.isArray(selected)) {
        return selected
            .map((value) => {
                const selectedOption = options?.find(
                    (option) => option.value === value
                );
                return selectedOption ? selectedOption.label : "";
            })
            .join(", ");
    } else {
        const selectedOption = options?.find(
            (option) => option.value === selected
        );
        return selectedOption ? selectedOption.label : "";
    }
};

export const SelectInput: React.FC<SelectInputProps> = ({
    label,
    name,
    options,
    formik,
    isMultipleSelect = false,
}) => {
    const selectedValues = formik.values[name] || (isMultipleSelect ? [] : "");
    const selectedValueSingle = selectedValues ? selectedValues : "";

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleChange = (value: any) => {
        if (isMultipleSelect) {
            formik.handleChange({
                target: {
                    name,
                    value,
                },
            });
        } else {
            formik.handleChange({
                target: {
                    name,
                    value: value,
                },
            });
        }
    };

    return (
        <FormControl sx={{ width: "100%" }}>
            <Label>{label}</Label>
            <StyledSelect
                variant="outlined"
                name={name}
                error={!!(formik.touched[name] && formik.errors[name])}
                fullWidth
                onBlur={formik.handleBlur}
                onChange={(event) => handleChange(event.target.value)}
                value={isMultipleSelect ? selectedValues : selectedValueSingle}
                defaultValue=""
                multiple={!!isMultipleSelect}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                renderValue={(selected: any) =>
                    renderSelectedValue(selected, options)
                }
            >
                {options?.map((option: Option) => (
                    <StyledMenuItem value={option.value} key={option.value}>
                        {isMultipleSelect && (
                            <Checkbox
                                checked={
                                    selectedValues.indexOf(option.value) > -1
                                }
                            />
                        )}
                        <ListItemText primary={option.label} />
                    </StyledMenuItem>
                ))}
            </StyledSelect>
        </FormControl>
    );
};
