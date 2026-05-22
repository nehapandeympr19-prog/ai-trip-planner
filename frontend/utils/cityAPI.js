// const GEODB_API_KEY = import.meta.env.VITE_GEODB_API_KEY;

// export async function searchCities(query) {
//   const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(query)}&limit=5&sort=-population`;

//   const res = await fetch(url, {
//     headers: {
//       "X-RapidAPI-Key": GEODB_API_KEY,
//       "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
//     },
//   });

//   if (!res.ok) throw new Error("City search failed");
//   const data = await res.json();
//   return data.data.map((city) => `${city.city}, ${city.countryCode}`);
// }




const GEODB_API_KEY = import.meta.env.VITE_GEODB_API_KEY;

export async function searchCities(query) {
  const url = `https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=${encodeURIComponent(
    query
  )}&limit=5&sort=-population`;

  try {
    const res = await fetch(url, {
      headers: {
        "X-RapidAPI-Key": GEODB_API_KEY,
        "X-RapidAPI-Host": "wft-geo-db.p.rapidapi.com",
      },
    });

    if (!res.ok) throw new Error("City search failed");

    const data = await res.json();
    return data.data.map((city) => `${city.city}, ${city.countryCode}`);
  } catch (err) {
    console.error("City search error:", err);
    return [];
  }
}

