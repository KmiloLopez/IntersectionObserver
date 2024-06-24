import React, { useEffect, useState } from "react";
import { letsFetch } from "./letsFetch";
const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";
const App = () => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState();
  const [data, setData] = useState();
  const [typedText, setTypedText] = useState("");
  const [lastsearch, setLastSearch] = useState();

  const setUpFetch = async () => {
    setLoading(true);

    const response = await letsFetch(`${BASE_URL}${typedText}`);
    setLastSearch(typedText);
    if (response.error) {
      console.log(response.error);
      setError(true);
      setLoading(false);
      setData(null);
    } else {
      setData(response);
      setLoading(false);
      setError(false);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setUpFetch();
    setTypedText("");
  };
  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter name"
          value={typedText}
          onChange={(e) => setTypedText(e.target.value)}
        ></input>
        <button>SEARCH</button>
      </form>
      {error && <h2>We couldn't find pokemon {lastsearch}</h2>}
      {loading && <h2>Loading...</h2>}
      {data && <h2>Data fount</h2>}
    </>
  );
};
export default App;
