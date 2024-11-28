import * as Yup from "yup";
export const userValidationSchema = Yup.object({
  firstName: Yup.string().required("First Name is required"),
  lastName: Yup.string().required("Last Name is required"),
  email: Yup.string().required("Email is required").email("Invalid email"),
  password: Yup.string()
    .required("Password is required")
    .min(8, "Password must be atleast 8 characters")
    .matches(
      /[!@#$%^&*(),.?":{}|<>]/,
      "Password must contain at least one symbol"
    )
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Password don't match")
    .required("Confirm password is required"),
});
