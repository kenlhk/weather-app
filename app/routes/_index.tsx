import { AppBar, Container, Grid, Toolbar, Typography } from "@mui/material";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { FavoriteList } from "~/components/FavoriteList";
import { Layout } from "~/components/Layout";
import { NavBar } from "~/components/NavBar";
import { WeatherBoard } from "~/components/WeatherBoard";
import { getFavoriteCities, getUser } from "~/model/repo/userRepository";
import { requireUserSession } from "~/utils/session";

export const meta: MetaFunction = () => {
  return [
    { title: "Weather App" },
    { name: "description", content: "Welcome to Weather App!" },
  ];
};

export const loader: LoaderFunction = async ({ request }) => {
  const session = await requireUserSession(request);
  const WEATHERAPI_KEY = process.env.WEATHERAPI_KEY;
  const userId = session.get("userId");

  const user = await getUser(userId);
  const cities = await getFavoriteCities(userId);

  return json({ user, cities, WEATHERAPI_KEY, session });
};

export default function Index() {
  const { user, cities } = useLoaderData<typeof loader>();
  const [favoriteCities, setFavoriteCities] = useState(cities);

  const fetchFavoriteCities = async () => {
    const favoriteCities = await fetch("/api/user/favorites").then((res) =>
      res.json()
    );
    setFavoriteCities(favoriteCities);
    return favoriteCities;
  };

  return (
    <Layout>
      <NavBar username={user.username} />
      <Container
        maxWidth={false}
        sx={{ pt: 3, marginLeft: "auto", marginRight: "auto", height: "90vh"}}
      >
        <Grid container spacing={2} height="100%">
          <Grid item xs={12} md={3} height="100%">
            <FavoriteList
              favoriteCities={favoriteCities}
              fetchFavoriteCities={fetchFavoriteCities}
            />
          </Grid>
          <Grid item xs={12} md={9}>
            <WeatherBoard favoriteCities={favoriteCities} />
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
}
