import React, { ReactNode } from "react";
import { Field } from "@/types/form";
import Grid from "@mui/material/Grid2";
import { renderFieldBasedOnType } from "./_utils/renderFieldBasedOnTypes";


type FormProps = {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    formik: any;
    fields: Field[];
    children: ReactNode;
    sx?: object;
    disabled?: boolean;
};

export const Form: React.FC<FormProps> = ({
    formik,
    children,
    fields,
    sx,
}) => {
    return (
        <form
            style={
                sx
                    ? Object.assign({ minHeight: "100%" }, sx)
                    : { minHeight: "100%" }
            }
            onSubmit={formik.handleSubmit}
        >
            <Grid sx={{ placeContent: "center" }} container spacing={3}>
                {fields.map((field: Field) => (
                    <Grid
                        sx={{
                            minWidth: "100%",
                            display: "flex",
                            justifyContent: "center",
                        }}
                        component={"div"}
                        size={field.columns}
                        key={field.name}
                    >
                        {renderFieldBasedOnType(formik, field)}
                    </Grid>
                ))}
                {children && (
                    <Grid
                        sx={{
                            display: "flex",
                            flexDirection: "column",
                            alignItems: "center",
                        }}
                        component={"div"}
                        size={12}
                    >
                        {children}
                    </Grid>
                )}
            </Grid>
        </form>
    );
};
