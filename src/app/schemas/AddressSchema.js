import * as Yup from "yup"; 

export const addressSchema = Yup.object().shape({
  street: Yup.string().required(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required")
});
