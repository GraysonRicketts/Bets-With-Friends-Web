import {
  Breadcrumbs,
  IconButton,
  Link,
  LinkProps,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { RootState } from "./store";
import React, { useState } from "react";
import { AppBar as MaterialAppBar } from "@mui/material";
import { useSelector } from "react-redux";
import { useLocation, Link as RouterLink } from "react-router-dom";

interface LinkRouterProps extends LinkProps {
  to: string;
  replace?: boolean;
}
const LinkRouter = (props: LinkRouterProps) => (
  <Link {...props} component={RouterLink as any} />
);

export const AppBar: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const location = useLocation();

  const handleMenu = () => {
    setIsProfileOpen(true);
  };

  const handleClose = () => {
    setIsProfileOpen(false);
  };

  return (
    <MaterialAppBar position="fixed" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar>
        <Breadcrumbs
          aria-label="breadcrumb"
          component="div"
          sx={{ flexGrow: 1 }}
        >
          <LinkRouter underline="hover" color="white" variant="h6" to="/">
            Home
          </LinkRouter>

          {location.pathname.includes("group") && (
            <Typography color="white" variant="h6">
              Groups
            </Typography>
          )}
        </Breadcrumbs>
        {user && (
          <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              open={isProfileOpen}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose}>Profile</MenuItem>
              <MenuItem onClick={handleClose}>Logout</MenuItem>
            </Menu>
          </div>
        )}
      </Toolbar>
    </MaterialAppBar>
  );
};
