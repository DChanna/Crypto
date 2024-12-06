import React from "react";
import { apiEndpoints } from "../requests/apiEndpoints";
import {
  Typography,
  Card,
  CardContent,
  Box,
  Button,
  Grid,
  TextField,
} from "@mui/material";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

const colors = {
  buttonText: "#319795",
  textPrimary: "#1A202C",
  textSecondary: "#718096",
  exampleResponseBackground: "#EDF2F7",
  textFieldBackground: "#F9FAFB",
};

const ApiDevTools = () => {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert("API Endpoint copied to clipboard!");
  };

  // renders important developer apis with copyable api endpoints and example responses as well.

  return (
    <Box sx={{ p: 4 }}>
      <Typography variant="h4" sx={{ mb: 3, color: colors.textPrimary }}>
        API Developer Tools:
      </Typography>

      <Grid container spacing={3}>
        {apiEndpoints.map((endpoint, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              variant="outlined"
              sx={{
                backgroundColor: "#FFFFFF",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                borderRadius: "8px",
              }}
            >
              <CardContent>
                <Typography
                  variant="h6"
                  sx={{ mb: 1, color: colors.textPrimary }}
                >
                  {endpoint.name}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ mb: 2, color: colors.textSecondary }}
                >
                  {endpoint.description}
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", mb: 1, color: colors.textPrimary }}
                >
                  HTTP Method:{" "}
                  <span style={{ color: colors.buttonText }}>
                    {endpoint.method}
                  </span>
                </Typography>

                <Typography
                  variant="body2"
                  sx={{ fontWeight: "bold", mb: 1, color: colors.textPrimary }}
                >
                  URL:
                </Typography>
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <TextField
                    value={endpoint.url}
                    InputProps={{
                      readOnly: true,
                    }}
                    variant="outlined"
                    fullWidth
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        backgroundColor: colors.textFieldBackground,
                      },
                    }}
                  />

                  <Button
                    variant="text"
                    size="small"
                    onClick={() => copyToClipboard(endpoint.url)}
                    startIcon={<ContentCopyIcon />}
                    sx={{
                      ml: 2,
                      color: colors.buttonText,
                      fontWeight: "bold",
                    }}
                  >
                    Copy
                  </Button>
                </Box>

                <Typography
                  variant="body2"
                  sx={{
                    mt: 2,
                    fontWeight: "bold",
                    mb: 1,
                    color: colors.textPrimary,
                  }}
                >
                  Example Response:
                </Typography>
                <pre
                  style={{
                    background: colors.exampleResponseBackground,
                    padding: "10px",
                    borderRadius: "5px",
                    fontSize: "0.9em",
                    overflowX: "auto",
                    color: colors.textSecondary,
                    fontFamily: "'Roboto Mono', monospace",
                  }}
                >
                  {endpoint.responseExample}
                </pre>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default ApiDevTools;
