import { useState } from "react";
import { Outlet } from "react-router-dom";

import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  type CSSObject,
  Drawer,
  IconButton,
  type Theme,
  Toolbar,
  styled,
} from "@mui/material";

import { theme } from "@config/styles";
import AppIconButton from "@features/ui/AppIconButton";
import { useBreakpoints } from "@store/hooks/useBreakpoints";

import AccountSidebar from "./AccountSidebar";

const DESKTOP_DRAWER_WIDTH = 288;
const DESKTOP_MINIMIZED_DRAWER_WIDTH = 94;

const openedMixin = (theme: Theme): CSSObject => ({
  width: DESKTOP_DRAWER_WIDTH,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme: Theme): CSSObject => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: DESKTOP_MINIMIZED_DRAWER_WIDTH,
});

const StyledDrawer = styled(Drawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: DESKTOP_DRAWER_WIDTH,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const TOOLBAR_STYLES = { mt: 2, mb: 1 };

export default function AccountLayout() {

  const { md, xl } = useBreakpoints();
  const [isOpen, setOpen] = useState(xl);


  const closeDrawer = () => {
    setOpen(false);
  };

  const handleDrawerToggle = () => {
    setOpen(!isOpen);
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Desktop Drawer */}
      {md && (
        <>
          <StyledDrawer variant="permanent" open={isOpen}>
            <AccountSidebar onClose={closeDrawer} isMinimized={!isOpen} />
          </StyledDrawer>
          <AppIconButton
            isSmall
            aria-label="sidebar toggle button"
            onClick={handleDrawerToggle}
            sx={{
              borderRadius: 1,
              position: "absolute",
              top: 27,
              left: `calc(${
                isOpen ? DESKTOP_DRAWER_WIDTH : DESKTOP_MINIMIZED_DRAWER_WIDTH
              }px - 17px)`,
              background: "white",
              zIndex: theme.zIndex.drawer + 1,
              transition: theme.transitions.create("left", {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
              }),
              ":hover": {
                background: "white",
              },
            }}
          >
            {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </AppIconButton>
        </>
      )}
      {/* Mobile Drawer */}
      {!md && (
        <>
          <AppBar
            position="fixed"
            sx={{ boxShadow: "none", backgroundColor: "grey.100" }}
          >
            <Toolbar sx={TOOLBAR_STYLES}>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
              >
                <MenuIcon sx={{ color: "primary.main", fontSize: 40 }} />
              </IconButton>
            </Toolbar>
          </AppBar>
          <Drawer
            variant="temporary"
            open={isOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: DESKTOP_DRAWER_WIDTH,
              },
            }}
          >
            <AccountSidebar onClose={closeDrawer} />
          </Drawer>
        </>
      )}
      <Box
        component="main"
        sx={{
          width: "100%",
          bgcolor: "grey.100",
          minHeight: "100vh",
          height: "auto",
          px: {
            xs: 2,
            md: 7,
          },
          pt: {
            xs: 0,
            md: 4,
          },
          pb: 4,
        }}
      >
        <Toolbar sx={{ display: { md: "none" }, ...TOOLBAR_STYLES }} />
        <Outlet />
      </Box>
    </Box>
  );
}
