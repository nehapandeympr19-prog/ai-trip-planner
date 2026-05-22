const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function getCurrentWeather(city) {
  try {
    console.log("API_KEY:", API_KEY);  // Check if key is loaded
    const encodedCity = encodeURIComponent(city);
    const response = await fetch(
      `${BASE_URL}/weather?q=${encodedCity}&appid=${API_KEY}&units=metric`
    );

    if (!response.ok) {
      const errorData = await response.json();
      console.error("API error response:", errorData);
      throw new Error("Failed to fetch weather data");
    }

    const data = await response.json();
    console.log("Weather data:", data);
    return data;
  } catch (error) {
    console.error("Error fetching weather:", error);
    return null;
  }
}
