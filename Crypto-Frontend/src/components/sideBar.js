import React, { useState } from "react";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { Home, TableChart, Code, Menu } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useNavigate, useLocation } from "react-router-dom";

const SideBar = () => {
  const [drawerExpanded, setDrawerExpanded] = useState(false);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const navigate = useNavigate();
  const currentPath = useLocation();

  const menuItems = [
    { title: "Dashboard", icon: <Home />, path: "/" },
    {
      title: "Crypto Summaries",
      icon: <TableChart />,
      path: "/crypto-summaries",
    },
    { title: "API Documentation", icon: <Code />, path: "/apiDevTools" },
  ];

  const toggleDrawer = () => setDrawerExpanded((prevState) => !prevState);

  return (
    <>
      {isSmallScreen && (
        <Box
          sx={{
            position: "fixed",
            bottom: 0,
            left: 0,
            width: "100%",
            backgroundColor: "#1A202C",
            boxShadow: theme.shadows[4],
            display: "flex",
            justifyContent: "space-around",
            paddingY: 1,
            zIndex: 1200,
          }}
        >
          {menuItems.map((menuItem, idx) => (
            <IconButton
              key={idx}
              sx={{
                color:
                  currentPath.pathname === menuItem.path
                    ? "#38B2AC"
                    : "#CBD5E0",
              }}
              onClick={() => navigate(menuItem.path)}
            >
              {menuItem.icon}
            </IconButton>
          ))}
        </Box>
      )}

      {!isSmallScreen && (
        <Drawer
          variant="permanent"
          open={drawerExpanded}
          sx={{
            width: drawerExpanded ? 240 : 80,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerExpanded ? 240 : 80,
              transition: "width 0.3s ease",
              overflow: "hidden",
              boxSizing: "border-box",
              backgroundColor: "#1A202C",
              color: "#FFFFFF",
            },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              height: "100%",
              paddingY: 2,
            }}
          >
            <Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: drawerExpanded ? "flex-start" : "center",
                  paddingX: drawerExpanded ? 2 : 0,
                  marginTop: 2,
                  marginBottom: 6,
                }}
              >
                <img
                  src={require("../logo.svg").default}
                  alt="App Logo"
                  style={{
                    width: "55px",
                    height: "55px",
                  }}
                />
                {drawerExpanded && (
                  <Typography
                    variant="h6"
                    noWrap
                    sx={{
                      marginLeft: 2,
                      fontWeight: 600,
                      color: "#FFFFFF",
                    }}
                  >
                    CryptoBoard
                  </Typography>
                )}
              </Box>

              <List sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {menuItems.map((menuItem, idx) => (
                  <ListItem
                    button
                    key={idx}
                    sx={{
                      justifyContent: drawerExpanded ? "flex-start" : "center",
                      backgroundColor:
                        currentPath.pathname === menuItem.path
                          ? "#2D3748"
                          : "transparent",
                      color: "#FFFFFF",
                      "&:hover": {
                        backgroundColor: "#2D3748",
                      },
                    }}
                    onClick={() => navigate(menuItem.path)}
                  >
                    <ListItemIcon
                      sx={{
                        minWidth: 0,
                        marginRight: drawerExpanded ? 2 : 0,
                        justifyContent: "center",
                        color:
                          currentPath.pathname === menuItem.path
                            ? "#2BC4A4"
                            : "#CBD5E0",
                      }}
                    >
                      {React.cloneElement(menuItem.icon, {
                        sx: { fontSize: isSmallScreen ? "24px" : "30px" },
                      })}
                    </ListItemIcon>
                    {drawerExpanded && (
                      <ListItemText
                        primary={menuItem.title}
                        sx={{
                          color:
                            currentPath.pathname === menuItem.path
                              ? "#2BC4A4"
                              : "#FFFFFF",
                        }}
                      />
                    )}
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "flex-start",
                paddingX: 2,
              }}
            >
              <IconButton
                onClick={toggleDrawer}
                sx={{
                  color: "#FFFFFF",
                  marginRight: 1,
                }}
              >
                <Menu />
              </IconButton>
              {drawerExpanded && (
                <Typography
                  variant="body1"
                  noWrap
                  sx={{
                    fontWeight: 500,
                    color: "#FFFFFF",
                  }}
                >
                  Collapse
                </Typography>
              )}
            </Box>
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default SideBar;
