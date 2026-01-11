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

  // 🔹 Filtrar duplicados por WhatsApp antes de calcular totales
  const atsUnicos = ats.filter(
    (at, index, self) =>
      index === self.findIndex((t) => t.whatsapp === at.whatsapp)
  );

  // 🔹 Conteo de géneros usando atsUnicos
  const totalAT = atsUnicos.length;
  const femenino = atsUnicos.filter((at) => at.genero === "Femenino").length;
  const masculino = atsUnicos.filter((at) => at.genero === "Masculino").length;
  const noBinario = atsUnicos.filter(
    (at) => at.genero === "No binario" || at.genero === "Prefiere no decirlo"
  ).length;

  // 🔹 Filtrar por zona y búsqueda, y ordenar por createdAt descendente
  const atsFiltrados = ats
    .filter((at) => {
      const cumpleZona = zonaFiltro ? at.zonas?.includes(zonaFiltro) : true;
      const cumpleBusqueda = busqueda
        ? at.nombre.toLowerCase().includes(busqueda.toLowerCase())
        : true;
      return cumpleZona && cumpleBusqueda;
    })
    .filter(
      (at, index, self) =>
        index === self.findIndex((t) => t.whatsapp === at.whatsapp)
    )
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
    <Box p={3}>
      {/* ===== RESUMEN ===== */}
      <Box mb={2} display="flex" gap={2} flexWrap="wrap">
        <Chip
          icon={<GroupsIcon />}
          label={`Total AT: ${totalAT}`}
          color="primary"
        />
        <Chip
          icon={<WcIcon />}
          label={`Femenino: ${femenino}`}
          color="success"
        />
        <Chip
          icon={<PersonIcon />}
          label={`Masculino: ${masculino}`}
          color="info"
        />
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

      {/* ===== TABLA ===== */}
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

      {/* ===== BOTÓN MOSTRAR MÁS ===== */}
      {visibleCount < atsFiltrados.length && (
        <Box mt={2} textAlign="center">
          <Button variant="outlined" onClick={handleMostrarMas}>
            Mostrar más
          </Button>
        </Box>
      )}

      {/* ===== MODAL DE PERFIL ===== */}
      <ATProfileModal at={selectedAT} open={open} onClose={handleClose} />
    </Box>
  );
}