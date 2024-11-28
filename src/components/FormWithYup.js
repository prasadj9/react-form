import React, { useState } from "react";
import * as Yup from "yup";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const FormWithYup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    age: "",
    gender: "",
    interests: [],
    birthDate: "",
  });
  const [error, setError] = useState();

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First Name is required"),
    lastName: Yup.string().required("Last Name is required"),
    email: Yup.string().required("Email is required").email("Invalid email"),
    phone: Yup.string().matches(/^\d{10}$/, "Phone must be 10 digit number"),
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

    age: Yup.number()
      .typeError("Age must be number")
      .min(18, "You must be at least 18 years old")
      .max(100, "You cannot be older than 100 years")
      .required("Age is required"),
    gender: Yup.string().required("Gender is required"),

    interests: Yup.array().min(1, "Select atleast one interest").required(),

    birthDate: Yup.date().required("Date of birth is required"),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await validationSchema.validate(formData, { abortEarly: false });
      console.log("Form Submitted", formData);
    } catch (error) {
      const newError = {};
      error.inner.forEach((err) => {
        newError[err.path] = err.message;
      });
      setError(newError);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckBoxChange = (e) => {
    const { name, checked } = e.target;
    let updatedInterests = [...formData.interests];
    if (checked) {
      updatedInterests.push(name);
    } else {
      updatedInterests = updatedInterests.filter(
        (interest) => interest !== name
      );
    }
    setFormData({ ...formData, interests: updatedInterests });
  };
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography variant="h4" sx={{ textAlign: "center" }}>
        FormWithYup
      </Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ marginTop: "40px" }}>
          <TextField
            type="text"
            name="firstName"
            value={formData.firstName}
            label="Enter First Name"
            onChange={handleChange}
            error={!!error?.firstName}
            helperText={error?.firstName || ""}
          />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <TextField
            type="text"
            name="lastName"
            value={formData.lastName}
            label="Enter Last Name"
            onChange={handleChange}
            error={!!error?.lastName}
            helperText={error?.lastName || ""}
          />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <TextField
            type="email"
            name="email"
            value={formData.email}
            label="Enter Email"
            onChange={handleChange}
            error={!!error?.email}
            helperText={error?.email || ""}
          />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <TextField
            type="text"
            name="phone"
            value={formData.phone}
            label="Enter Phone No"
            onChange={handleChange}
            error={!!error?.phone}
            helperText={error?.phone || ""}
          />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <TextField
            type="password"
            name="password"
            value={formData.password}
            label="Enter Password"
            onChange={handleChange}
            error={!!error?.password}
            helperText={error?.password || ""}
          />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <TextField
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            label="Confirm Your Password"
            onChange={handleChange}
            error={!!error?.confirmPassword}
            helperText={error?.confirmPassword || ""}
          />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <TextField
            type="number"
            name="age"
            value={formData.age}
            label="Enter Your Age"
            onChange={handleChange}
            error={!!error?.age}
            helperText={error?.age || ""}
          />
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <FormControl
            variant="filled"
            sx={{ m: 1, minWidth: 120 }}
            error={!!error?.gender}
          >
            <InputLabel id="select-gender">Gender</InputLabel>
            <Select
              labelId="select-gender"
              name="gender"
              value={formData.gender}
              fullWidth
              onChange={handleChange}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value="male"> Male </MenuItem>
              <MenuItem value="female"> Female </MenuItem>
              <MenuItem value="other"> Other </MenuItem>
            </Select>
            <FormHelperText> {error?.gender} </FormHelperText>
          </FormControl>
        </Box>

        <Box sx={{ marginTop: "20px" }}>
          <FormControl component="fieldset" error={!!error?.interests} >
            <FormLabel component="legend"> Interesets </FormLabel>
            <FormGroup>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.interests.includes("coding")}
                    name="coding"
                    onChange={handleCheckBoxChange}
                  />
                }
                label="coding"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.interests.includes("sports")}
                    name="sports"
                    onChange={handleCheckBoxChange}
                  />
                }
                label="sports"
              />
              <FormControlLabel
                control={
                  <Checkbox
                    checked={formData.interests.includes("reading")}
                    name="reading"
                    onChange={handleCheckBoxChange}
                  />
                }
                label="reading"
              />
            </FormGroup>
            <FormHelperText> {error?.interests} </FormHelperText>
          </FormControl>
        </Box>

        <Box>
          <FormControl error={!!error?.birthDate} >
            <FormLabel>Enter date</FormLabel>
            onChange={handleChange}
            <input
              type="date"
              style={{ padding: "8px", fontSize: "large" }}
              onChange={handleChange}
              name="birthDate"
              value={formData.birthDate}
              placeholder="Enter Your Birth Date"
            />
            <FormHelperText> {error?.birthDate} </FormHelperText>
          </FormControl>
        </Box>

        <Button type="submit" style={{ marginTop: "16px" }} variant="contained">
          Submit
        </Button>
      </form>
    </Box>
  );
};

export default FormWithYup;
