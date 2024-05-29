import { ActionFunction, redirect } from "@remix-run/node";
import { destroySession, getSession } from "~/utils/session";

export const action: ActionFunction = async ({ request }) => {
  const session = await getSession(request);

  return redirect("/", {
    headers: {
      "Set-Cookie": await destroySession(session),
    },
  });
};
