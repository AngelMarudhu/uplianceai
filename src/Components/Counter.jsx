import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Box, Typography } from "@mui/material";
import { increament, decrement, reset } from "../Redux/CounterSlice";
import { useSpring, animated } from "@react-spring/web";

const Counter = () => {
  const dispatch = useDispatch();
  const count = useSelector((state) => state.counter.value);

  const spring = useSpring({
    from: { opacity: 0, scale: 0.8 },
    to: { opacity: 1, scale: 1 },
    config: { duration: 1000 },
  });

  const bgSpring = useSpring({
    //// very simple animation like the last one is transarancy of color i just used with based on count decreament value
    //// in simple terms based on transparency that's all
    backgroundColor: `rgba(0, 150, 255, ${Math.min(count / 10, 1)})`,
    //// tension how speed start the animation and friction how smooth the transition
    config: { tension: 200, friction: 20 },
  });

  return (
    <animated.div style={{ width: "100%", ...spring, ...bgSpring }}>
      <Box
        sx={{
          textAlign: "center",
          padding: "20px",
          borderRadius: "10px",
          // backgroundColor: "#f5f5f5",
          width: "auto",
          margin: "auto",
          border: "1px solid #ccc",
        }}
      >
        <Typography variant="h3" gutterBottom>
          Counter
        </Typography>
        <Typography variant="h1" gutterBottom>
          {count}
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "10px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(increament())}
            sx={{
              fontSize: { xs: "10px" },
            }}
          >
            Increament
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(decrement())}
            sx={{
              fontSize: { xs: "10px" },
            }}
          >
            Decrement
          </Button>

          <Button
            variant="contained"
            color="primary"
            onClick={() => dispatch(reset())}
            sx={{
              fontSize: { xs: "10px" },
            }}
          >
            Rest
          </Button>
        </Box>
      </Box>
    </animated.div>
  );
};

export default Counter;
