import * as Yup from "yup";

export const productSchema = Yup.object({
  name: Yup.string()
    .trim()
    .required("Product name is required"),

  quantity: Yup.number()
    .typeError("Quantity must be a number")
    .positive("Quantity must be greater than 0")
    .required("Quantity is required"),

  price: Yup.number()
    .typeError("Price must be a number")
    .positive("Price must be greater than 0")
    .required("Price is required")
});
