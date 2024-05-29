import {
  Box,
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import { Weather } from "~/model/types/Weather";

interface WeatherCardProps {
  weather: Weather;
}

export function WeatherCard({ weather }: WeatherCardProps) {
  return (
    <Card
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-around",
        alignItems: "flex-start",
        width: 320,
        height: 400,
        m: 2,
        p: 2,
        boxShadow: 3,
        borderRadius: 5,
      }}
    >
      <CardHeader
        title={weather.city}
        subheader={
          weather.region
            ? `${weather.region}, ${weather.country}`
            : `${weather.country}`
        }
      />
      <CardMedia
        component="img"
        image={weather.image}
        sx={{ width: 120, height: 120, alignSelf: "center" }}
      />
      <CardContent>
        <Box my={1}>
          <Typography variant="body1">{weather.description}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="text.secondary">
            Temperature: {weather.temperature}°C
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Humidity: {weather.humidity}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Precipitation: {weather.precipitation}%
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Local Time: {weather.time}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
}
