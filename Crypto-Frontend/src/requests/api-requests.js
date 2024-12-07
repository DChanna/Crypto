import axios from "axios";

// export const api = "http://127.0.0.1:8000/api"; - backend local
export const api = "http://127.0.0.1:8004/api"; // backend docker


export async function getNews() {
  try {
    const response = await axios.get(`${api}/news-count`);
    return response.data;
  } catch (err) {
    console.error("Error fetching news count:", err);
    return [];
  }
}

export async function getSentiments() {
  try {
    const response = await axios.get(`${api}/media-sentiments`);
    return response.data;
  } catch (err) {
    console.error("Error fetching media sentiments:", err);
    return [];
  }
}

export async function getTopPost() {
  try {
    const response = await axios.get(`${api}/top-post`);
    return response.data;
  } catch (err) {
    console.error("Error fetching top post:", err);
    return null;
  }
}

export async function getTopCrypto() {
  try {
    const response = await axios.get(`${api}/top-crypto`);
    return response.data;
  } catch (err) {
    console.error("Error fetching top crypto:", err);
    return [];
  }
}

export async function getSummary() {
  try {
    const response = await axios.get(`${api}/summary-data`);
    return response.data;
  } catch (err) {
    console.error("Error fetching summary data:", err);
    return [];
  }
}

export const getPercentage = (start, end) => {
  return start !== 0 ? ((end - start) / start) * 100 : 0;
};

export const getSocialMentionsData = async () => {
  try {
    const response = await axios.get(`${api}/social-mentions`);
    const socialMentions = response.data;

    if (!Array.isArray(socialMentions)) {
      throw new Error("Invalid data format for social mentions");
    }

    return socialMentions
      .filter((crypto) => crypto.crypto_name && Array.isArray(crypto.mentions))
      .map((crypto) => ({
        name: crypto.crypto_name,
        data: crypto.mentions,
      }));
  } catch (err) {
    console.error("Error fetching social mentions data:", err);
    return [];
  }
};

export const getPast7Dates = () => {
  const today = new Date();
  const options = { month: "short", day: "2-digit" };
  return Array.from({ length: 7 }, (_, i) => {
    const date = new Date(today);
    date.setDate(today.getDate() - (6 - i));
    return date.toLocaleDateString("en-US", options);
  });
};

export const getTopTrendingCrypto = async () => {
  try {
    const [socialMentionsRes, newsCountRes] = await Promise.all([
      axios.get(`${api}/social-mentions`),
      axios.get(`${api}/news-count`),
    ]);

    const socialMentions = socialMentionsRes.data;
    const newsCount = newsCountRes.data;

    if (!Array.isArray(socialMentions) || !Array.isArray(newsCount)) {
      throw new Error("Invalid data format for social mentions or news count");
    }

    let topSocial = null;
    let topNews = null;

    let maxSocialChange = -Infinity;
    let maxNewsCount = -Infinity;

    socialMentions.forEach((crypto) => {
      if (crypto.mentions && crypto.mentions.length >= 2) {
        const lastDay = crypto.mentions[crypto.mentions.length - 1];
        const secondLastDay = crypto.mentions[crypto.mentions.length - 2];

        const socialChange = getPercentage(secondLastDay, lastDay);

        if (socialChange > maxSocialChange) {
          maxSocialChange = socialChange;
          topSocial = {
            name: crypto.crypto_name,
            symbol: crypto.symbol,
            change: socialChange,
          };
        }
      }
    });

    // newsCount.forEach((crypto) => {
    //   const newsCountValue = crypto.news_count || 0;
    //   if (newsCountValue > maxNewsCount) {
    //     maxNewsCount = newsCountValue;
    //     topNews = {
    //       name: crypto.crypto_name,
    //       symbol: crypto.symbol,
    //       count: newsCountValue,
    //     };
    //   }
    // });

    newsCount.forEach((crypto) => {
      if (crypto.news_count > maxNewsCount) {
        maxNewsCount = crypto.news_count;
        topNews = {
          name: crypto.crypto_name,
          symbol: crypto.symbol,
          newsCount: crypto.news_count, 
        };
      }
    });
    

    return { topSocial, topNews };
  } catch (err) {
    console.error("Error fetching trending crypto data:", err);
    return { topSocial: null, topNews: null };
  }
};
