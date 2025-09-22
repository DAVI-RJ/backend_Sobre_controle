import * as Yup from 'yup';

export const userSchema = Yup.object().shape({
  name: Yup.string().required(),
  password: Yup.string().required().min(8),
  nivel_acesso: Yup.string().required(),
  status: Yup.string().required(),
});

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

export const loginSchema = Yup.object().shape({
  email: Yup.string().required("Email is required")
    .email("Email must be a valid email address"),
  password: Yup.string().required("Password is required")
});

export const addressSchema = Yup.object().shape({
  street: Yup.string().required(),
  city: Yup.string().required("City is required"),
  state: Yup.string().required("State is required")
});

const validate = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, { abortEarly: false });
    next(); 
    
  } catch (err) {
    if(err instanceof Yup.ValidationError){
      return res.status(400).json({type: "ValidationError", 
        message: "Validation failed", errors: err.errors
      });
    }
    next(err);
  }
};

export const productSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  description: Yup.string().required("Description is required"),
  price: Yup.number().required("Price is required").positive("Price must be positive"),
});

export const validateAddress = validate(addressSchema);
export const validateCompanies = validate(companiesSchema);
export const validateLogin =  validate(loginSchema)
export const validateUser = validate(userSchema);
export const validateProduct = validate(productSchema);