import { Box, Button, Grid, Paper, TextField, Typography } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useStyles } from "./utils";

// const labelStyles = { mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" };
const AddBlog = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    imageURL: "",
  });
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };
  const sendRequest = async () => {
    const res = await axios
      .post("http://localhost:5000/api/blog/add", {
        title: inputs.title,
        description: inputs.description,
        image: inputs.imageURL,
        user: localStorage.getItem("userId"),
      })
      .catch((err) => console.log(err));
    const data = await res.data;
    return data;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(inputs);
    sendRequest()
      .then((data) => console.log(data))
      .then(() => navigate("/blogs"));
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
        component={Paper}
          // border={3}
          // borderColor="linear-gradient(90deg, rgba(58,75,180,1) 2%, rgba(116,49,110,1) 36%, rgba(2,0,161,1) 73%, rgba(69,92,252,1) 100%)"
          borderRadius={4}
          boxShadow="8px 8px 8px #777778"
          padding={3}
          margin={"auto"}
          marginTop={3}
          display="flex"
          flexDirection={"column"}
          width={"60%"}
        >
          <Grid container direction="column" spacing={2}>
            <Grid item>
            <Typography
            className={classes.font}
            fontWeight={"bold"}
            padding={3}
            color="grey"
            variant="h3"
            textAlign={"center"}
          >
            Post Your Blog
          </Typography>
            </Grid>
            <Grid item>
            <TextField
            fullWidth={true}
            label="Title"
            className={classes.font}
            name="title"
            onChange={handleChange}
            value={inputs.title}
            margin="auto"
            variant="outlined"
          />
            </Grid>
            
            <Grid item>
            <TextField
          fullWidth={true}
          label="Image-URL"
            className={classes.font}
            name="imageURL"
            onChange={handleChange}
            value={inputs.imageURL}
            margin="auto"
            variant="outlined"
          />
            </Grid>
            <Grid item>
            <TextField
            fullWidth={true}
          label="Description"
            className={classes.font}
            multiline={true}
            rows={4}
            name="description"
            onChange={handleChange}
            value={inputs.description}
            margin="auto"
            variant="outlined"
          />
            </Grid>
            <Grid item>
              <Grid container direction="row-reverse">
                <Grid item>
                <Button
            size="large"
            variant="contained"
            color="secondary"
            type="submit"
          >
            Submit
          </Button>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </form>
    </div>
  );
};

export default AddBlog;
