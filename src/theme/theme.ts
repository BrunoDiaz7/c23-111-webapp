"use client";
import { createTheme } from "@mui/material";
import montserrat from "@/fonts/montserrat";

const pxToRem = (value: number) => {
  return `${value / 16}rem`;
};

const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#F48E28",
    },
    secondary: {
      main: "#F5DDC4",
    },
    error: {
      main: "#FE645E",
    },
  },

  typography: {
    fontFamily: montserrat.style.fontFamily,
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 1024,
      lg: 1500,
      xl: 1800,
    },
  },

  components: {
    MuiTypography: {},
  },
});

const customTypography = {
  h1: {
    fontSize: pxToRem(45),
    color: theme.palette.primary.main,
    fontWeight: 700,
    [theme.breakpoints.down("md")]: {
      fontSize: pxToRem(40),
    },
  },
  h2: {
    fontSize: pxToRem(30),
    color: "#000",
    fontWeight: 500,
    [theme.breakpoints.down("md")]: {
      fontSize: pxToRem(30),
    },
  },
  h3: {
    fontSize: pxToRem(25),
    color: "#000",
    fontWeight: 700,
    [theme.breakpoints.down("md")]: {
      fontSize: pxToRem(26),
    },
  },
  h4: {
    fontSize: pxToRem(20),
    color: "#000000",
    fontWeight: 700,
    [theme.breakpoints.down("md")]: {
      fontsize: pxToRem(20),
    },
  },
  body1: {
    fontSize: pxToRem(15),
    color: "#000",
    fontWeight: 400,
    [theme.breakpoints.down("md")]: {
      fontSize: pxToRem(10),
    },
  },
  body2: {
    fontSize: pxToRem(13),
    color: "#000",
    fontWeight: 400,
    [theme.breakpoints.down("md")]: {
      fontSize: pxToRem(20),
    },
  },
  caption:{
    fontSize: pxToRem(12),
    color: "gray",
    fontWeight: 500,
    [theme.breakpoints.up("md")]: {
      fontSize: pxToRem(11),
    },
  }
};

if (theme?.components?.MuiTypography) {
  theme.components.MuiTypography.styleOverrides = customTypography;
}

export default theme;
