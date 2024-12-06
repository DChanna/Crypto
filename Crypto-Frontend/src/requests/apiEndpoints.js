import { api } from "./api-requests";

export const apiEndpoints = [
  {
    name: "getTopPost",
    description:
      "Fetches the top reddit post that mentions cryptocurrencies based on score of post.",
    method: "GET",
    url: `${api}/top-post`,
    requestBody: null,
    responseExample: `{
    "id": Int,
    "url": String
  }`,
  },
  {
    name: "getTotals",
    description:
      "Retrieves the total counts of news articles and social media posts within a specified time window (24 hours).",
    method: "GET",
    url: `${api}/totals`,
    requestBody: null,
    responseExample: `{
    "news_count": Int,
    "social_count": Int
  }`,
  },
  {
    name: "getTopCrypto",
    description:
      "Provides a list of top 3 cryptocurrencies of the day and percentage of change of social media mentions count (between the previous day and today) for each.",
    method: "GET",
    url: `${api}/top-crypto`,
    requestBody: null,
    responseExample: `[
    {
      "crypto_id": Int,
      "crypto_name": String,
      "symbol": String,
      "change": Decimal
    }
  ]`,
  },
  {
    name: "getSocialMentions",
    description:
      "Getting social mentions chart data for the last 7 days, for each of the three top cryptocurrencies.",
    method: "GET",
    url: `${api}/social-mentions`,
    requestBody: null,
    responseExample: `[
    {
      "crypto_id": Int,
      "crypto_name": String,
      "symbol": String,
      "mentions": Array {7}
    }
  ]`,
  },
  {
    name: "getNewsCounts",
    description:
      "Getting news count data for the last 7 days, for each of the three top cryptocurrencies.",
    method: "GET",
    url: `${api}/news-count`,
    requestBody: null,
    responseExample: `[
    {
      "crypto_id": Int,
      "crypto_name": String,
      "symbol": String,
      "news_count": Int
    }
  ]`,
  },
  {
    name: "getMediaSentiments",
    description:
      "Getting media sentiment data for the last 24 hours, for each of the three top cryptocurrencies.",
    method: "GET",
    url: `${api}/media-sentiments`,
    requestBody: null,
    responseExample: `[
    {
      "crypto_id": Int,
      "crypto_name": String,
      "symbol": String,
      "positive_news_sentiment_count": Int,
      "negative_news_sentiment_count": Int,
      "positive_social_sentiment_count": Int,
      "negative_social_sentiment_count": Int
    }
  ]`,
  },
  {
    name: "getSummaryData",
    description:
      "Getting metadata for the summary page. Aggregation of all the cryptocurrencies in the database.",
    method: "GET",
    url: `${api}/summary-data`,
    requestBody: null,
    responseExample: `[
    {
      "crypto_id": Int,
      "crypto_name": String,
      "symbol": String,
      "change": Decimal,
      "social_count": Int,
      "news_count": Int,
      "social_sentiment_score": Int,
      "news_sentiment_score": Int
    }
  ]`,
  },
];
