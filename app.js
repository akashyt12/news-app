const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));

const NEWS_API_KEY = 'dbc499db30714d928994694f9e597717';

app.get('/', async (req, res) => {
  try {
    const response = await axios.get(
      `https://newsapi.org/v2/top-headlines?country=in&apiKey=${NEWS_API_KEY}`
    );
    const articles = response.data.articles;
    res.render('index', { articles });
  } catch (error) {
    res.send('Error fetching news.');
  }
});

app.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
