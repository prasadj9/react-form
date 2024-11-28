import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import { userValidationSchema } from "../schema";

const FormWithFormikAndYup = () => {
  const formStyle = {
    margin : "10px", 
    padding : "8px 16px",
    display : "flex",
    justifyContent : "center",
    alignItems : "center",
    flexDirection : "column",
    gap : "20px"
  }
    const  initialValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      }
  const { values, errors, touched, handleChange, handleSubmit } = useFormik({
   initialValues,
    validationSchema: userValidationSchema,
    onSubmit: (values, action) => {
      console.log("Submitted");
      console.log(values);
      alert(JSON.stringify(values, null, 2))
      action.resetForm();
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Paper component="div" elevation={12} style={{
        width : "100%",
        maxWidth : "400px",
      }} >
      <Typography variant="h4" sx={{ textAlign: "center", marginTop : "20px", fontWeight : "bolder" }}>
        Sign up
      </Typography>

      <form onSubmit={handleSubmit} style={formStyle}>
          <TextField
            type="text"
            name="firstName"
            value={values.firstName}
            label="Enter First Name"
            onChange={handleChange}
            error={touched.firstName && Boolean(errors.firstName)}
            helperText={touched.firstName && errors.firstName}
            fullWidth
            variant="standard"
            size="small"
          />

          <TextField
            type="text"
            name="lastName"
            value={values.lastName}
            label="Enter Last Name"
            onChange={handleChange}
            error={touched.lastName && Boolean(errors.lastName)}
            helperText={touched.lastName && errors.lastName}
            fullWidth
            variant="standard"
            size="small"
          />
        
          <TextField
            type="email"
            name="email"
            value={values.email}
            label="Enter Email"
            onChange={handleChange}
            error={touched.email && Boolean(errors.email)}
            helperText={touched.email && errors.email}
            fullWidth
            variant="standard"
            size="small"
          />
       
          <TextField
            type="password"
            name="password"
            value={values.password}
            label="Enter Password"
            onChange={handleChange}
            error={touched.password && Boolean(errors.password)}
            helperText={touched.password && errors.password}
            fullWidth
            variant="standard"
            size="small"
            />
       
          <TextField
            type="password"
            name="confirmPassword"
            value={values.confirmPassword}
            label="Confirm Your Password"
            onChange={handleChange}
            error={touched.confirmPassword && Boolean(errors.confirmPassword)}
            helperText={touched.confirmPassword && errors.confirmPassword}
            fullWidth
            variant="standard"
            size="small"
          />

        <Button type="submit" variant="contained">
          Submit
        </Button>
      </form>
            </Paper>
    </Box>
  );
};

export default FormWithFormikAndYup;
