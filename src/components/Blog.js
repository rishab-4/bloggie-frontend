import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useStyles } from "./utils";
const Blog = ({ title, description, imageURL, userName, isUser, id }) => {
  const classes = useStyles();
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate(`/myBlogs/${id}`);
  };
  const deleteRequest = async () => {
    const res = await axios
      .delete(`http://localhost:5000/api/blog/${id}`)
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleDelete = () => {
    deleteRequest()
      .then(() => navigate("/"))
      .then(() => navigate("/blogs"));
  };
  return (
      <Card
        sx={{
          padding: 2,
          boxShadow: "5px 5px 10px #ccc",
          ":hover": {
            boxShadow: "10px 10px 20px #ccc",
          },
        }}
      >
        <CardHeader
          avatar={
            <Avatar
              className={classes.font}
              sx={{ bgcolor: "red" }}
              aria-label="recipe"
            >
              {userName ? userName.charAt(0) : ""}
            </Avatar>
          }
          title={title}
        />
        <CardMedia
          component="img"
          height="194"
          image={imageURL}
          alt="Paella dish"
        />

        <CardContent>
          <hr />
          <br />
          <Typography
            className={classes.font}
            variant="body2"
            color="text.secondary"
          >
            <b>{userName}</b> {": "} {description}
          </Typography>
        </CardContent>
        {isUser && (
          <Grid container spacing={1} direction={"row-reverse"}>
            <Grid item>
            <Button color="primary" onClick={handleEdit} variant="outlined">
              Edit
            </Button>
            </Grid>
            
            <Grid item>
            <Button color="error" onClick={handleDelete} variant="contained">
              Delete
            </Button>
            </Grid>
            
          </Grid>
        )}
      </Card>
  );
};

export default Blog;
