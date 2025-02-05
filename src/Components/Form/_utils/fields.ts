import { Field } from "@/types/form";

const category = [
    "vegetariana",
    "vegana",
    "sin gluten",
    "bebidas",
    "saludable",
    "comida rápida",
  ];

export const fields: Field[] = [
        {
            name: "email",
            type: "text",
            label: "Email",
            placeholder: "example@mail.com",
            columns: 12,
        },
        {
            name: "password",
            type: "password",
            label: "Password",
            placeholder: "at least 8 characters",
            columns: 12,
        },
        {
            name: "category",
            type: "select",
            label: "Categoria",
            columns: 6,
            options: category.map((category) => ({
                value: category,
                label: category.toUpperCase(),
            })),
        },
        {
            name: "description",
            type: "text",
            label: "Descripción",
            placeholder: "Breve descripción",
            columns: 12,
        },
    ]

