import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { Box, Typography } from "@mui/material";
import { getSentiments } from "../../../requests/api-requests";

const SentimentChart = () => {
  const [posData, setPosData] = useState([]);
  const [negData, setNegData] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        const sentimentsRequests = await getSentiments();

        // Safely parse the response
        if (Array.isArray(sentimentsRequests) && sentimentsRequests.length > 0) {
          const pos_counts = sentimentsRequests.map((item) =>
            item.positive_social_sentiment_count ?? 0
          );
          const neg_counts = sentimentsRequests.map((item) =>
            item.negative_social_sentiment_count ?? 0
          );
          const cryptoNames = sentimentsRequests.map(
            (cryptoItem) => cryptoItem.crypto_name || "Unknown"
          );

          setPosData(pos_counts);
          setNegData(neg_counts);
          setCategories(cryptoNames);
        } else {
          throw new Error("No data received from the API");
        }

        setLoaded(true);
      } catch (err) {
        setError(err.message || "Failed to load data");
        console.error("Error fetching sentiments:", err);
      }
    };

    loadData();
  }, []);

  const series = [
    {
      name: "Positive",
      data: posData,
    },
    {
      name: "Negative",
      data: negData,
    },
  ];

  const options = {
    chart: {
      height: 350,
      type: "bar",
    },
    colors: ["#2BC4A4", "#E53E3E"],
    plotOptions: {
      bar: {
        columnWidth: "45%",
      },
    },
    dataLabels: {
      enabled: false,
    },
    legend: {
      show: true,
    },
    xaxis: {
      categories: categories,
      labels: {
        style: {
          fontSize: "12px",
        },
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        padding: "16px",
        border: "1px solid #CBD5E0",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
        overflow: "hidden",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Media Sentiments For The Day
      </Typography>
      {error ? (
        <Typography color="error">{error}</Typography>
      ) : loaded ? (
        <Chart options={options} series={series} type="bar" height={450} />
      ) : (
        <Typography>Data is being loaded...</Typography>
      )}
    </Box>
  );
};

export default SentimentChart;
