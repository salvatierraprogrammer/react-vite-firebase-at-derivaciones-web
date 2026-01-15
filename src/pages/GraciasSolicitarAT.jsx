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
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import { colors } from "../styles";

function GraciasSolicitarAT() {
  const navigate = useNavigate();

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

          <Divider sx={{ my: 3 }} />

          <CheckCircleOutlineIcon
            sx={{ fontSize: 60, color: colors.primary }}
          />

          <Typography variant="h5" fontWeight={600} mt={1}>
            ¡Solicitud enviada correctamente!
          </Typography>

          <Divider sx={{ my: 2 }} />

          <Typography variant="body1" sx={{ mb: 3 }}>
            Recibimos tu solicitud de <strong>Acompañante Terapéutico</strong>.
            En breve nos pondremos en contacto para ofrecerte
            perfiles acordes a tu necesidad.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Stack spacing={1.5}>
            <Button
              variant="contained"
              onClick={() => navigate("/")}
              sx={{
                borderRadius: 999,
                fontWeight: 600,
                backgroundColor: colors.primary,
                "&:hover": {
                  backgroundColor: colors.textPrimary,
                },
              }}
            >
              Volver al inicio
            </Button>

            <Button
              startIcon={<InstagramIcon />}
              variant="outlined"
              href="https://www.instagram.com/elcanaldelat/"
              target="_blank"
            >
              Seguinos en Instagram
            </Button>

            <Button
              startIcon={<FacebookIcon />}
              variant="outlined"
              href="https://www.facebook.com/AbordandoSaludMental"
              target="_blank"
            >
              Seguinos en Facebook
            </Button>
          </Stack>

          <Typography
            variant="caption"
            sx={{ display: "block", mt: 3, color: "#777" }}
          >
            Gracias por confiar en El Canal del AT.
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default GraciasSolicitarAT;
