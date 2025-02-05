import * as Yup from "yup";

export const AddRecipeSchema = Yup.object().shape({
  name: Yup.string()
    .min(10, "Ingresa al menos 10 caracteres")
    .max(50, "Has excedido el límite de caracteres")
    .required("Este campo es obligatorio"),

  description: Yup.string()
  .min(10, 'Ingresa al menos 10 caracteres')
  .max(100, "Has excedido el límite de caracteres")
  .required('Este campo es obligatorio')
,
  category: Yup.array()
    .min(1, "Elige al menos una categoría")
    .required("Este campo es obligatorio"),

  ingredients: Yup.array()
  .required('Este campo es obligatorio')
,
  steps:
      Yup.array()
    .required("Este campo es obligatorio"),
});


