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
  FormHelperText
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useMutation} from 'react-query';
import { createAccount } from '../../api/auth';
import {LoadingButton} from '@mui/lab';
import { useAuth } from '../../app/auth';
import { useNavigate, Link } from 'react-router-dom';

interface State {
  email: string;
  username: string;
  password: string;
  secondPassword: string;
  errs: Set<ValidationErrors>;
  showPassword: boolean;
}

enum ValidationErrors {
  PASSWORD_TYPE,
  PASSWORD_MATCH
}

export const CreateAccount: React.FC = () => {
  const [values, setValues] = useState<State>({
    email: '',
    password: '',
    username: '',
    secondPassword: '',
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

  const { mutate: submit, isLoading} = useMutation(async () => {
    const { id, accessToken, displayName } = await createAccount(values.email, values.username,values.password);

    auth.signIn(id, displayName, accessToken);
    
    // Redirect to group page
    navigate('/', { replace: true });
  })

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const { password, secondPassword, errs } = values;

    if (password !== secondPassword) {
        errs.add(ValidationErrors.PASSWORD_MATCH)
    }

    if (password.length < 5) {
        errs.add(ValidationErrors.PASSWORD_TYPE)
    }

    if (errs.size > 0) {
        setValues({
            ...values,
            errs
        })
        return;
    }

    submit();
  };

  const isPswrdMisMatch = values.errs.has(ValidationErrors.PASSWORD_MATCH)
  const isPswrdMisFormat = values.errs.has(ValidationErrors.PASSWORD_TYPE)
  return (
    <Container component="main" maxWidth="xs">
        <Typography component="h1" variant="h5" sx={{mt: 8}}>
          Create account
        </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          marginTop: 5 ,
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
        <FormControl fullWidth variant="outlined" sx={{mt: 1}}>
          <InputLabel htmlFor="email">Username</InputLabel>
          <OutlinedInput
            id="username"
            type="text"
            value={values.username}
            onChange={handleChange('username')}
            required
            label="username*"
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
            error={isPswrdMisFormat || isPswrdMisMatch}
            required
            fullWidth
            label="Password*"
          />
          {isPswrdMisFormat && <FormHelperText id="bad-format-error-text">Password must be at least 5 characters long</FormHelperText>}
        </FormControl>
        <FormControl  fullWidth variant="outlined" sx={{ mt: 1 }}>
          <InputLabel htmlFor="second-password">Re-enter password</InputLabel>
          <OutlinedInput
            id="second-password"
            type={values.showPassword ? 'text' : 'password'}
            value={values.secondPassword}
            onChange={handleChange('secondPassword')}
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
            error={isPswrdMisMatch}
            fullWidth
            label="Re-enter password*"
          />
          {isPswrdMisMatch && <FormHelperText id="mismatch-error-text">Passwords do not match</FormHelperText>}
        </FormControl>

        <LoadingButton
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          color="success"
          disabled={isLoading}
          loading={isLoading}
        >
          Submit
        </LoadingButton>

        <Link to="/login">
          <Typography component="p" variant="body1" sx={{ mt: 2 }}>
            Already have an account? Click here to log in.
          </Typography>
        </Link>
      </Box>
    </Container>
  );
};

