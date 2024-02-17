import axios from "axios";
import React, { useEffect, useState } from "react";
import BlogCard from "../components/BlogCard";
import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2
import { BASE_URL } from "../constant";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState();
  //get user blog
  console.log(blogs, "blogs suer");

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userid");
      const { data } = await axios.get(
        `${BASE_URL}/api/v1/blog/user-blog/${id}`
      );
      if (data?.success) {
        setBlogs(data?.userBlog.blogs);
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUserBlogs();
  }, []);
  return (
    <div>
      <Grid container spacing={2} margin="auto">
        {blogs && blogs.length > 0 ? (
          blogs.map((blog, ind) => (
            <Grid xs={12} md={4} sm={6} key={ind}>
              <BlogCard
                key={ind}
                id={blog._id}
                isUser={true}
                title={blog.title}
                description={blog.description}
                image={blog.image}
                // username={blog.user.username}
                time={blog.createdAt}
              />
            </Grid>
          ))
        ) : (
          <h1>You Haven't Created a blog</h1>
        )}
      </Grid>
    </div>
  );
};

export default UserBlogs;
