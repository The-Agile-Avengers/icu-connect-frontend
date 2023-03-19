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
import Layout from "../components/shared/Layout";
import Copyright from "../components/shared/Copyright";
import { SubmitHandler, useForm } from "react-hook-form";
import { api } from "../utils/api";
import { Link as RouterLink, useNavigate} from "react-router-dom";


type LoginForm = {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {

  const navigate = useNavigate();
  
  const {
    register,
    handleSubmit,
    setError,
  } = useForm<LoginForm>({ mode: 'onChange' });

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit: SubmitHandler<LoginForm> = formData => {
    console.log(formData)
    api.post('/users', formData)
      .then((response) => {
        localStorage.setItem("AuthToken", JSON.stringify(response.data));
        console.log(response.data);
        navigate("/")
      })
      .catch((error) => {
        setError("email", {type: "focus"})
        setError("password", {type: "focus"})
        console.log(error);
      });
  }

  return (
    <Layout>
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
              {...register('email', { required: true })}
              required
              margin="normal"
              fullWidth
              id="email"
              label="Email Address"
              autoComplete="email"
              autoFocus
            />
            <TextField
              {...register('password', { required: true })}
              required
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            <Grid container>
              {/* <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid> */}
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
    </Layout>
  );
}


export default LoginPage;
