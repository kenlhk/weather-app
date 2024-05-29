import { Container, Grid } from "@mui/material";
import { City } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { Weather } from "~/model/types/Weather";
import { loader } from "~/routes/_index";
import { WeatherCard } from "./WeatherCard";

interface WeatherBoardProps {
  favoriteCities: City[];
}

const WEATHERAPI_BASE_URL = "https://api.weatherapi.com/v1";

export function WeatherBoard({ favoriteCities }: WeatherBoardProps) {
  const { WEATHERAPI_KEY } = useLoaderData<typeof loader>();
  const [weathers, setWeathers] = useState<Weather[]>([]);

  const fetchWeathers = async (favoriteCities: City[]): Promise<Weather[]> => {
    const weathers = [];
    for (const city of favoriteCities) {
      const weather = await fetch(
        `${WEATHERAPI_BASE_URL}/current.json?key=${WEATHERAPI_KEY}&q=${city.lat},${city.lon}`
      )
        .then((response) => response.json())
        .then(({ location, current }) => {
          return {
            city: location.name,
            region: location.region,
            country: location.country,
            temperature: current.temp_c,
            humidity: current.humidity,
            precipitation: current.precip_mm,
            time: current.last_updated,
            description: current.condition.text,
            image: current.condition.icon,
          };
        });
      weathers.push(weather);
    }

    return weathers;
  };

  useEffect(() => {
    fetchWeathers(favoriteCities).then((weathers) => {
      setWeathers(weathers);
    });
  }, [favoriteCities]);

  return (
    <Container>
      <Grid container>
        {weathers.map((weather) => (
          <Grid
            item
            key={`${weather.city}-${weather.region}-${weather.country}`}
          >
            <WeatherCard key={weather.city} weather={weather} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}
