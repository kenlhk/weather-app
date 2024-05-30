import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import {
  createFavorite,
  deleteFavorite,
  getFavoriteByUserIdAndCityId,
} from "~/model/repo/favoriteRepository";
import { getFavoriteCities } from "~/model/repo/userRepository";
import { getSession } from "~/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");
  const favoriteCities = await getFavoriteCities(userId);

  return json(favoriteCities);
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");
  const { cityId } = await request.json();

  switch (request.method) {
    case "POST": {
      const existingFavorite = await getFavoriteByUserIdAndCityId(
        parseInt(userId),
        parseInt(cityId)
      );

      if (existingFavorite) {
        return json(existingFavorite);
      }

      const newFavorite = await createFavorite(
        parseInt(userId),
        parseInt(cityId)
      );
      return json(newFavorite);
    }

    case "DELETE": {
      const favorite = await getFavoriteByUserIdAndCityId(
        parseInt(userId),
        parseInt(cityId)
      );

      if (favorite) {
        await deleteFavorite(favorite.id);
      }

      return json({ message: "Favorite deleted" });
    }

    default:
      return json({ message: "Method not allowed" });
  }
};
