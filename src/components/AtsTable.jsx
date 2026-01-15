import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Chip,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Paper,
  Stack,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import ATRow from "./ATRow";
import ATProfileModal from "./ATProfileModal";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import TransgenderIcon from "@mui/icons-material/Transgender";
import GroupsIcon from "@mui/icons-material/Groups";

export default function AtsTable({ ats }) {
  const [selectedAT, setSelectedAT] = useState(null);
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10);
  const [zonaFiltro, setZonaFiltro] = useState("");
  const [busqueda, setBusqueda] = useState("");

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleVerPerfil = (at) => {
    setSelectedAT(at);
    setOpen(true);
  };

  const handleClose = () => {
    setSelectedAT(null);
    setOpen(false);
  };

  const handleMostrarMas = () => {
    setVisibleCount((prev) => prev + 10);
  };

  /* ===== AT ÚNICOS ===== */
  const atsUnicos = ats.filter(
    (at, index, self) =>
      index === self.findIndex((t) => t.whatsapp === at.whatsapp)
  );

  /* ===== CONTADORES ===== */
  const totalAT = atsUnicos.length;
  const femenino = atsUnicos.filter((at) => at.genero === "Femenino").length;
  const masculino = atsUnicos.filter((at) => at.genero === "Masculino").length;
  const noBinario = atsUnicos.filter(
    (at) =>
      at.genero === "No binario" || at.genero === "Prefiere no decirlo"
  ).length;

  /* ===== FILTROS ===== */
  const atsFiltrados = atsUnicos
    .filter((at) => {
      const cumpleZona = zonaFiltro ? at.zonas?.includes(zonaFiltro) : true;
      const cumpleBusqueda = busqueda
        ? at.nombre.toLowerCase().includes(busqueda.toLowerCase())
        : true;
      return cumpleZona && cumpleBusqueda;
    })
    .sort((a, b) => {
      const fechaA = a.createdAt?.toDate
        ? a.createdAt.toDate()
        : new Date(a.createdAt);
      const fechaB = b.createdAt?.toDate
        ? b.createdAt.toDate()
        : new Date(b.createdAt);
      return fechaB - fechaA;
    });

  const atsVisibles = atsFiltrados.slice(0, visibleCount);

  const zonasUnicas = [...new Set(ats.flatMap((at) => at.zonas || []))].sort();

  return (
    <Box p={{ xs: 1, md: 3 }}>
      {/* ===== RESUMEN ===== */}
      <Box mb={2} display="flex" gap={1.5} flexWrap="wrap">
        <Chip icon={<GroupsIcon />} label={`Total AT: ${totalAT}`} />
        <Chip icon={<WcIcon />} label={`Femenino: ${femenino}`} color="success" />
        <Chip icon={<PersonIcon />} label={`Masculino: ${masculino}`} />
        {noBinario > 0 && (
          <Chip
            icon={<TransgenderIcon />}
            label={`No binario / Prefiere no decirlo: ${noBinario}`}
            color="warning"
          />
        )}
      </Box>

      {/* ===== FILTROS ===== */}
      <Box mb={2} display="flex" gap={2} flexWrap="wrap">
        <FormControl sx={{ minWidth: 180 }}>
          <InputLabel>Filtrar por zona</InputLabel>
          <Select
            value={zonaFiltro}
            onChange={(e) => setZonaFiltro(e.target.value)}
            label="Filtrar por zona"
          >
            <MenuItem value="">Todas</MenuItem>
            {zonasUnicas.map((zona) => (
              <MenuItem key={zona} value={zona}>
                {zona}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <TextField
          label="Buscar por nombre"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </Box>

      {/* ================= MOBILE ================= */}
      {isMobile ? (
        <Stack spacing={2}>
          {atsVisibles.map((at) => (
            <Paper key={at.id} sx={{ p: 2, borderRadius: 2 }}>
              <Stack spacing={1}>
                <Typography fontWeight={600}>{at.nombre}</Typography>

                <Typography variant="body2">
                  <strong>Zonas:</strong> {at.zonas?.join(", ")}
                </Typography>

                <Typography variant="body2">
                  <strong>Tipos:</strong>{" "}
                  {at.tiposAcompanamiento?.join(", ")}
                </Typography>

                <Chip
                  label={at.estado || "Activo"}
                  size="small"
                  color="success"
                  sx={{ alignSelf: "flex-start" }}
                />

                <Button
                  size="small"
                  variant="contained"
                  onClick={() => handleVerPerfil(at)}
                >
                  Ver perfil
                </Button>
              </Stack>
            </Paper>
          ))}

          {atsVisibles.length === 0 && (
            <Typography align="center">No se encontraron AT</Typography>
          )}
        </Stack>
      ) : (
        /* ================= DESKTOP ================= */
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Zona</TableCell>
              <TableCell>Tipos</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {atsVisibles.map((at) => (
              <ATRow key={at.id} at={at} onVerPerfil={handleVerPerfil} />
            ))}
            {atsVisibles.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No se encontraron AT
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}

      {/* ===== MOSTRAR MÁS ===== */}
      {visibleCount < atsFiltrados.length && (
        <Box mt={2} textAlign="center">
          <Button variant="outlined" onClick={handleMostrarMas}>
            Mostrar más
          </Button>
        </Box>
      )}

      {/* ===== MODAL ===== */}
      <ATProfileModal at={selectedAT} open={open} onClose={handleClose} />
    </Box>
  );
}
