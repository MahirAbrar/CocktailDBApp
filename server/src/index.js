const express = require('express');
const axios = require('axios');
const app = express();
const port = 5000;

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


app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});


const cors = require('cors');
app.use(cors());
