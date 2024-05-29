import { PrismaClient } from "@prisma/client";
import { ActionFunction, json } from "@remix-run/node";

const prisma = new PrismaClient();

export const action: ActionFunction = async ({ request }) => {
  const { name, region, country, lat, lon, url } = await request.json();

  const existingCity = await prisma.city.findFirst({
    where: {
      name,
      region,
      country,
    },
  });

  if (existingCity) {
    return json(existingCity);
  }

  const newCity = await prisma.city.create({
    data: {
      name,
      region,
      country,
      lat,
      lon,
      url,
    },
  });

  return json(newCity);
};
