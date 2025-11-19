import * as Yup from 'yup';

export const companiesSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().required("Email is required")
    .email("Email must be a valid email address"),
  password: Yup.string().required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  passwordconfirm: Yup.string().when("password", (password, field) => 
	password ? field.required().oneOf([Yup.ref("password")]) : field
	),
});