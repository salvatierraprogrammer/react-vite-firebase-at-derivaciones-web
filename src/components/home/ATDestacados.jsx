import {
  Container,
  Typography,
  Grid,
  Paper,
  Avatar,
  Box,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/logo.png";
import { colors } from "../../styles";

/* 👉 nombres destacados normalizados */
const DESTACADOS_NOMBRES = [
  "diego salvatierra",
  "nicolas rocha",
  "erika noguera ordonez",
  
];

/* 👉 normalizar texto */
const normalizar = (texto = "") =>
  texto
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .trim();

/* 👉 mostrar solo nombre público */
const formatearNombrePublico = (nombreCompleto = "") => {
  const partes = nombreCompleto.trim().split(" ");
  const primerNombre = partes[0] || "";
  const inicialSegundo = partes[1] ? `${partes[1][0]}.` : "";
  return `${primerNombre} ${inicialSegundo}`.trim();
};

/* 🎨 colores chips */
const chipColors = ["primary", "secondary", "success", "warning", "info"];

/* 👉 parsear especializaciones */
const parsearEspecializaciones = (texto = "") =>
  texto
    .toLowerCase()
    .replace(/\s+y\s+/g, ",")
    .split(",")
    .map((e) => e.trim())
    .filter(Boolean);

export default function ATDestacados() {
  const [ats, setAts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchATs = async () => {
      const q = query(
        collection(db, "at_registros"),
        where("estado", "==", "activo")
      );

      const snapshot = await getDocs(q);

      const filtrados = snapshot.docs
        .map((doc) => doc.data())
        .filter((at) =>
          DESTACADOS_NOMBRES.includes(normalizar(at.nombre))
        )
        .sort(
          (a, b) =>
            DESTACADOS_NOMBRES.indexOf(normalizar(a.nombre)) -
            DESTACADOS_NOMBRES.indexOf(normalizar(b.nombre))
        );

      setAts(filtrados);
    };

    fetchATs();
  }, []);

  return (
    <Box sx={{ backgroundColor: colors.background, py: 10 }}>
      <Container maxWidth="lg">
        <Typography
          variant="h5"
          fontWeight={800}
          mb={6}
          textAlign="center"
          color={colors.textPrimary}
        >
          Acompañantes de la red
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {ats.map((at, i) => {
            const especializaciones = parsearEspecializaciones(
              at.especializaciones
            );
            const visibles = especializaciones.slice(0, 3);
            const hayMas = especializaciones.length > 3;

            return (
              <Grid item xs={12} sm={6} md={3} key={i}>
<Paper
  elevation={0}
  sx={{
    position: "relative",
    p: 3.5,
    borderRadius: 4,
    height: "100%",
    border: "1px solid rgba(0,0,0,0.08)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
    transition: "all .25s ease",
    "&:hover": {
      transform: "translateY(-4px)",
      boxShadow: "0 16px 32px rgba(0,0,0,0.1)",
    },
  }}
>
  {/* ⭐ DESTACADO */}
  <Box
    sx={{
      position: "absolute",
      top: 12,
      right: 12,
      px: 1.2,
      py: 0.4,
      borderRadius: 999,
      backgroundColor: colors.accent,
      display: "flex",
      alignItems: "center",
      gap: 0.5,
    }}
  >
    <StarIcon sx={{ color: "#fff", fontSize: 14 }} />
    <Typography variant="caption" sx={{ color: "#fff", fontWeight: 600 }}>
      Destacado
    </Typography>
  </Box>

  {/* AVATAR */}
  <Avatar
    src={logo}
    sx={{
      width: 72,
      height: 72,
      mb: 2,
      backgroundColor: "#f5f5f5",
      "& img": {
        objectFit: "contain",
        p: 1,
      },
    }}
  />

  {/* NOMBRE */}
  <Typography
    fontWeight={700}
    color={colors.textPrimary}
    sx={{ mb: 0.2 }}
  >
    {formatearNombrePublico(at.nombre)}
  </Typography>

  {/* ZONA */}
  <Typography variant="body2" color="text.secondary" mb={1}>
    Acompañante Terapéutico · {at.zonas?.[0] || "Argentina"}
  </Typography>

  {/* ESTADO */}
  <Chip
    label="Disponible"
    size="small"
    sx={{
      mb: 2,
      fontWeight: 600,
      backgroundColor: "rgba(76,175,80,0.12)",
      color: "#2e7d32",
    }}
  />

  {/* ESPECIALIZACIONES */}
  <Stack
    direction="row"
    spacing={0.8}
    justifyContent="center"
    flexWrap="wrap"
    mb={2}
  >
    {visibles.map((esp, idx) => (
      <Chip
        key={idx}
        label={esp}
        size="small"
        sx={{
          mb: 0.5,
          textTransform: "capitalize",
          backgroundColor: "rgba(0,0,0,0.04)",
          fontWeight: 500,
        }}
      />
    ))}

    {hayMas && (
      <Chip
        label="+ más"
        size="small"
        variant="outlined"
        sx={{ mb: 0.5 }}
      />
    )}
  </Stack>

  {/* BOTÓN */}
  <Button
    size="small"
    variant="contained"
    onClick={() => navigate("/solicitar-at")}
    sx={{
      mt: "auto",
      borderRadius: 999,
      px: 3,
      fontWeight: 600,
      backgroundColor: colors.primary,
      boxShadow: "none",
      "&:hover": {
        backgroundColor: colors.textPrimary,
      },
    }}
  >
    Contactar
  </Button>
</Paper>

              </Grid>
              
            );
          })}
        </Grid>
        <Typography
  mt={6}
  textAlign="center"
  fontWeight={600}
  color="text.secondary"
>
  Más de <strong>200 Acompañantes Terapéuticos</strong> disponibles para trabajar
</Typography>
      </Container>
    </Box>
  );
}
