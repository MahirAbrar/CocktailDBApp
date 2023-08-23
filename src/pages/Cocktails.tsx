import React, { useState, useEffect } from "react";

export default function CocktailsSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchContext, setSearchContext] = useState<
    "Ingredients" | "Category"
  >("Ingredients");
  const [alcoholContent, setAlcoholContent] = useState<
    "Alcoholic" | "Non-Alcoholic" | "Opt Alcoholic"
  >("Alcoholic");
  const [glassType, setGlassType] = useState<string>("");
  const [glassTypes, setGlassTypes] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  useEffect(() => {
    // Fetching the glass types from the API
    fetch("https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list")
      .then((response) => response.json())
      .then((data) => {
        setGlassTypes(data.drinks.map((drink: any) => drink.strGlass));
      });
  }, []);

  const handleSearch = () => {
    // Logic for fetching results based on search criteria will go here
  };

  return (
    <div>
      <input
        type="text"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        placeholder="Search for drinks..."
      />

      <button
        onClick={() =>
          setSearchContext((prev) =>
            prev === "Ingredients" ? "Category" : "Ingredients"
          )
        }
      >
        {searchContext}
      </button>

      <button
        onClick={() => {
          if (alcoholContent === "Alcoholic")
            setAlcoholContent("Non-Alcoholic");
          else if (alcoholContent === "Non-Alcoholic")
            setAlcoholContent("Opt Alcoholic");
          else setAlcoholContent("Alcoholic");
        }}
      >
        {alcoholContent}
      </button>

      <select value={glassType} onChange={(e) => setGlassType(e.target.value)}>
        {glassTypes.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>

      <button onClick={handleSearch}>Search</button>

      <hr />

      <div>
        {results.map((result) => (
          <div key={result.idDrink}>{result.strDrink}</div>
        ))}
      </div>
    </div>
  );
}
