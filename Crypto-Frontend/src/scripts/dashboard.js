import React, { useState, useEffect } from "react";
import SocialMentionsAreaChart from "../components/socialMentionsAreaChart";
import TrendingSocialPosts from "../components/trendingSocialPosts";
import TrendingNewsArticles from "../components/trendingNews";
import NewsChart from "../components/charts/newsChart/newsPieChart";
import RedditPost from "../components/misc/redditPost";
import CryptoCard from "../components/misc/cryptoCard";
import SentimentChart from "../components/charts/sentimentChart/barChart";

import { Grid, Box, Typography } from "@mui/material";
import { getTopTrendingCrypto } from "../requests/api-requests";

function Dashboard() {
  const [topSocial, setTopSocial] = useState(null);
  const [topNews, setTopNews] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const { topSocial, topNews } = await getTopTrendingCrypto();
        setTopSocial(topSocial);
        setTopNews(topNews);
      } catch (error) {
        console.error("ERROR - Crypto data could not be found.", error);
      }
    }

    fetchData();
  }, []);

  // renders the main dashboard components and charts.
  return (
    <Box
      sx={{
        minHeight: "100%",
        backgroundColor: "background.default",
        paddingBottom: "16px",
      }}
    >
      <Grid container spacing={2} sx={{ height: "100%", width: "100%", p: 4 }}>
        <Grid item xs={12}>
          <Typography variant="h4" sx={{ mb: 2 }}>
            Trending Today:
          </Typography>
        </Grid>

        <Grid item xs={12} lg={8}>
          <Grid container spacing={2}>
            {topSocial && (
              <Grid item xs={12} sm={6}>
                <TrendingSocialPosts data={topSocial} />
              </Grid>
            )}
            {topNews && (
              <Grid item xs={12} sm={6}>
                <TrendingNewsArticles data={topNews} />
              </Grid>
            )}
          </Grid>

          <Grid item xs={12} lg={12}>
            <Box
              sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}
            >
              <SocialMentionsAreaChart />
              <SentimentChart />
            </Box>
          </Grid>
        </Grid>

        <Grid item xs={12} lg={4}>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, p: 4 }}>
            <CryptoCard />
            <RedditPost />
            <NewsChart />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Dashboard;
