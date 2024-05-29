import { Container } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { json, type LoaderFunction, type MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { useState } from "react";
import { FavoriteList } from "~/components/FavoriteList";
import { getFavoriteCities, getUser } from "~/data/repositoy/userRepository";
import { requireUserSession } from "~/utils/session";

const prisma = new PrismaClient();

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
    const favoriteCities = await fetch("/api/user/favorite").then((res) =>
      res.json()
    );
    setFavoriteCities(favoriteCities);
    return favoriteCities;
  };

  return (
    <Container>
      <h1>{`Welcome ${user.username}`}</h1>
      <FavoriteList
        favoriteCities={favoriteCities}
        fetchFavoriteCities={fetchFavoriteCities}
      />
    </Container>
  );
}
