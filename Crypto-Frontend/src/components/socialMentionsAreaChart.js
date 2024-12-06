import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getSocialMentionsData, getPast7Dates } from "../requests/api-requests";
import { Box, Typography } from "@mui/material";

const SocialMentionsBarChart = () => {
  const [chartData, setChartData] = useState([]);
  const [dateLabels, setDateLabels] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      const mentionsData = await getSocialMentionsData();
      const dates = getPast7Dates();
      setChartData(mentionsData);
      setDateLabels(dates);
    };

    loadData();
  }, []);

  const chartOptions = {
    chart: {
      type: "bar",
      toolbar: { show: false },
    },
    colors: ["#319795", "#2C7A7B", "#2BC4A4"],
    xaxis: {
      categories: dateLabels,
      title: { text: "Date (MMM DD)", style: { fontWeight: "bold" } },
    },
    yaxis: {
      title: {
        text: "Number of Social Mentions",
        style: { fontWeight: "bold" },
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "center",
      itemMargin: { vertical: 10 },
    },
    dataLabels: {
      enabled: false,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "50%",
        endingShape: "rounded",
      },
    },
  };

  return (
    <Box
      sx={{
        width: "100%",
        padding: "16px",
        border: "1px solid #CBD5E0",
        borderRadius: "8px",
        backgroundColor: "#FFFFFF",
        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
      }}
    >
      <Typography variant="h5" sx={{ mb: 2, fontWeight: "bold" }}>
        Social Media Mentions Over the Week
      </Typography>

      {chartData.length && dateLabels.length ? (
        <Chart
          options={chartOptions}
          series={chartData}
          type="bar"
          height="350px"
        />
      ) : (
        <Typography
          sx={{
            fontFamily: "'Montserrat', sans-serif",
            fontSize: "16px",
            color: "#718096",
            textAlign: "center",
          }}
        >
          Loading data...
        </Typography>
      )}
    </Box>
  );
};

export default SocialMentionsBarChart;
