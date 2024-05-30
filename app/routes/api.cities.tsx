import { ActionFunction, json } from "@remix-run/node";
import {
  createCity,
  getCityByNameRegionAndCountry,
} from "~/model/repo/cityRepository";

export const action: ActionFunction = async ({ request }) => {
  const { name, region, country, lat, lon, url } = await request.json();

  const existingCity = await getCityByNameRegionAndCountry(
    name,
    region,
    country
  );

  if (existingCity) {
    return json(existingCity);
  }

  const newCity = await createCity(name, region, country, lat, lon, url);

  return json(newCity);
};
