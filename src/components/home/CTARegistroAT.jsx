import { Box, Container, Typography, Button, Stack } from "@mui/material";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { colors } from "../../styles";

export default function CTARegistroAT() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background:
          "linear-gradient(135deg, rgba(108,99,255,0.08), rgba(108,99,255,0.02))",
        py: { xs: 8, md: 10 },
      }}
    >
      <Container>
        <Stack spacing={3} alignItems="center" textAlign="center">
          {/* Título */}
          <Typography
            variant="h5"
            fontWeight={800}
            color={colors.textPrimary}
          >
            ¿Querés formar parte de la red profesional?
          </Typography>

          {/* Subtítulo */}
          <Typography
            color="text.secondary"
            maxWidth={520}
            fontSize={16}
          >
            Sumate como acompañante terapéutico y comenzá a recibir propuestas
            de trabajo de manera organizada y transparente.
          </Typography>

          {/* CTA */}
          <Button
            startIcon={<WhatsAppIcon />}
            onClick={() => navigate("/registro-at")}
            size="large"
            sx={{
              px: 5,
              py: 1.6,
              borderRadius: 999,
              fontWeight: 600,
              backgroundColor: colors.primary,
              color: "#fff",
              boxShadow: "0 10px 24px rgba(0,0,0,0.12)",
              "&:hover": {
                backgroundColor: colors.textPrimary,
              },
            }}
          >
            Registrarse como AT
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
