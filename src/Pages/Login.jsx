import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, TextField, Button, Box, Typography } from "@mui/material";
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from "firebase/auth";
import { useSelector, useDispatch } from "react-redux";
import { loginFailed, loginStart, loginSuccess } from "../Redux/LoginSlice";
import { authProvider, auth } from "../utils/Firebase";

const Login = () => {
  const [formdata, setFormData] = useState({
    email: "",
    password: "",
  });
  const [manualAuth, setManualAuth] = useState(false);
  const [otp, setOtp] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user, isLoggedIn, isLoading } = useSelector((state) => state.login);

  // console.log(user);

  const handleGoogleAuth = async () => {
    dispatch(loginStart());
    try {
      const result = await signInWithPopup(auth, authProvider);
      const { uid, displayName, email, photoURL } = result.user;
      // console.log(result);
      dispatch(loginSuccess({ uid, displayName, email, photoURL }));
    } catch (error) {
      dispatch(loginFailed(error.message));
      // console.error("error:", error.message);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const verifyOtp = (e) => {
    e.preventDefault();
    if (otp === "123456") {
      dispatch(loginSuccess(formdata));
      navigate("/home");
    } else {
      alert("Invalid OTP");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setManualAuth(true);
    // console.log(formdata);
  };

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
  }, [isLoggedIn]);

  return (
    <Container>
      {manualAuth ? (
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        >
          <Typography variant="h6" sx={{ mb: 1, fontWeight: "bold" }}>
            Please Enter OTP Your Default OTP is 123456
          </Typography>
          <TextField
            label="OTP"
            variant="outlined"
            name="otp"
            fullWidth
            margin="normal"
            value={otp}
            required={true}
            onChange={(e) => handleOtpChange(e)}
            // disabled={true}
          />
          <Button
            // disabled={true}
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={verifyOtp}
          >
            Verify OTP
          </Button>
        </Container>
      ) : (
        <Container
          maxWidth="xs"
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "100vh",
          }}
        >
          <Typography variant="h5" sx={{ mb: 3, fontWeight: "bold" }}>
            {isLoading ? "Logging..." : "Login"}
          </Typography>

          <form action="" onSubmit={handleSubmit}>
            <TextField
              label="Email"
              variant="outlined"
              name="email"
              fullWidth
              margin="normal"
              value={formdata.email}
              required={true}
              onChange={(e) => handleChange(e)}
              // disabled={true}
            />
            <TextField
              label="Password"
              type="password"
              name="password"
              variant="outlined"
              fullWidth
              margin="normal"
              required={true}
              value={formdata.password}
              onChange={(e) => handleChange(e)}
              // disabled={true}
            />

            <Button
              // disabled={true}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 2 }}
            >
              Login
            </Button>
          </form>

          <Button
            onClick={handleGoogleAuth}
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2, display: "flex", alignItems: "center", gap: 1 }}
            startIcon={<FaGoogle />}
          >
            Sign in with Google
          </Button>
        </Container>
      )}
    </Container>
  );
};

export default Login;
