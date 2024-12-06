import React, { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { Card, CardContent, Typography } from "@mui/material";
import { getTopCrypto } from "../../requests/api-requests";

const CryptoCard = () => {
  const [list, setList] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const cryptoResponse = await getTopCrypto();
        setList(cryptoResponse);

      } catch (error) {
        console.error("Error", error);
      }
    };

    loadData();
  }, []);

  return (
    <Card
      sx={{
        width: "100%",
        border: "1px solid #ddd",
        boxShadow: 2,
        borderRadius: "8px",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <CardContent>
        <Typography variant="h6" sx={{ marginBottom: 2, fontWeight: "bold" }}>
          Top CryptoCurrencies
        </Typography>

        <List>
          {list.map((item) => (
            <ListItem key={item.crypto_name}>
              <ListItemText
                primary={
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Typography variant="body1">
                      {item.crypto_name} ({item.symbol})
                    </Typography>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "right",
                        fontWeight: "bold",
                      }}
                    >
                      <Typography
                        variant="body1"
                        style={{ textAlign: "right" }}
                        sx={{ color: item.change > 0 ? "#319795" : "#E53E3E" }}
                      >
                        {item.change > 0 
                          ? `+${item.change.toFixed(2)}%` 
                          : `${item.change.toFixed(2)}%`}
                      </Typography>
                      <Typography variant="caption">24 Hrs</Typography>
                    </div>
                  </div>
                }
              ></ListItemText>
            </ListItem>
          ))}
        </List>
      </CardContent>
    </Card>
  );
};

export default CryptoCard;
