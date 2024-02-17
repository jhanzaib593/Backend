import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "../redux/store";
import toast from "react-hot-toast";
import { BASE_URL } from "../constant";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    e.persist();
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(`${BASE_URL}/api/v1/user/login`, {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem("userid", data?.user._id);
        dispatch(authActions.login());
        toast.success("User Login Successfully");
        navigate("/");
        console.log("data", data);
      } else {
        alert("Login failed. Please check your credentials.");
        console.log("data", data);
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response && error.response.status === 401) {
          alert("Unauthorized: Invalid email or password.");
          console.error("if Error response data:", error.response?.data);
          console.error("if Error response status:", error.response?.status);
        } else {
          console.error("Error response data:", error.response?.data);
          console.error("Error response status:", error.response?.status);
          alert("An error occurred during login. Please try again later.");
        }
      } else {
        console.error("Non-Axios error:", error);
        alert("An error occurred during login. Please try again later.");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection={"column"}
          alignItems="center"
          justifyContent={"center"}
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px #ccc"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            sx={{ textTransform: "uppercase" }}
            padding={3}
            textAlign="center"
          >
            Login
          </Typography>
          <TextField
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            type="email"
            required
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type="password"
            required
          />

          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a user? Please Register
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Login;
