import {
  Box,
  Container,
  Typography,
  Stack,
  Divider,
  Grid,
  IconButton,
} from "@mui/material";
import InstagramIcon from "@mui/icons-material/Instagram";
import FacebookIcon from "@mui/icons-material/Facebook";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function Footer() {
  return (
    <Box
      component="footer"
      sx={{
        backgroundColor: "#F8F7FA",
        mt: 10,
        pt: 5,
        pb: 4,
        borderTop: "1px solid #e0e0e0",
      }}
    >
      <Container maxWidth="lg">
        <Grid
          container
          spacing={4}
          justifyContent="space-between"
          alignItems="center"
        >
          {/* Marca */}
          <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "left" }}>
            <Typography
              variant="subtitle1"
              fontWeight={700}
              color="#1a1a1a"
              letterSpacing={0.3}
            >
              El Canal del AT
            </Typography>

            <Typography
              variant="body2"
              color="#616161"
              mt={1}
              maxWidth={320}
              mx={{ xs: "auto", md: 0 }}
            >
              Plataforma profesional para la conexión entre centros terapéuticos
              y acompañantes terapéuticos.
            </Typography>
          </Grid>

          {/* Redes */}
          <Grid item xs={12} md={4} textAlign="center">
            <Stack direction="row" spacing={1.5} justifyContent="center">
              <IconButton
                aria-label="Instagram"
                href="https://www.instagram.com/elcanaldelat/"
                target="_blank"
              >
                <InstagramIcon />
              </IconButton>

              <IconButton
                aria-label="Facebook"
                href="https://www.facebook.com/AbordandoSaludMental"
                target="_blank"
              >
                <FacebookIcon />
              </IconButton>

              <IconButton
                aria-label="WhatsApp"
                href="https://wa.me/5491123130391"
                target="_blank"
              >
                <WhatsAppIcon />
              </IconButton>
            </Stack>
          </Grid>

          {/* Copyright */}
          <Grid item xs={12} md={4} textAlign={{ xs: "center", md: "right" }}>
            <Typography variant="caption" color="#757575">
              © {new Date().getFullYear()} · Todos los derechos reservados
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ mt: 4 }} />
      </Container>
    </Box>
  );
}
