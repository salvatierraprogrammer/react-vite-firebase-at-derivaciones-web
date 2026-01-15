import { Box, Container, Typography, Stack, Button } from "@mui/material";
import PersonAddAltIcon from "@mui/icons-material/PersonAddAlt";
import AssignmentIndIcon from "@mui/icons-material/AssignmentInd";
import { useNavigate } from "react-router-dom";
import { colors } from "../../styles";

export default function Hero() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 8, md: 12 },
        background:
          "radial-gradient(80% 60% at 50% 0%, #efe7ff 0%, #ffffff 70%)",
      }}
    >
      <Container maxWidth="md">
        <Stack spacing={4} alignItems="center" textAlign="center">
          {/* Badge */}
          <Typography
            variant="caption"
            sx={{
              px: 2,
              py: 0.5,
              borderRadius: 999,
              backgroundColor: "rgba(108, 99, 255, 0.1)",
              color: colors.primary,
              fontWeight: 600,
              letterSpacing: 0.5,
            }}
          >
            PLATAFORMA PROFESIONAL
          </Typography>

          {/* Título */}
          <Typography
            variant="h3"
            fontWeight={800}
            lineHeight={1.15}
            color={colors.textPrimary}
          >
            Vinculación profesional
            <br />
            en salud mental
          </Typography>

          {/* Subtítulo */}
          <Typography
            variant="body1"
            color="text.secondary"
            maxWidth={600}
            fontSize={18}
          >
            Conectamos acompañantes terapéuticos con familias e instituciones
            mediante procesos éticos, claros y organizados.
          </Typography>

          {/* CTAs */}
          <Stack direction={{ xs: "column", sm: "row" }} spacing={2.5}>
            <Button
              startIcon={<PersonAddAltIcon />}
              onClick={() => navigate("/registro-at")}
              size="large"
              sx={{
                px: 5,
                py: 1.6,
                borderRadius: 999,
                fontWeight: 600,
                backgroundColor: colors.primary,
                color: "#fff",
                boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
                "&:hover": {
                  backgroundColor: colors.textPrimary,
                },
              }}
            >
              Soy AT
            </Button>

            <Button
              startIcon={<AssignmentIndIcon />}
              onClick={() => navigate("/solicitar-at")}
              size="large"
              variant="outlined"
              sx={{
                px: 5,
                py: 1.6,
                borderRadius: 999,
                fontWeight: 600,
                borderColor: colors.accent,
                color: colors.accent,
              }}
            >
              Busco AT
            </Button>
          </Stack>
        </Stack>
      </Container>
    </Box>
  );
}
