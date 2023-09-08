import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";
import { response } from "express";

export default function CocktailsSearch() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchContext, setSearchContext] = useState<
    "Ingredients" | "Category" | "Name"
  >("Ingredients");
  const [alcoholContent, setAlcoholContent] = useState<
    "Alcoholic" | "Non-Alcoholic" | "Opt Alcoholic"
  >("Alcoholic");
  const [glassType, setGlassType] = useState<string>("");
  const [glassTypes, setGlassTypes] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const handleSearch = debounce(() => {
    if (searchQuery) {
      if (searchQuery.length >= 1) {
        // handle if search query length is 1
        axios
          .post("./api/search-letter", { searchQuery })
          .then((response) => {
            setResults(response.data.drinks);
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        // ... handle other search lengths and contexts here
      }
    }
  }, 300); // Adjust debounce time as needed

  useEffect(() => {
    if (searchQuery.length > 0) {
      handleSearch();
    }
  }, [searchQuery]);

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
