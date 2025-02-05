import React, { useEffect, useRef, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useSelector } from "react-redux";
import { Typography, Box } from "@mui/material";
import { animated, useSpring } from "@react-spring/web";

const TextEditor = () => {
  const quillRef = useRef(null);
  const [editContent, setEditContent] = useState(
    localStorage.getItem("editContent") || ""
  );
  const { users, unSaved } = useSelector((state) => {
    return state.users;
  });

  const handleChange = (value) => {
    setEditContent(value);
    localStorage.setItem("editContent", value);
  };

  useEffect(() => {
    if (users.length > 0) {
      const findLatestUser = users[users.length - 1];
      const { name, address, email, phone } = findLatestUser;

      const contentFormat = `
      <h2>Name: ${name}</h2> 
      <p><strong>Address:</strong> ${address}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      `;
      setEditContent(contentFormat);
      localStorage.setItem("editContent", contentFormat);
    }
  }, [users]);

  const textEditorAnimation = useSpring({
    from: { opacity: 0, x: -50 },
    to: { opacity: 1, x: 0 },
    config: { duration: 500 },
  });

  return (
    <Box
      sx={{
        textAlign: "center",
        padding: "20px",
        width: "100%",
        margin: "auto",
        height: "100%",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Rich Text Editor
      </Typography>
      <animated.div style={{ ...textEditorAnimation }}>
        <ReactQuill
          ref={quillRef}
          value={editContent}
          theme="snow"
          onChange={handleChange}
          placeholder="Write what you thought"
          style={{
            backgroundColor: "whitesmoke",
          }}
        />
      </animated.div>
    </Box>
  );
};

export default TextEditor;
