import * as Yup from "yup"; 
import { loginSchema } from '../schemas/LoginSchema.js';
import { companiesSchema } from '../schemas/CompanySchema.js';
import { productSchema } from '../schemas/ProductSchema.js';
import { addressSchema } from '../schemas/AddressSchema.js';

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

export const validateAddress = validate(addressSchema);
export const validateCompanies = validate(companiesSchema);
export const validateLogin =  validate(loginSchema)
export const validateProduct = validate(productSchema);