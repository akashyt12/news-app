const express = require("express");
const axios = require("axios");
const app = express();

app.set("view engine", "ejs");
app.set("views", __dirname + "/views");

app.use(express.static("public"));

app.get("/", async (req, res) => {
  try {
    const response = await axios.get("https://newsapi.org/v2/top-headlines", {
      params: {
        country: "in",
        apiKey: process.env.NEWS_API_KEY || "dbc499db30714d928994694f9e597717",
      },
    });

    const articles = response.data.articles;
    res.render("index", { articles });
  } catch (error) {
    console.error("Error fetching news:", error);
    res.send("Failed to fetch news.");
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
