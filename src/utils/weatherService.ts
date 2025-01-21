export interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

export const getWeatherData = async (city: string): Promise<WeatherData> => {
  try {
    console.log('Fetching weather data for:', city);
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8d2de98e089f1c28e1a22fc19a24ef04&units=metric`
    );
    
    if (!response.ok) {
      throw new Error('Weather data fetch failed');
    }

    const data = await response.json();
    console.log('Weather data received:', data);

    return {
      temperature: Math.round(data.main.temp),
      description: data.weather[0].description,
      icon: data.weather[0].icon
    };
  } catch (error) {
    console.error('Error fetching weather:', error);
    throw new Error('Failed to fetch weather data');
  }
};