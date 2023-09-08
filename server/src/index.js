const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

app.use(express.json());
app.get('/api/cocktails', async (req, res) => {
  try {
    const response = await axios.get('https://www.thecocktaildb.com/api/json/v1/1/search.php?s=margarita');
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/popular-cocktails', async (req, res) => {
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/search.php?s=p");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

app.get('/api/random-drink', async (req, res) => {
  try {
    const response = await axios.get("https://www.thecocktaildb.com/api/json/v1/1/random.php");
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
})

app.post('/api/search-letter', async (req, res) => {
  try {
    const { searchQuery } = req.body;
    if (searchQuery && searchQuery.length === 1) {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchQuery}`);
      res.json(response.data);
    } else {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchQuery}`);
      res.json(response.data);
    }
  } catch (error) {
    res.status(500).send(error);
  }
})

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


const cors = require('cors');
app.use(cors());
