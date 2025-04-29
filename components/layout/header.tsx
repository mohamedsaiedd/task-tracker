"use client";

import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
  Switch,
  Button,
} from "@mui/material";
import {
  Menu as MenuIcon,
  Home as HomeIcon,
  Settings as SettingsIcon,
  User as AccountCircleIcon, // Lucide-react uses 'User' for account
  Sun as LightModeIcon, // Lucide-react uses 'Sun' for light mode
  Moon as DarkModeIcon, // Lucide-react uses 'Moon' for dark mode
  ListCheck as HabitsIcon, // Lucide-react uses 'ListBullet' for habits
} from "lucide-react";
import { useTheme } from "@mui/material/styles";
import Link from "next/link";
import { ActivitySquare } from "lucide-react";
import { User } from "@/lib/types";
import Image from 'next/image';

type HeaderProps = {
  user: User | null | undefined;
};

export function Header({ user }: HeaderProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const theme = useTheme();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  return (
    <AppBar position="sticky" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: 'background.paper', borderBottom: `1px solid ${theme.palette.divider}` }}>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mr: 2 }}>
            <ActivitySquare size={24} color="black" />
            <Link href="" style={{ textDecoration: 'none' }}>
              <Typography color="black" variant="h6" noWrap component="div" >
                Habit Tracker
              </Typography>
            </Link>
          </Box>
          <Box sx={{ display: { xs: 'none', sm: 'flex' } }}>
            <Link href="/habits">
              <Typography fontSize={16} color="black" sx={{ ml: 1 }} className="px-4" variant="body2">Habits</Typography>
            </Link>
          </Box>
        </Box>
        {user ? (
          <Box>
            <IconButton
              color="inherit"
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
              onClick={handleClick}
            >
              { user.picture ?
                <Image
                src={user.picture}
                alt={user.name || "User Avatar"}
                width={40}
                height={40}
                className="rounded-full"
                /> : <Avatar />

            }
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              id="account-menu"
              open={open}
              onClose={handleClose}
              onClick={handleClose}
              PaperProps={{
                elevation: 0,
                sx: {
                  overflow: 'visible',
                  filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                  mt: 1.5,
                  '& .MuiAvatar-root': {
                    width: 32,
                    height: 32,
                    ml: -0.5,
                    mr: 1,
                  },
                  '&:before': {
                    content: '""',
                    display: 'block',
                    position: 'absolute',
                    top: 0,
                    right: 14,
                    width: 10,
                    height: 10,
                    bgcolor: 'background.paper',
                    transform: 'translateY(-50%) rotate(45deg)',
                    zIndex: 0,
                  },
                },
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              <MenuItem onClick={handleClose} component={Link} href="">
                <p className="text-[2px]  uppercase">Welcome <strong> {user.nickname} </strong>
                </p>
              </MenuItem>
              {/* <MenuItem sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} disableRipple>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ListItemIcon sx={{ mr: 1 }}>
                  <DarkModeIcon />
                </ListItemIcon>
                Theme
              </Box>
            </MenuItem> */}
              <MenuItem onClick={handleClose} component={Link} href="/auth/logout">
                Logout
              </MenuItem>
            </Menu>
          </Box>
        ) : (
          <Button variant="outlined">
            <Link href="/auth/login">
              <Typography fontSize={16} color="black" sx={{ ml: 1 }} className="px-4" variant="body2">Login</Typography>
          </Link>
          </Button>
        )
        }
      </Toolbar>
    </AppBar>
  );
}