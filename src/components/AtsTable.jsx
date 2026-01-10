import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
  Chip,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from "@mui/material";
import ATRow from "./ATRow";
import ATProfileModal from "./ATProfileModal";

export default function AtsTable({ ats }) {
  const [selectedAT, setSelectedAT] = useState(null);
  const [open, setOpen] = useState(false);
  const [visibleCount, setVisibleCount] = useState(10); // Mostrar 10 inicialmente
  const [zonaFiltro, setZonaFiltro] = useState(""); // Filtro por zona
  const [busqueda, setBusqueda] = useState(""); // Buscador de texto

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

  // 🔹 Conteo de géneros
  const totalAT = ats.length;
  const femenino = ats.filter((at) => at.genero === "Femenino").length;
  const masculino = ats.filter((at) => at.genero === "Masculino").length;
  const noBinario = ats.filter(
    (at) => at.genero === "No binario" || at.genero === "Prefiere no decirlo"
  ).length;

  // 🔹 Filtrar por zona y búsqueda
  const atsFiltrados = ats.filter((at) => {
    const cumpleZona = zonaFiltro ? at.zonas?.includes(zonaFiltro) : true;
    const cumpleBusqueda = busqueda
      ? at.nombre.toLowerCase().includes(busqueda.toLowerCase())
      : true;
    return cumpleZona && cumpleBusqueda;
  });

  // 🔹 AT a mostrar según el límite visible
  const atsVisibles = atsFiltrados.slice(0, visibleCount);

  // 🔹 Zonas únicas para el select
  const zonasUnicas = [
    ...new Set(ats.flatMap((at) => at.zonas || [])),
  ].sort();

  return (
    <Box p={3}>
      {/* ===== RESUMEN ===== */}
      <Box mb={2} display="flex" gap={2} flexWrap="wrap">
        <Chip label={`Total AT: ${totalAT}`} color="primary" />
        <Chip label={`Femenino: ${femenino}`} color="success" />
        <Chip label={`Masculino: ${masculino}`} color="info" />
        {noBinario > 0 && (
          <Chip label={`No binario / Prefiere no decirlo: ${noBinario}`} color="warning" />
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