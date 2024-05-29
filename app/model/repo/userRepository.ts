import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getUser = async (userId: string) => {
  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
  });

  return user;
};

export const getFavoriteCities = async (userId: string) => {
  const favourites = await prisma.favorite.findMany({
    where: { userId: parseInt(userId) },
    include: { city: true },
  });

  const favoriteCities = favourites.map((favorite) => favorite.city);

  return favoriteCities;
};
