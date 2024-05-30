import { Delete } from "@mui/icons-material";
import {
  Alert,
  Autocomplete,
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemText,
  TextField,
  Tooltip,
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
        });
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

    await fetch("/api/user/favorites", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ cityId: city.id }),
    });

    fetchFavoriteCities();
  };

  const handleDeleteFavorite = async (city: City) => {
    await fetch("/api/user/favorites", {
      method: "DELETE",
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
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100%",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography sx={{ my: 2 }} variant="h4">
          Favorite Cities
        </Typography>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            mb: 2,
          }}
        >
          <Autocomplete
            options={options}
            getOptionLabel={(option) => {
              const parts = [option.name, option.region, option.country];
              const filteredParts = parts.filter((part) => part);
              return filteredParts.join(", ");
            }}
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
            fullWidth
          />
          <Button
            variant="contained"
            color="primary"
            onClick={handleAddButtonClick}
            disabled={favoriteCities.length >= 5}
            sx={{ width: "100%", mb: 2 }}
          >
            Add
          </Button>
        </Box>
        <List sx={{ mt: 2 }}>
          {favoriteCities.map((city) => (
            <ListItem
              key={city.id}
              secondaryAction={
                <Tooltip title="Delete" placement="right">
                  <IconButton onClick={() => handleDeleteFavorite(city)}>
                    <Delete />
                  </IconButton>
                </Tooltip>
              }
            >
              <ListItemText
                primary={
                  city.region
                    ? `${city.name}, ${city.region}, ${city.country}`
                    : `${city.name}, ${city.country}`
                }
              />
            </ListItem>
          ))}
        </List>
      </Box>
      <Box>
        <Alert severity="info" variant="outlined" sx={{ mt: 2 }}>
          Maximum of 5 favorite cities allowed
        </Alert>
      </Box>
    </Box>
  );
}
