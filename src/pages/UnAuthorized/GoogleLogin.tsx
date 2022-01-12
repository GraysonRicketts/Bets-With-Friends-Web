import React, { useEffect } from 'react';
import { Container, CircularProgress } from '@mui/material';
import { useMutation } from 'react-query';
import { useAuth } from '../../app/auth';
import { useLocation,  useNavigate } from 'react-router-dom';
import { LoginRes, loginWithGoogle } from '../../api/auth';

export const GoogleLogin: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const auth = useAuth();

  const { mutate: submit } = useMutation(
    'LOGIN_WITH_GOOGLE',
    (accessToken: string) => {
      return loginWithGoogle(accessToken)
    },
    {
      onSuccess: (res: LoginRes) => {
        const { id, displayName, accessToken } = res;
        auth.signIn(id, displayName, accessToken);

        // Redirect to group page
        navigate('/', { replace: true });
      },
    },
  );

  useEffect(() => {
    // #access_token=ya29.a0ARrdaM-9DzvXGlOQEkm...&token_type=Bearer&expires_in=3599&...
    const hash = location.hash;
    const access = hash.split('&')[0];
    const token = access.split('=')[1];
    
    if (!location.hash) {
      return;
    }
    submit(token);
  }, [location.hash, submit]);

  return (
    <Container component="main" maxWidth="xs">
      <CircularProgress />
    </Container>
  );
};
