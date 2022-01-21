import React, { useState } from 'react';
import {
  Box,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useMutation } from 'react-query';
import { LoadingButton } from '@mui/lab';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from 'src/app/auth';
import { login } from 'src/api/auth';
import { GOOGLE_AUTH_CLIENT_ID, GOOGLE_AUTH_REDIRECT_URL } from '../../config';

const GOOGLE_OAUTH_URL = 'https://accounts.google.com/o/oauth2/v2/auth';
const authLink = `${GOOGLE_OAUTH_URL}?client_id=${GOOGLE_AUTH_CLIENT_ID}&redirect_uri=${GOOGLE_AUTH_REDIRECT_URL}&response_type=token&scope=email`;

interface State {
  email: string;
  password: string;
  errs: Set<ValidationErrors>;
  showPassword: boolean;
}

enum ValidationErrors {}

export const Login: React.FC = () => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    errs: new Set(),
    showPassword: false,
  });

  const navigate = useNavigate();
  const auth = useAuth();

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      if (prop === 'password' && values.errs.size > 0) {
        values.errs = new Set();
      }

      setValues({ ...values, [prop]: event.target.value, errs: values.errs });
    };

  const handleClickShowPassword = () => {
    setValues({
      ...values,
      showPassword: !values.showPassword,
    });
  };

  const handleMouseDownPassword = (
    event: React.MouseEvent<HTMLButtonElement>,
  ) => {
    event.preventDefault();
  };

  const { mutate: submit, isLoading } = useMutation(async () => {
    const { id, accessToken, displayName } = await login(
      values.email,
      values.password,
    );

    auth.signIn(id, displayName, accessToken);

    // Redirect to page the user was on
    navigate(-1);
  });

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { errs } = values;

    if (errs.size > 0) {
      setValues({
        ...values,
        errs,
      });
      return;
    }

    submit();
  };

  return (
    <Container component="main" maxWidth="xs">
      <Typography component="h1" variant="h5" sx={{ mt: 8 }}>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 5,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <FormControl fullWidth variant="outlined">
          <InputLabel htmlFor="email">Email</InputLabel>
          <OutlinedInput
            id="email"
            type="email"
            value={values.email}
            onChange={handleChange('email')}
            required
            label="Email*"
            autoFocus
            fullWidth
          />
        </FormControl>
        <FormControl fullWidth variant="outlined" sx={{ mt: 1 }}>
          <InputLabel htmlFor="password">Password</InputLabel>
          <OutlinedInput
            id="password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.password}
            onChange={handleChange('password')}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {values.showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            required
            fullWidth
            label="Password*"
          />
        </FormControl>

        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 1 }}
          color="success"
          disabled={isLoading}
          loading={isLoading}
        >
          Submit
        </LoadingButton>
        <a href={authLink}>Login with Google</a>
      </Box>
      <Link to="/create-account">
        <Typography component="h3" variant="body1" sx={{ mt: 2 }}>
          Don't have an account? Click here to create one.
        </Typography>
      </Link>
    </Container>
  );
};
