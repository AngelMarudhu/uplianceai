import React, { useEffect, useState } from "react";
import { Box, Button, Container, Paper, Typography } from "@mui/material";
import Counter from "../Components/Counter";
import UserForm from "../Components/UserForm";
import TextEditor from "../Components/TextEditor";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../Redux/LoginSlice";

const Home = () => {
  const [selectedComponent, setSelectedComponent] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoggedIn, isLoading } = useSelector((state) => state.login);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        mt: 4,
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: 2,
          mb: 3,
        }}
      >
        <Button
          variant="contained"
          onClick={() => setSelectedComponent("counter")}
        >
          Counter
        </Button>
        <Button
          variant="contained"
          onClick={() => setSelectedComponent("userform")}
        >
          User Form
        </Button>
        <Button
          variant="contained"
          onClick={() => setSelectedComponent("texteditor")}
        >
          Text Editor
        </Button>
        <Button onClick={handleLogout} variant="outlined">
          Logout
        </Button>
      </Box>

      <Paper
        sx={{
          width: "80%",
          height: "60vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.2)",
          border: "3px solid black",
          p: 3,
        }}
      >
        {selectedComponent === "counter" && <Counter />}
        {selectedComponent === "userform" && <UserForm />}
        {selectedComponent === "texteditor" && <TextEditor />}
        {!selectedComponent && (
          <Typography variant="h6">
            Please hit the button what you want to drop
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default Home;
