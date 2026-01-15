import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Stack,
  Box,
  IconButton,
  Drawer,
  Divider,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import logo from "../../assets/logoweb.png";
import { colors } from "../../styles";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const goHome = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    setOpen(false);
  };

  return (
    <>
      <AppBar
        position="static"
        elevation={0}
        sx={{
          bgcolor: "#fff",
          borderBottom: "1px solid #eee",
          color: colors.textPrimary,
        }}
      >
        <Toolbar sx={{ justifyContent: "space-between" }}>
          {/* Logo */}
          <Stack
            direction="row"
            alignItems="center"
            spacing={1.5}
            onClick={goHome}
            sx={{ cursor: "pointer" }}
          >
            <img src={logo} alt="El Canal del AT" height={50} />
            <Typography
              fontWeight={800}
              sx={{
                fontWeight: 800,
                background: `linear-gradient(90deg, ${colors.primary}, #6c63ff)`,
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              El Canal del AT
            </Typography>
          </Stack>

          {/* Desktop actions */}
          <Stack
            direction="row"
            spacing={2}
            sx={{ display: { xs: "none", md: "flex" } }}
          >
            <Button
              onClick={() => goTo("/solicitar-at")}
              sx={{
                fontWeight: 600,
                color: colors.textPrimary,
              }}
            >
              Solicitar AT
            </Button>

            <Button
              onClick={() => goTo("/registro-at")}
              sx={{
                borderRadius: 999,
                px: 3,
                fontWeight: 600,
                backgroundColor: colors.primary,
                color: "#fff",
                "&:hover": {
                  backgroundColor: colors.textPrimary,
                },
              }}
            >
              Soy AT
            </Button>
          </Stack>

          {/* Mobile menu */}
          <IconButton
            sx={{ display: { xs: "flex", md: "none" } }}
            onClick={() => setOpen(true)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Drawer mobile */}
      <Drawer
        anchor="right"
        open={open}
        onClose={() => setOpen(false)}
      >
        <Box sx={{ width: 260, p: 3 }}>
          <Stack spacing={2}>
            <Typography fontWeight={700}>
              El Canal del AT
            </Typography>

            <Divider />

            <Button
              onClick={() => goTo("/")}
              sx={{ justifyContent: "flex-start" }}
            >
              Inicio
            </Button>

            <Button
              onClick={() => goTo("/solicitar-at")}
              sx={{ justifyContent: "flex-start" }}
            >
              Solicitar AT
            </Button>

            <Button
              onClick={() => goTo("/registro-at")}
              sx={{
                justifyContent: "flex-start",
                fontWeight: 600,
                color: colors.primary,
              }}
            >
              Soy AT
            </Button>
          </Stack>
        </Box>
      </Drawer>
    </>
  );
}
