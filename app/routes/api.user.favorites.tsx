import { PrismaClient } from "@prisma/client";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { getFavoriteCities } from "~/model/repo/userRepository";
import { getSession } from "~/utils/session";

const prisma = new PrismaClient();

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
      const existingFavorite = await prisma.favorite.findFirst({
        where: { userId: parseInt(userId), cityId: parseInt(cityId) },
      });

      if (existingFavorite) {
        return json(existingFavorite);
      }

      const newFavorite = await prisma.favorite.create({
        data: {
          userId: parseInt(userId),
          cityId: parseInt(cityId),
        },
      });

      return json(newFavorite);
    }

    case "DELETE": {
      const favorite = await prisma.favorite.findFirst({
        where: { userId: parseInt(userId), cityId: parseInt(cityId) },
      });

      if (favorite) {
        await prisma.favorite.delete({ where: { id: favorite.id } });
      }

      return json({ message: "Favorite deleted" });
    }

    default:
      return json({ message: "Method not allowed" });
  }
};
