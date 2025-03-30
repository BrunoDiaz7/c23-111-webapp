import { Field } from "@/types/form";

export const fields: Field[] = [
  {
    name: "name",
    type: "text",
    label: "Nombre",
    placeholder: "Ingresa el nombre de la receta",
    columns: 12,
  },
  {
    name: "description",
    type: "text",
    label: "Descripción",
    multiline: true,
    placeholder: "Escribe una breve descripción",
    columns: 12,
  },
  {
    name: "category",
    type: "select",
    isMultipleSelect: true,
    options: [
      {
        label: "Vegetariana",
        value: "vegetariana",
      },
      {
        label: "Vegana",
        value: "vegana",
      },
      {
        label: "Saludable",
        value: "saludable",
      },
      {
        label: "Sin gluten",
        value: "sin gluten",
      },
      {
        label: "Bebidas",
        value: "bebidas",
      },
      {
        label: "Comida rápida",
        value: "comida rapida",
      },
    ],
    label: "Categoría",
    placeholder: "Selecciona la o las categorías apropiadas",
    columns: 12,
  },
  {
    name: "ingredients",
    type: "list",
    label: "Ingredientes",
    placeholder: "Ingresa los ingredientes necesarios",
    columns: 12,
  },
  {
    name: "steps",
    type: "steps",
    label: "Pasos a seguir",
    placeholder: "Detalla el paso a paso",
    columns: 12,
  },
  {
    name: "file",
    type: "image",
    label: "Imagen",
    placeholder: "Imagen ilustrativa",
    columns: 12,
  },
];
