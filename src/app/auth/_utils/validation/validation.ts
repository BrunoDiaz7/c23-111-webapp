import * as Yup from "yup";

const RegExp: RegExp = /^(?=.*[0-9])(?=.*[a-zA-Z])(?=.*[@$!%*?&]).+$/;

const logInSchema = Yup.object().shape({
  email: Yup.string()
    .email("Ingresa un correo valido")
    .required("Este campo es obligatorio"),
  password: Yup.string()
    .min(6, "6 caracteres mínimo")
    .required("Este campo es obligatorio")
    .matches(
      RegExp,
      "Debe contener al menos 1 letra, 1 número y 1 carácter especial"
    ),
});

const signUpSchema = Yup.object().shape({
  name: Yup.string()
  .min(10, 'Demasiado corto')
  .max(50, 'Muy largo')
  .required('Este campo es obligatorio'),
  email: Yup.string()
  .email('Ingresa un correo valido')
  .required('Este campo es obligatorio'),
  password: Yup.string()
  .min(6, '6 caracteres minimo')
  .required('Este campo es obligatorio')
  .matches(
    RegExp,
    'Al menos 1 letra, 1 número y 1 carácter especial'
  )

})

const rateSchema = Yup.object().shape({
  comment: Yup.string()
  .min(5, 'Demasiado corto')
  .required('Este campo es obligatorio'),
})

export { logInSchema, signUpSchema, rateSchema };
