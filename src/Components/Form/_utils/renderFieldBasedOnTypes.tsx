import { BasicInput, SelectInput, ArrayInput } from "@/Components";
import { Field } from "@/types/form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const renderFieldBasedOnType = (formik: any, field: Field) => {
    switch (field.type) {
        case "text":
        case "password":
            return (
                <BasicInput
                    label={field.label}
                    formik={formik}
                    name={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    multiline={field.multiline}
                    disabled={field.disabled}
                />
            );
        case "select":
            return (
                <SelectInput
                    formik={formik}
                    label={field.label}
                    name={field.name}
                    options={field.options}
                    isMultipleSelect={field.isMultipleSelect}
                />
            );
        case "steps":
            return <ArrayInput formik={formik} />;
    }
};
