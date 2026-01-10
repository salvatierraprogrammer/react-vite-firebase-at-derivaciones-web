import {
  Container,
  Box,
  Typography,
  Paper,
  Divider,
  Button,
  Stack,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import logo from "../assets/logo.png";
import { colors } from "../styles";

function GraciasAT() {
  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper sx={{ p: 4, borderRadius: 3, textAlign: "center" }}>
          <img src={logo} alt="Logo" style={{ width: 90 }} />

        <Divider sx={{ mb: 3 }} />
          <CheckCircleOutlineIcon
            sx={{ fontSize: 60, color: colors.primary, mt: 2 }}
          />

          <Typography variant="h5" sx={{ fontWeight: 600, mt: 1 }}>
            ¡Registro enviado correctamente!
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 3 }}>
            Cuando tengamos solicitudes acordes a tu perfil y zona,
            te contactaremos por <strong>WhatsApp</strong>.
          </Typography>

        <Divider sx={{ mb: 3 }} />
          {/* Acciones */}
          <Stack spacing={1.5}>
            <Button
              startIcon={<FacebookIcon />}
              variant="outlined"
              href="https://www.facebook.com/AbordandoSaludMental"
              target="_blank"
            >
              Seguinos en Facebook
            </Button>

            <Button
              startIcon={<InstagramIcon />}
              variant="outlined"
              href="https://www.instagram.com/elcanaldelat/"
              target="_blank"
            >
              Seguinos en Instagram
            </Button>


          </Stack>

          <Typography
            variant="caption"
            sx={{ display: "block", mt: 3, color: "#777" }}
          >
            Podés cerrar esta página cuando quieras.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default GraciasAT;
