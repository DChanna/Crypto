import { useState, useEffect } from "react";
import * as React from "react";
import { AgGridReact } from "@ag-grid-community/react";
import { ModuleRegistry } from "@ag-grid-community/core";
import "@ag-grid-community/styles/ag-grid.css";
import "@ag-grid-community/styles/ag-theme-quartz.css";
import { ClientSideRowModelModule } from "@ag-grid-community/client-side-row-model";
import { Box, Typography } from "@mui/material";

import { getSummary } from "../requests/api-requests";

ModuleRegistry.registerModules([ClientSideRowModelModule]);

const Summary = () => {
  const [summaries, setSummaries] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const summaryResponse = await getSummary();
        setSummaries(summaryResponse);
      } catch (error) {
        console.error("Error", error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const formattedData = summaries.map((item) => ({
      crypto_id: item.crypto_id,
      cryptocurrency: item.crypto_name,
      sentiment: item.social_sentiment_score === 1.0 ? "Positive" : "Negative",
      posts: item.social_count,
      articles: item.news_count,
    }));
    setData(formattedData);
  }, [summaries]);

  return (
    <Box sx={{ p: 4, backgroundColor: "background.default" }}>
      <Typography
        variant="h4"
        sx={{ mb: 4, color: "text.primary", fontWeight: "bold" }}
      >
        All Crypto-Currencies:
      </Typography>
      <RowPinningWithActions data={data} />
    </Box>
  );
};

const RowPinningWithActions = ({ data }) => {
  const columns = [
    {
      field: "cryptocurrency",
      headerName: "Cryptocurrencies",
      width: 200,
      cellStyle: { color: "#1A202C", fontWeight: "500" },
    },
    {
      field: "sentiment",
      headerName: "Overall Sentiment",
      width: 200,
      cellStyle: (params) => ({
        color: params.value === "Positive" ? "#319795" : "#E53E3E",
        fontWeight: "bold",
      }),
    },
    {
      field: "posts",
      headerName: "# of Social Media Posts",
      width: 180,
      cellStyle: { color: "#2C7A7B" },
    },
    {
      field: "articles",
      headerName: "# of News Articles",
      width: 180,
      cellStyle: { color: "#2C7A7B" },
    },
  ];

  return (
    <div
      className="ag-theme-quartz"
      style={{
        height: "600px",
        width: "100%",
        backgroundColor: "#FFFFFF",
        border: "1px solid #CBD5E0",
        borderRadius: "8px",
      }}
    >
      <AgGridReact
        rowData={data}
        columnDefs={columns}
        defaultColDef={{
          flex: 1,
          minWidth: 100,
          resizable: true,
          sortable: true,
        }}
        rowSelection="multiple"
        animateRows={true}
        enablePinning={true}
        rowStyle={{ backgroundColor: "#FFFFFF" }}
        getRowStyle={(params) => {
          if (params.node.isSelected()) {
            return { backgroundColor: "#38B2AC", color: "#FFFFFF" };
          }
        }}
      />
    </div>
  );
};

export default Summary;
