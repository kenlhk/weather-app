import {
  Autocomplete,
  Box,
  Button,
  Container,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from "@mui/material";
import { City } from "@prisma/client";
import { useLoaderData } from "@remix-run/react";
import { useEffect, useState } from "react";
import { loader } from "~/routes/_index";

interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  url: string;
}

interface FavoriteListProps {
  favoriteCities: City[];
  fetchFavoriteCities: () => void;
}

const WEATHERAPI_BASE_URL = "https://api.weatherapi.com/v1";

export function FavoriteList({
  favoriteCities,
  fetchFavoriteCities,
}: FavoriteListProps) {
  const { WEATHERAPI_KEY } = useLoaderData<typeof loader>();
  const [options, setOptions] = useState<Location[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [selectedLocation, setSelectedLocation] = useState<Location | null>(
    null
  );

  useEffect(() => {
    if (inputValue.length > 2) {
      fetch(
        `${WEATHERAPI_BASE_URL}/search.json?key=${WEATHERAPI_KEY}&q=${inputValue}`
      )
        .then((response) => response.json())
        .then((data) => {
          setOptions(data);
        })
    }

    if (inputValue.length === 0) {
      setOptions([]);
    }
  }, [inputValue]);

  const handleAddFavorite = async (location: Location) => {
    const { name, region, country, lat, lon, url } = location;
    const city = await fetch("/api/cities", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name, region, country, lat, lon, url }),
    }).then((response) => response.json());

    await fetch("/api/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cityId: city.id }),
    });

    fetchFavoriteCities();
  };

  const handleAddButtonClick = () => {
    if (selectedLocation) {
      handleAddFavorite(selectedLocation);
      setInputValue("");
    }
  };
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Favorite Cities
        </Typography>
        <Box sx={{ display: "grid", alignItems: "center" }}>
          <Autocomplete
            options={options}
            getOptionLabel={(option) =>
              `${option.name}, ${option.region}, ${option.country}`
            }
            isOptionEqualToValue={(option, value) => {
              return (
                option.name === value.name &&
                option.region === value.region &&
                option.country === value.country
              );
            }}
            onInputChange={(event, value) => setInputValue(value)}
            onChange={(event, value) => setSelectedLocation(value)}
            value={selectedLocation}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add City"
                variant="outlined"
                margin="normal"
                fullWidth
              />
            )}
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddButtonClick}
            disabled={!selectedLocation}
            sx={{ ml: 2 }}
          >
            Add
          </Button>
        </Box>
        <List sx={{ mt: 2 }}>
          {favoriteCities.map((city) => (
            <ListItem
              key={city.id}
              secondaryAction={
                <IconButton
                  edge="end"
                  aria-label="delete"
                    onClick={() => handleDeleteCity(city)}
                >
                  {/* <DeleteIcon /> */}
                </IconButton>
              }
            >
              <ListItemText primary={`${city.name}`} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Container>
  );
}
