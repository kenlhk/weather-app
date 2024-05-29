import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { PrismaClient } from "@prisma/client";
import { ActionFunction } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { commitSession, getSession } from "~/utils/session";

const prisma = new PrismaClient();

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (user && (await bcrypt.compare(password, user.password))) {
    const session = await getSession(request);
    session.set("userId", user.id);
    return redirect("/", {
      headers: {
        "Set-Cookie": await commitSession(session),
      },
    });
  }

  return json({ error: "Invalid username/password" }, { status: 401 });
};

export default function LoginPage() {
  const actionData = useActionData<ActionFunction>();

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Login
        </Typography>
        <Form method="post">
          <TextField
            label="Username"
            name="username"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            variant="outlined"
            margin="normal"
            fullWidth
            required
          />
          <Button type="submit" variant="contained" color="primary" fullWidth>
            Login
          </Button>
        </Form>
        {actionData?.error && (
          <Typography color="error" variant="body1">
            {actionData.error}
          </Typography>
        )}
      </Box>
    </Container>
  );
}
