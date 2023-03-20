import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Layout from "../components/shared/Layout";
import Copyright from "../components/shared/Copyright";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../utils/api";
import { Link as RouterLink, useNavigate } from "react-router-dom";

type SignUpForm = {
  email: string;
  username: string;
  password: string;
  terms: boolean;
};

const SignUpPage: React.FC = () => {
  const navigate = useNavigate();

  const { register, handleSubmit, setError, formState } = useForm<SignUpForm>({
    mode: "onChange",
  });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<SignUpForm> = (formData) => {
    console.log(formData);
    api
      .post("/users", {
        username: formData.username,
        email: formData.email,
        password: formData.password,
      })
      .then((response) => {
        // localStorage.setItem("AuthToken", JSON.stringify(response.data));
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        setError("username", { type: "focus" });
        setError("email", { type: "focus" });
        console.log(error);
      });
  };

  return (
    <Layout>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
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
            Sign up
          </Typography>
          <Box
            component="form"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onSubmit={handleSubmit(onSubmit)}
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  {...register("username", { required: true })}
                  required
                  fullWidth
                  id="name"
                  label="Username"
                  autoComplete="name"
                  autoFocus
                  error={!!formState.errors.username}
                  helperText={
                    formState.errors.username
                      ? "Please enter your username"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("email", { required: true })}
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  autoComplete="email"
                  error={!!formState.errors.email}
                  helperText={
                    formState.errors.email
                      ? "Please enter your email address"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  {...register("password", { required: true })}
                  required
                  fullWidth
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                  error={!!formState.errors.password}
                  helperText={
                    formState.errors.password
                      ? "Please enter your password"
                      : ""
                  }
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={
                    <Checkbox
                      id="terms"
                      color="primary"
                      {...register("terms", { required: true })}
                    />
                  }
                  label="I accept the Terms and conditions."
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              disabled={!formState.isValid}
            >
              Sign Up
            </Button>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link component={RouterLink} to="/signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 5 }} />
      </Container>
    </Layout>
  );
};

export default SignUpPage;
