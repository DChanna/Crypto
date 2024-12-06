import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { getTopPost } from "../../requests/api-requests";

const RedditPost = () => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    const loadData = async () => {
  
        const topPost = await getTopPost();
        setUrl(topPost.url);
 
    };

    loadData();
  }, []);

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//embed.redditmedia.com/widgets/platform.js";
    script.async = true;

    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxHeight: "300px",
        overflow: "hidden",
        margin: "auto",
        padding: 2,
        border: "1px solid #ddd",
        borderRadius: "8px",
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        Featured Reddit Post
      </Typography>
      <blockquote className="reddit-card" data-card-preview="true">
        <a href={url}> My Reddit Post</a>

      </blockquote>
    </Box>
  );
};

export default RedditPost;

/**Reference: https://codesandbox.io/p/sandbox/dreamy-wood-5zzyfw?file=%2Fsrc%2Findex.js */
