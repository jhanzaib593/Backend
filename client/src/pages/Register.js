import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import { BASE_URL } from "../constant";

const Register = () => {
  const navigate = useNavigate();
  // const normFile = (e) => {
  //   if (Array.isArray(e)) {
  //     return e;
  //   }
  //   return e?.fileList;
  // };
  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
    userimage: "",
  });
  console.log("inputs", inputs);
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", inputs.name);
      formData.append("email", inputs.email);
      formData.append("password", inputs.password);
      formData.append("image", inputs.image);

      const { data } = await axios.post(`${BASE_URL}/api/v1/user/register`, {
        // formData,
        // headers: {
        //   "Content-Type": "multipart/form-data",
        // },
        username: inputs.name,
        email: inputs.email,
        password: inputs.password,
        userimage: inputs.image,
      });
      if (data.success) {
        toast.success("User Register Successfully");
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
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
            Register
          </Typography>
          <TextField
            placeholder="Name"
            name="name"
            value={inputs.name}
            onChange={handleChange}
            margin="normal"
            type={"text"}
            required
          />
          <TextField
            placeholder="Email"
            name="email"
            value={inputs.email}
            onChange={handleChange}
            margin="normal"
            type={"email"}
            required
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            onChange={handleChange}
            name="password"
            margin="normal"
            type={"password"}
            required
          />
          <TextField
            placeholder="Image"
            value={inputs.image}
            onChange={handleChange}
            name="userimage"
            margin="normal"
            type={"text"}
            required
          />
          {/* <Form.Item
            style={{
              paddingLeft: 5,
              paddingRight: 5,
              paddingTop: 10,
              paddingBottom: 10,
            }}
            label="Upload"
            valuePropName="fileList"
            getValueFromEvent={normFile}
            onChange={(e) => {
              console.log("e", e.target.files);
              setInputs({
                ...inputs,
                image: e.target.files[0],
              });
            }}
          >
            <Upload action="/upload.do" listType="picture-card">
              <button
                style={{
                  border: 0,
                  background: "none",
                }}
                type="button"
              >
                <PlusOutlined />
                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Upload
                </div>
              </button>
            </Upload>
          </Form.Item> */}
          <Button
            type="submit"
            variant="contained"
            sx={{ borderRadius: 3, marginTop: 3 }}
            color="primary"
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/login")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Already Register ? Please Login
          </Button>
        </Box>
      </form>
    </>
  );
};

export default Register;
