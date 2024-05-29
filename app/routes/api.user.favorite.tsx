import { LoaderFunction, json } from "@remix-run/node";
import { getFavoriteCities } from "~/data/repositoy/userRepository";
import { getSession } from "~/utils/session";

export const loader: LoaderFunction = async ({ request }) => {
  const session = await getSession(request);
  const userId = session.get("userId");
  const favoriteCities = await getFavoriteCities(userId);

  return json(favoriteCities);
};
