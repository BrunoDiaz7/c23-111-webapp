import { Field } from "@/types/form";

export const logInfields: Field[] = [
    {
        name: 'email',
        type: 'text',
        label: 'Correo electrónico',
        placeholder: 'Ingresa tu correo',
        columns: 12,
    },
    {
        name: 'password',
        type: 'password',
        label: 'Contraseña',
        placeholder: 'Ingresa tu compañera',
        columns: 12,
    }
]

export const commentFields: Field[] = [
    {
        name: 'comment',
        type: 'text',
        label: 'Comentario',
        placeholder: 'Deja tu comentario',
        columns: 12,
    },

]

export const signUpFields: Field[] = [
    {
        name: 'name',
        type: 'text',
        label: 'Tu nombre',
        placeholder: 'Ingresa tu nombre',
        columns: 12
    },
    {
        name: 'email',
        type: 'text',
        label: 'Correo electrónico',
        placeholder: 'ejemplo@mail.com',
        columns: 12
    },
    {
        name: 'password',
        type: 'password',
        label: 'Contraseña',
        placeholder: 'Ingresa una contraseña',
        columns: 12
    }
]