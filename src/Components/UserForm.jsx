import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Confetti from "react-confetti";
import { addUser, unSavedChanges } from "../Redux/UserSlice";
import { Box, Button, Typography, TextField } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";
import { motion, AnimatePresence } from "framer-motion";

const UserForm = () => {
  const [confetti, setConfetti] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
  });
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  const dispatch = useDispatch();
  const { users, unSaved } = useSelector((state) => {
    return state.users;
  });

  //   console.log(users, "user");
  //   console.log(unSaved, "unSaved");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    dispatch(unSavedChanges(true));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      address: "",
      email: "",
      phone: "",
    });
    setConfetti(true);
  };

  useEffect(() => {
    const handleBefore = (e) => {
      if (unSaved) {
        e.preventDefault();
        e.returnValue = "Are you ready to messup your data";
      }
    };

    window.addEventListener("beforeunload", handleBefore);
    return () => {
      window.removeEventListener("beforeunload", handleBefore);
    };
  }, [unSaved]);

  useEffect(() => {
    const handleResize = () => {
      setWindowHeight(window.innerHeight);
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    if (confetti) {
      setTimeout(() => {
        setConfetti(false);
      }, 5000);
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [confetti]);

  const buttonAnimation = useSpring({
    from: { opacity: 0, x: -100 },
    to: { opacity: 1, x: 0 },
    config: { duration: 500 },
  });

  const textAnimation = useSpring({
    from: { opacity: 0, x: 100 },
    to: { opacity: 1, x: 0 },
    config: { duration: 500 },
  });

  return (
    <Box>
      <AnimatePresence>
        {confetti && (
          <motion.div exit={{ opacity: 0, transition: { duration: 1 } }}>
            <Confetti width={windowWidth} height={windowHeight} />
          </motion.div>
        )}{" "}
      </AnimatePresence>

      <animated.div style={textAnimation}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          User Data Form
        </Typography>
      </animated.div>

      <animated.form onSubmit={handleSubmit} style={buttonAnimation}>
        <TextField
          type="text"
          label="Name"
          name="name"
          fullWidth
          required
          sx={{ mb: 2 }}
          onChange={(e) => handleChange(e)}
          value={formData.name}
        />
        <TextField
          type="text"
          label="Address"
          name="address"
          fullWidth
          required
          sx={{ mb: 2 }}
          onChange={(e) => handleChange(e)}
          value={formData.address}
        />
        <TextField
          type="email"
          label="Email"
          name="email"
          fullWidth
          required
          sx={{ mb: 2 }}
          onChange={(e) => handleChange(e)}
          value={formData.email}
        />
        <TextField
          type="tel"
          label="Phone"
          name="phone"
          fullWidth
          required
          sx={{ mb: 2 }}
          onChange={(e) => handleChange(e)}
          value={formData.phone}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Save User
        </Button>
      </animated.form>
    </Box>
  );
};

export default UserForm;
