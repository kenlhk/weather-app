import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getFavoriteByUserIdAndCityId = async (
  userId: number,
  cityId: number
) => {
  return prisma.favorite.findFirst({
    where: { userId, cityId },
  });
};

export const createFavorite = async (userId: number, cityId: number) => {
  return prisma.favorite.create({
    data: {
      userId,
      cityId,
    },
  });
};

export const deleteFavorite = async (id: number) => {
  return prisma.favorite.delete({
    where: { id },
  });
};