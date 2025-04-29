const CAT_ENDPOINT_RANDOM_FACT = "https://catfact.ninja/fact";

const getRandomFact = (setFact) => {
  fetch(CAT_ENDPOINT_RANDOM_FACT)
    .then((res) => {
      //problema con la peticion y con la respuesta se usa catch junto con throw
      if (!res.ok) throw new Error("Error fetching fact");
      return res.json();
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
};

// const getRandomFact = async () => {
//   const res = await fetch(CAT_ENDPOINT_RANDOM_FACT);
//   const data = await res.json();
//   const fact = data;
//   return fact;
// };

export default getRandomFact;
