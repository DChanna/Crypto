import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getNews } from "../../../requests/api-requests";
import "./pieChart.css";

const NewsChart = () => {
  const [series, setSeries] = useState([]);
  const [labels, setLabels] = useState([]);

  useEffect(() => {
    const loadData = async () => {
        const newsRequests = await getNews();
        const counts = newsRequests.map((newsItem) => newsItem.news_count);
        setSeries(counts);

        const cryptoNames = newsRequests.map(
          (cryptoItem) => cryptoItem.crypto_name
        );
        setLabels(cryptoNames);
    };

    loadData();
  }, []);

  const options = {
    chart: {
      type: "pie",
    },
    labels: labels,
    colors: ["#319795", "#2C7A7B", "#2BC4A4"],
    legend: {
      show: true,
      fontSize: "14px",
      position: "bottom",
      itemMargin: {
        horizontal: 20,
        vertical: 5,
      },
      markers: {
        width: 12,
        height: 12,
      },
    },
    dataLabels: {
      style: {
        fontSize: "14px",
        fontWeight: "bold",
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "85%",
        },
      },
    },
  };

  return (
    <div className="news-component">
      <div className="text-label" style={{ fontWeight: "bold" }}>
        Active News Today
      </div>
      <div id="chart">
        <Chart options={options} series={series} type="pie" />
      </div>
    </div>
  );
};

export default NewsChart;
