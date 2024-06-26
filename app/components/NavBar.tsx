import {
  AppBar,
  Box,
  Button,
  Toolbar,
  Typography
} from "@mui/material";
import { Form } from "@remix-run/react";

interface NavBarProps {
  username: string;
}

export function NavBar({ username }: NavBarProps) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box
          sx={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography variant="h5">{`Welcome to Weather App, ${username}`}</Typography>
          <Form action="/logout" method="post">
            <Button type="submit" color="inherit">
              Logout
            </Button>
          </Form>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
