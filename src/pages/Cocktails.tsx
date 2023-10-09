import React, { useState, useEffect } from "react";
import axios from "axios";
import { debounce } from "lodash";

export default function CocktailsSearch() {
  const [searchDrink, setSearchDrink] = useState("");
  const [searchContext, setSearchContext] = useState<
    "Ingredients" | "Category" | "Name"
  >("Ingredients");
  const [alcoholContent, setAlcoholContent] = useState<
    "Alcoholic" | "Non-Alcoholic" | "Opt Alcoholic"
  >("Alcoholic");
  const [glassType, setGlassType] = useState<string>("");
  const [glassTypes, setGlassTypes] = useState<string[]>([]);
  const [results, setResults] = useState<any[]>([]);

  const handleSearch = debounce((immediate = false) => {
    if (searchDrink) {
      if (searchDrink.length >= 1) {
        axios
          .post("./api/search-letter", { searchDrink })
          .then((response) => {
            if (response.data.drinks != null) {
              setResults(response.data.drinks.slice(0, 5));
              console.log(results);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }
  }, 2000); // Adjust debounce time as needed

  const handleButtonClick = () => {
    handleSearch.cancel(); // Cancel any pending debounced calls
    handleSearch(); // Call the search function immediately
  };

  const handleResultClick = (idDrink: String) => {
    console.log("Clicked drink ID:", idDrink);
    //   // implement the functionality you want when a result is clicked
  };

  useEffect(() => {
    // Create a new debounced function whenever searchDrink changes
    const handleSearch = debounce(() => {
      if (searchDrink.length >= 1) {
        axios
          .post("./api/search-letter", { searchDrink })
          .then((response) => {
            if (response.data.drinks != null) {
              setResults(response.data.drinks.slice(0, 5));
              console.log(results);
            }
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }, 2000);

    // If searchDrink has a value, call the debounced function
    if (searchDrink.length > 0) {
      handleSearch();
    }

    // Cleanup: cancel the debounced function if it has not yet executed
    return () => {
      handleSearch.cancel();
    };
  }, [searchDrink]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <label style={{ marginRight: "0.5rem" }}>Search for drink</label>
        <input
          type="text"
          value={searchDrink}
          onChange={(e) => setSearchDrink(e.target.value)}
          placeholder="Search for drinks..."
          style={{ marginRight: "0.5rem" }}
        />
        <button onClick={handleButtonClick}>Search</button>
      </div>

      <div>
        {results.map((result) => (
          <div
            key={result.idDrink}
            onClick={() => handleResultClick(result.idDrink)}
            style={{ cursor: "pointer", marginBottom: "0.5rem" }}
          >
            {result.strDrink}
          </div>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <strong>Optional Arguments</strong>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "1rem",
        }}
      >
        <input
          type="text"
          // value={searchQuery}
          // onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search query..."
          style={{ marginRight: "0.5rem" }}
        />

        <button
          onClick={() =>
            setSearchContext((prev) =>
              prev === "Ingredients" ? "Category" : "Ingredients"
            )
          }
          style={{ marginRight: "0.5rem" }}
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
          style={{ marginRight: "0.5rem" }}
        >
          {alcoholContent}
        </button>

        <select
          value={glassType}
          onChange={(e) => setGlassType(e.target.value)}
        >
          {glassTypes.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>

      <hr />
    </div>
  );
}
