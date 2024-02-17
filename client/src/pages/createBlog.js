import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { PlusOutlined } from "@ant-design/icons";
import { Form, Upload } from "antd";
import { BASE_URL } from "../constant";

const normFile = (e) => {
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};
const CreateBlog = () => {
  const id = localStorage.getItem("userid");
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    image: "",
  });
  console.log("input inputs.ids", inputs);

  //input change
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
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("image", inputs.image);
      formData.append("user", id);

      const { data } = await axios.post(
        `${BASE_URL}/api/v1/blog/create-blog`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (data?.success) {
        toast.success("Blog Created");
        navigate("/my-blogs");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box
          width={"50%"}
          border={3}
          borderRadius={10}
          padding={3}
          margin="auto"
          boxShadow={"10px 10px 20px #ccc"}
          display="flex"
          flexDirection={"column"}
          marginTop="30px"
        >
          <Typography
            variant="h2"
            textAlign={"center"}
            fontWeight="blod"
            padding={3}
            color="gray"
          >
            Create A Pots
          </Typography>
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "blod" }}
          >
            Title
          </InputLabel>
          <TextField
            value={inputs.title}
            onChange={handleChange}
            margin="auto"
            variant="outlined"
            name="title"
            required
          />

          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "blod" }}
          >
            Description
          </InputLabel>
          <TextField
            value={inputs.description}
            onChange={handleChange}
            margin="auto"
            variant="outlined"
            name="description"
            required
          />
          <Form.Item
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
          </Form.Item>
          <Button
            sx={{ mt: 1, mb: 1 }}
            type="submit"
            color="primary"
            variant="contained"
          >
            Submit
          </Button>
        </Box>
      </form>
    </>
  );
};

export default CreateBlog;
