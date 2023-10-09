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

/* Drinks json
"drinks": [
  {
    "idDrink": "17222",
    "strDrink": "A1",
    "strDrinkAlternate": null,
    "strTags": null,
    "strVideo": null,
    "strCategory": "Cocktail",
    "strIBA": null,
    "strAlcoholic": "Alcoholic",
    "strGlass": "Cocktail glass",
    "strInstructions": "Pour all ingredients into a cocktail shaker, mix and serve over ice into a chilled glass.",
    "strInstructionsES": "Vierta todos los ingredientes en una coctelera, mezcle y sirva con hielo en un vaso frío.",
    "strInstructionsDE": "Alle Zutaten in einen Cocktailshaker geben, mischen und über Eis in ein gekühltes Glas servieren.",
    "strInstructionsFR": null,
    "strInstructionsIT": "Versare tutti gli ingredienti in uno shaker, mescolare e servire con ghiaccio in un bicchiere freddo.",
    "strInstructionsZH-HANS": null,
    "strInstructionsZH-HANT": null,
    "strDrinkThumb": "https://www.thecocktaildb.com/images/media/drink/2x8thr1504816928.jpg",
    "strIngredient1": "Gin",
    "strIngredient2": "Grand Marnier",
    "strIngredient3": "Lemon Juice",
    "strIngredient4": "Grenadine",
    "strIngredient5": null,
    "strIngredient6": null,
    "strIngredient7": null,
    "strIngredient8": null,
    "strIngredient9": null,
    "strIngredient10": null,
    "strIngredient11": null,
    "strIngredient12": null,
    "strIngredient13": null,
    "strIngredient14": null,
    "strIngredient15": null,
    "strMeasure1": "1 3/4 shot ",
    "strMeasure2": "1 Shot ",
    "strMeasure3": "1/4 Shot",
    "strMeasure4": "1/8 Shot",
    "strMeasure5": null,
    "strMeasure6": null,
    "strMeasure7": null,
    "strMeasure8": null,
    "strMeasure9": null,
    "strMeasure10": null,
    "strMeasure11": null,
    "strMeasure12": null,
    "strMeasure13": null,
    "strMeasure14": null,
    "strMeasure15": null,
    "strImageSource": null,
    "strImageAttribution": null,
    "strCreativeCommonsConfirmed": "No",
    "dateModified": "2017-09-07 21:42:09"
  }
*/



app.post('/api/search-letter', async (req, res) => {
  console.log("Posting for searching for a drink", req.body)
  try {
    const { searchDrink } = req.body;
    if (searchDrink && searchDrink.length === 1) {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?f=${searchDrink}`);
      res.json(response.data);
      console.log("success =1", searchDrink)
    } else {
      const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchDrink}`);
      console.log("success >1", searchDrink)
      res.json(response.data);
    }
  } catch (error) {
    console.log(error)
    res.status(500).send(error);
  }
})

// Endpoint to search for a drink by ingredient
app.get('/api/search-by-ingredient', async (req, res) => {
  const { ingredient } = req.query;
  if (!ingredient) {
    return res.status(400).send('Ingredient query parameter is required');
  }

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`);
    res.json(response.data);
  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

// Endpoint to search for a drink by category
app.get('/api/search-by-category', async (req, res) => {
  const { category } = req.query;
  if (!category) {
    return res.status(400).send('Category query parameter is required');
  }

  try {
    const response = await axios.get(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${encodeURIComponent(category)}`);
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
