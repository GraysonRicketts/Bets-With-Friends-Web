import {
  Typography,
  Box,
  IconButton,
  Link,
  LinkProps,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import React, { useState } from 'react';
import { AppBar as MaterialAppBar } from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from './auth';
import {
  People,
  Menu as MenuIcon,
  Home as HomeIcon,
  ArrowBackIosNew
} from '@mui/icons-material';

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}
const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

export const AppBar: React.FC = () => {
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const auth = useAuth();
  const navigate = useNavigate();

  const handleMenu = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchor(event.currentTarget);
    setIsProfileOpen(true);
  };

  const handleClose = () => {
    setAnchor(null);
    setIsProfileOpen(false);
  };

  const handleLogout = () => {
    handleClose();
    auth.signOut();
    navigate('/login');
  };

  const handleProfile = () => {
    handleClose();
  };

  const handleFriends = () => {
    navigate('/friends');
  };

  return (
    <MaterialAppBar position="fixed" sx={{ top: 'auto', bottom: 0 }}>
      <Toolbar>
        <Box
          aria-label="breadcrumb"
          component="div"
          sx={{ display: 'flex', flexGrow: 1, alignItems: 'center', flexDirection: 'row' }}
        >
          <IconButton aria-label="back" onClick={() => {
             navigate(-1);
          }}>
            <ArrowBackIosNew sx={{color: 'white'}} fontSize="medium" />
          </IconButton>

          <Box>
            <LinkRouter underline="hover" color="white" variant="h6" to="/">
              <HomeIcon fontSize="medium"/>
            </LinkRouter>
          </Box>
        </Box>
        <Box>
          <Typography>{}</Typography>
          <IconButton
            size="large"
            aria-label="friends of current user"
            aria-controls="friend-appbar"
            aria-haspopup="true"
            onClick={handleFriends}
            color="inherit"
          >
            <People />
          </IconButton>
          <IconButton
            size="large"
            aria-label="menu of options for the current user"
            aria-controls="menu-appbar"
            aria-haspopup="true"
            onClick={handleMenu}
            color="inherit"
          >
            <MenuIcon />
          </IconButton>
          <Menu
            id="menu-appbar"
            anchorEl={anchor}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'bottom',
              horizontal: 'right',
            }}
            keepMounted
            open={isProfileOpen}
            onClose={handleClose}
          >
            <MenuItem onClick={handleProfile}>Profile</MenuItem>
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </MaterialAppBar>
  );
};
