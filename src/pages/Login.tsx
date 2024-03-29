import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import LayoutSignUp from "../components/shared/LayoutSignUp";
import Copyright from "../components/shared/Copyright";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../utils/api";
import { Link as RouterLink } from "react-router-dom";

type LoginForm = {
  username: string;
  password: string;
};

type LoginFormResponseData = {
  data: {
    jwt: string;
  };
};

// Represents the login page
// This page is also shown if a user is not logged in or the token expired

const Login: React.FC = () => {
  const { register, handleSubmit, setError, formState } = useForm<LoginForm>({
    mode: "onChange",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<LoginForm> = (formData) => {
    api
      .post("/login", formData)
      .then((response: LoginFormResponseData) => {
        localStorage.setItem("AuthToken", response.data.jwt);
        localStorage.setItem("Username", formData.username);
        window.location.reload();
      })
      .catch((error) => {
        setError("username", { type: "focus" });
        setError("password", { type: "focus" });
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/restrict-plus-operands
        alert(error + ": \n" + error.response.data.detail);
      });
  };

  return (
    <LayoutSignUp>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 1 }}
          >
            <TextField
              {...register("username", { required: true })}
              required
              margin="normal"
              fullWidth
              id="username"
              label="Username"
              autoComplete="username"
              autoFocus
            />
            <TextField
              {...register("password", { required: true })}
              required
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formState.isValid}
            >
              Login
            </Button>
            <Grid container>
              <Grid item>
                <Link component={RouterLink} to="/signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </LayoutSignUp>
  );
};

export default Login;
