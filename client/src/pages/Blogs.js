import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { BASE_URL } from "../constant";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  console.log("blogs", blogs);
  //get blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get(`${BASE_URL}/api/v1/blog/all-blog`);
      if (data?.success) {
        setBlogs(data.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllBlogs();
  }, []);
  return (
    <div>
      <Grid container spacing={2} margin="auto">
        {blogs &&
          blogs.map((blog, ind) => (
            <Grid xs={12} md={4} sm={6} key={ind}>
              <BlogCard
                id={blog?._id}
                isUser={localStorage.getItem("userid") === blog?.user?._id}
                title={blog?.title}
                description={blog?.description}
                image={blog?.image}
                // username={blog?.user}
                time={blog?.createdAt}
              />
            </Grid>
          ))}
      </Grid>
    </div>
  );
};

export default Blogs;
