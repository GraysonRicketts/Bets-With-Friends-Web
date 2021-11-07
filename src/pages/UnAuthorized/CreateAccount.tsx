import React from 'react';
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
  Typography,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import {useMutation} from 'react-query';
import { createAccount } from '../../api/auth';

interface State {
  email: string;
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
  const [values, setValues] = React.useState<State>({
    email: '',
    password: '',
    secondPassword: '',
    errs: new Set(),
    showPassword: false,
  });

  const handleChange =
    (prop: keyof State) => (event: React.ChangeEvent<HTMLInputElement>) => {
      setValues({ ...values, [prop]: event.target.value });
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

  const { data: createdAccount, isLoading}  = useMutation(async () => {
    await createAccount(values.email, values.password);
    return {};
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
  };

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
            fullWidth
            label="Re-enter password*"
          />
        </FormControl>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          sx={{ mt: 3, mb: 2 }}
          color="success"
          disabled={isLoading}
        >
            {/* TODO: Add loader */}
          Submit
        </Button>
      </Box>
    </Container>
  );
};

