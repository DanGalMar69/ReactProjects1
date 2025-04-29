import { useEffect, useState } from "react";
import "./App.css";

const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";
// const CAT_ENDPOINT_IMAGE_URL = `https://cataas.com/cat/says/${threefirstWord}?size=50&color=red&json=true`;
// const CAT_PREFIX_IMG_URL = `https://cataas.com`; esto es para cambiar estado imageUrl externamente

function App() {
  const [fact, setFact] = useState();
  const [imageUrl, setImageUrl] = useState();

  // para recuperar la cita al cargar la pagina
  useEffect(() => {
    fetch(CAT_ENDPOINT_RANDOM_FACT)
      .then((res) => {
        //problema con la peticion y con la respuesta se usa catch junto con throw
        if (!res.ok) throw new Error("Error fetching fact");
        res.json();
      })
      // .then((data) => setFact(data.fact));
      .then((data) => {
        const { fact } = data;
        setFact(fact);
      })
      .catch((err) => {
        // tanto si hay error con la respuesta
        // como si hay error con la peticion
        console.err(err);
      });
  }, []);

  //para recueprar la imagen cada vez que tenemos una cita nueva
  useEffect(() => {
    if (!fact) return; //retorna un nulo cuando fact no tiene nada y sale de useEffect

    const threefirstWord = fact.split(" ").slice(0, 3).join(" ");

    fetch(
      `https://cataas.com/cat/says/${threefirstWord}?size=50&color=red&json=true`
    )
      .then((res) => res.json())
      .then((response) => {
        const { url } = response;
        // setImageUrl(`https://cataas.com${url}`); por si la imagen esta rota usar
        setImageUrl(url); //setear la minima informacion necesaria para los estados porque son estaticos y es mejor trabajarlos externamente
      });
  }, [fact]);

  return (
    <main className="App">
      <h1>App de gatos</h1>

      {fact && <h4>{fact}</h4>}
      {imageUrl && (
        <img
          // src={`${CAT_PREFIX_IMG_URL}${imageUrl}`} usar cambios externos
          src={imageUrl}
          alt={`Imagen extraida usando las tres primeras palabras de ${fact}`}
        ></img>
      )}
    </main>
  );
}

export default App;
