import { PrismaClient } from "@prisma/client";
import { ActionFunction, LoaderFunction, json } from "@remix-run/node";
import { getSession } from "~/utils/session";

const prisma = new PrismaClient();

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");

  const favorites = await prisma.favorite.findMany({
    where: { userId: parseInt(userId) },
    include: { city: true },
  });

  return json(favorites);
};

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");
  const { cityId } = await request.json();

  if (!userId || !cityId) {
    return json({ error: "User ID and City ID are required" }, { status: 400 });
  }

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
};
