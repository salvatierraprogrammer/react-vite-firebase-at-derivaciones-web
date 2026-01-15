import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
} from "@mui/material";
import VerifiedIcon from "@mui/icons-material/Verified";
import GroupsIcon from "@mui/icons-material/Groups";
import WorkOutlineIcon from "@mui/icons-material/WorkOutline";
import { colors } from "../../styles";

const items = [
  {
    icon: <VerifiedIcon />,
    title: "Solicitudes verificadas",
    text: "Casos reales y filtrados.",
  },
  {
    icon: <GroupsIcon />,
    title: "Red profesional",
    text: "Base privada de AT por zona.",
  },
  {
    icon: <WorkOutlineIcon />,
    title: "Derivación clara",
    text: "Gestión y contacto organizado.",
  },
];

export default function ComoFunciona() {
  return (
    <Box sx={{ py: { xs: 8, md: 12 }, backgroundColor: "#fff" }}>
      <Container maxWidth="xl">
        {/* Control de ancho */}
        <Box sx={{ maxWidth: 1100, mx: "auto" }}>
          <Typography
            variant="h4"
            fontWeight={800}
            textAlign="center"
            mb={{ xs: 4, md: 6 }}
          >
            ¿Cómo funciona?
          </Typography>

          <Grid container spacing={4} justifyContent="center">
            {items.map((item, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    height: "100%",
                    borderRadius: 4,
                    textAlign: "center",
                    border: "1px solid rgba(0,0,0,0.06)",
                    transition: "all .25s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 18px 40px rgba(0,0,0,0.08)",
                    },
                  }}
                >
                  {/* ICONO */}
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: "50%",
                      backgroundColor: "rgba(120,80,170,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      mx: "auto",
                      mb: 2.5,
                      color: colors.primary,
                      fontSize: 32,
                    }}
                  >
                    {item.icon}
                  </Box>

                  <Typography fontWeight={700} mb={1}>
                    {item.title}
                  </Typography>

                  <Typography color="text.secondary" lineHeight={1.6}>
                    {item.text}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
