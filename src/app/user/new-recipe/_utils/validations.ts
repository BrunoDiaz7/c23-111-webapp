import * as Yup from "yup";

export const ValidationSchema = Yup.object().shape({
  name: Yup.string()
    .min(10, "Al menos 10 caracteres")
    .max(50, "El nombre es demasiado largo")
    .required("Este campo es obligatorio"),

  description: Yup.string()
    .min(10, "Al menos 10 caracteres")
    .max(100, "Has excedido el límite de caracteres")
    .required("Este campo es obligatorio"),

  category: Yup.array()
    .of(Yup.string())
    .min(1, "Debe seleccionar al menos una categoría")
    .required("Este campo es obligatorio"),

  ingredients: Yup.array()
    .of(
      Yup.string()
        .min(3, "Cada ingrediente debe tener al menos 3 caracteres")
        .max(15, "Cada ingrediente puede tener hasta 15 caracteres")
    )
    .min(1, "Debe agregar al menos un ingrediente")
    .max(50, "No puede agregar más de 50 ingredientes")
    .required("Este campo es obligatorio"),

  steps: Yup.array()
    .of(
      Yup.string()
        .min(5, "Cada paso debe tener al menos 5 caracteres")
        .max(250, "Cada paso puede tener hasta 250 caracteres")
    )
    .min(1, "Debe agregar al menos un paso")
    .max(30, "No puede agregar más de 30 pasos")
    .required("Este campo es obligatorio"),

  file: Yup.mixed()
    .test("fileType", "El archivo debe ser una imagen válida", (value) => {
      if (!value) return false;
      return value instanceof File && ["image/jpeg", "image/png", "image/jpg"].includes(value.type);
    })
    .required("Debe subir una imagen"),
});
