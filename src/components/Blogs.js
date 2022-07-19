import React, { useEffect, useState } from "react";
import axios from "axios";
import Blog from "./Blog";
import { Box, Grid } from "@mui/material";

const Blogs = () => {
  const [blogs, setBlogs] = useState();
  const sendRequest = async () => {
    const res = await axios
      .get("http://localhost:5000/api/blog")
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  useEffect(() => {
    sendRequest().then((data) => setBlogs(data.blogs));
  }, []);
  console.log(blogs);
  return (
    <Box sx={{paddingInline:"32px"}} >
      <Grid container direction="row" justifyContent={"space-between"}>
      {blogs &&
        blogs.map((blog, index) => (
          <Grid item xs={3}>
            <Blog
            id={blog._id}
            isUser={localStorage.getItem("userId") === blog.user._id}
            title={blog.title}
            description={blog.description}
            imageURL={blog.image}
            userName={blog.user.name}
          />
          </Grid>
        ))}
    </Grid>
    </Box>
  );
};

export default Blogs;
