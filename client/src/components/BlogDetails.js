import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Button, InputLabel, TextField, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_URL } from "../constant";

const BlogDetails = () => {
  const [blog, setBlog] = useState();
  const id = useParams().id;
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({});
  //get blog deliats

  const getBlogDetail = async () => {
    try {
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blog/get-blog/${id}`
      );
      if (data?.success) {
        setBlog(data?.userBlog);
        setInputs({
          title: data?.userBlog.title,
          description: data?.userBlog.description,
          image: data?.userBlog.image,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getBlogDetail();
  }, [id]);
  console.log(blog);

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
      const { data } = await axios.put(
        `${BASE_URL}/api/v1/blog/update-blog/${id}`,
        {
          title: inputs.title,
          description: inputs.description,
          image: inputs.image,
          user: id,
        }
      );
      if (data?.success) {
        toast.success("Blog updated");
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
            Update A Pots
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
          <InputLabel
            sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "blod" }}
          >
            Image URL
          </InputLabel>
          <TextField
            value={inputs.image}
            onChange={handleChange}
            margin="auto"
            variant="outlined"
            name="image"
            required
          />
          <Button
            sx={{ mt: 1, mb: 1 }}
            type="submit"
            color="warning"
            variant="contained"
          >
            Update
          </Button>
        </Box>
      </form>
    </>
  );
};

export default BlogDetails;
