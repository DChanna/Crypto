import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";
import { ArrowUpward, ArrowDownward } from "@mui/icons-material";

const trendingNews = ({ data }) => {
  const isPositive = data.change > 0;

  return (
    <Card
      sx={{
        width: "100%",
        margin: 2,
        backgroundColor: "#fff",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        border: `3px solid ${isPositive ? "#319795" : "#E53E3E"}`,
        borderRadius: 2,
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 1, fontWeight: "bold" }}>
          Trending News Articles
        </Typography>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              marginRight: 2,
              color: isPositive ? "#319795" : "#E53E3E",
            }}
          >
            {data.change} Articles
          </Typography>
          {isPositive ? (
            <ArrowUpward sx={{ color: "#319795", fontSize: 28 }} />
          ) : (
            <ArrowDownward sx={{ color: "#E53E3E", fontSize: 28 }} />
          )}
        </Box>
        <Typography variant="body1" sx={{ marginTop: 1 }}>
          {data.name} ({data.symbol})
        </Typography>
      </CardContent>
    </Card>
  );
};

export default trendingNews;
