import * as Yup from "yup";

const userSchema = Yup.object().shape({
  name: Yup.string()
    .required("El campo nombre es requerido"),
  phone: Yup.number()
    .positive("El campo telefono debe contener solo numeros positivos")
    .integer("El campo telefono debe contener solo numeros enteros")
    .required("El telefono email es requerido"),
  email: Yup.string()
    .email("El campo email debe tener formato email")
    .required("El campo email es requerido"),
  cemail: Yup.string()
    .email("El campo email debe tener formato email")
    .oneOf([Yup.ref('email')], 'Los correos deben ser iguales')
    .required('El campo de confirmación de email es requerido')
});

const validateForm = async (dataForm) => {
  try {
    await userSchema.validate(dataForm)
    return { status: "success" }
  } catch (error) {
    return { status: "error", error: error.message }
  }
}

export default validateForm;
