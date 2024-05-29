export interface Weather {
  city: string;
  region: string;
  country: string;
  time: string;
  description: string;
  image: string;
  temperature: number;
  humidity: number;
  precipitation: number;
}

export const weatherTestData = [
    {
        city: "Glasgow",
        region: "Glasgow City",
        country: "United Kingdom",
        time: "2024-05-29 18:03",
        description: "Partly cloudy",
        image: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        temperature: 17,
        humidity: 68,
        precipitation: 0.09,
    },
    {
        city: "London",
        region: "City of London, Greater London",
        country: "United Kingdom",
        time: "2024-05-29 18:03",
        description: "Partly cloudy",
        image: "//cdn.weatherapi.com/weather/64x64/day/116.png",
        temperature: 18,
        humidity: 60,
        precipitation: 0.09,
    },
    {
        city: "Edinburgh",
        region: "City of Edinburgh",
        country: "United Kingdom",
        time: "2024-05-29 18:03",
        description: "Light rain",
        image: "//cdn.weatherapi.com/weather/64x64/day/296.png",
        temperature: 14,
        humidity: 88,
        precipitation: 0.97,
    },
    {
        city: "Tokyo",
        region: "Tokyo",
        country: "Japan",
        time: "2024-05-30 2:03",
        description: "Clear",
        image: "//cdn.weatherapi.com/weather/64x64/night/113.png",
        temperature: 19.1,
        humidity: 76,
        precipitation: 0,
    },
    {
        city: "Hong Kong",
        region: "",
        country: "Hong Kong",
        time: "2024-05-30 1:03",
        description: "Partly cloudy",
        image: "//cdn.weatherapi.com/weather/64x64/night/116.png",
        temperature: 26,
        humidity: 70,
        precipitation: 0.05,
    },
];