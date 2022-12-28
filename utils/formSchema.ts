import * as yup from "yup";

export const formSchema = yup.object({
  username: yup
    .string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters long")
    .max(28, "Username must be at most 28 characters long"),
  password: yup
    .string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long")
    .max(28, "Password must be at most 28 characters long"),
});
