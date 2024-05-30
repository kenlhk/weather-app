import { Box, Button, Container, TextField, Typography } from "@mui/material";
import { ActionFunction } from "@remix-run/node";
import { Form, json, redirect, useActionData } from "@remix-run/react";
import bcrypt from "bcryptjs";
import { Layout } from "~/components/Layout";
import { getUserByUsername } from "~/model/repo/userRepository";
import { commitSession, getSession } from "~/utils/session";

export const action: ActionFunction = async ({ request }) => {
  const formData = await request.formData();
  const username = formData.get("username") as string;
  const password = formData.get("password") as string;

  const user = await getUserByUsername(username);

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
    <Layout>
      <Container
        maxWidth="sm"
        sx={{
          height: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <Box>
          <Typography variant="h3" color="Highlight">
            Welcome to Weather App
          </Typography>
        </Box>
        <Box
          sx={{
            mt: 3,
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" gutterBottom>
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
            <Button
              sx={{ mt: 2 }}
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
            >
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
    </Layout>
  );
}
