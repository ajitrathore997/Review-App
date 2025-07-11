import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

const Navbar = () => {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("sm"));

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "secondary.main",
        boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
      }}
    >
      <Toolbar
        sx={{ maxWidth: 1200, width: "100%", mx: "auto", px: { xs: 2, sm: 3 } }}
      >
        <Box
          component={Link}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            textDecoration: "none",
            flexGrow: 1,
            overflow: "hidden",
            whiteSpace: "nowrap",
          }}
        >
          <Box
            component="img"
            to="/"
            src="/logo512.png"
            alt="logo"
            sx={{
              width: 32,
              height: 32,
              mr: 1,
            }}
          />

          <Typography
            variant={isSmUp ? "h5" : "body1"}
            component="span"
            sx={{
              display: "flex",
              alignItems: "center",
              color: "text.primary",
              fontWeight: 200,
            }}
          >
            <Box
              component="span"
              sx={{
                background: "linear-gradient(90deg, #800080, rgb(93, 32, 215))",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                fontWeight: 500,
              }}
            >
              Review
            </Box>
            <Box component="span" sx={{ color: "#9c27b0", mx: 0.5 }}>
              &
            </Box>
            <Box component="span" sx={{ color: "#000", fontWeight: "bold" }}>
              RATE
            </Box>
          </Typography>
        </Box>

        {/* <Box>
          <Button
            component={Link}
            to="/"
            sx={{
              color: "text.primary",
              "&:hover": { color: "primary.main" },
              fontSize: { xs: "0.8rem", sm: "1rem" }, // smaller font on xs
              minWidth: 64,
              paddingX: { xs: 1, sm: 2 },
            }}
          >
            Home
          </Button>
        </Box> */}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
