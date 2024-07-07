import React, { useEffect, useRef, useState } from "react";
import { letsFetch } from "./letsFetch";

const App = () => {
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState();
  const [sprites, setSprites] = useState([]);
  const [hasmore, setHasmore] = useState(true);

  const [data, setData] = useState();
  const elementRef = useRef(null);

  const setUpFetch = async (cantPoke) => {
    setLoading(true);

    const response = await letsFetch(
      `https://pokeapi.co/api/v2/pokemon?offset=${cantPoke}&limit=20`
    );

    if (response.error) {
      setError(true);
      setLoading(false);
      setData(null);
    } else {
      const data = response.results;

      const fetchSprites = async (url) => {
        const resp = await fetch(url);
        const json = await resp.json();
        return json.sprites.other.dream_world.front_default;
      };

      const loadSprites = async (datos) => {
        const spritesPromises = datos.map((item) => fetchSprites(item.url));
        const spritesLoaded = await Promise.all(spritesPromises); //necessary to wait for all, otherwise all undefined

        setData(datos);

        setSprites([...sprites, ...spritesLoaded]);
        setOffset((offset) => offset + 20);
        //o tambien se puede setOffset(offset + 20);
        setLoading(false);
      };

      loadSprites(data);
    }
  };
  // const handleClick = () => {
  //   setUpFetch(offset);
  // };
  useEffect(() => {
    const observer = new IntersectionObserver(onIntersection);
    if (observer && elementRef.current) {
      console.log("observer connected");
      observer.observe(elementRef.current);
    }
    return () => {
      console.log("observer disconnected");
      if (observer) observer.disconnect();
    };
  }, [sprites]);

  const onIntersection = async (entries) => {
    const firstEntry = entries[0];
    if (firstEntry.isIntersecting && hasmore) setUpFetch(offset);
  };
  return (
    <div style={{ height: "100vh" }}>
      <h1 style={{ display: "block" }}>POKEMONS</h1>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          width: "70%",
          margin: "0 auto",
        }}
      >
        {sprites?.map((pokemon, index) => {
          return (
            <img
              key={index}
              src={pokemon}
              style={{ width: 180, height: "auto" }}
            ></img>
          );
        })}
      </div>
      {/* <button onClick={handleClick}>SEARCH</button> */}
      {hasmore && <p ref={elementRef}>loading...</p>}
    </div>
  );
};
export default App;
