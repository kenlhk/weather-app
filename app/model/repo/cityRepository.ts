import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getCityByNameRegionAndCountry = async (
  name: string,
  region: string,
  country: string
) => {
  return prisma.city.findFirst({
    where: {
      name,
      region,
      country,
    },
  });
};

export const createCity = async (
  name: string,
  region: string,
  country: string,
  lat: number,
  lon: number,
  url: string
) => {
  return prisma.city.create({
    data: {
      name,
      region,
      country,
      lat,
      lon,
      url,
    },
  });
};
