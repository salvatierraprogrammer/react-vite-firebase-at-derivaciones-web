import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Box,
  Typography,
} from "@mui/material";
import SolicitudDetalleModal from "./SolicitudDetalleModal";

export default function SolicitudesTable({ solicitudes, onVerMatches }) {
  const [openDetalle, setOpenDetalle] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);

  const handleVerDetalle = (solicitud) => {
    setSolicitudSeleccionada(solicitud);
    setOpenDetalle(true);
  };

  const handleCloseDetalle = () => {
    setOpenDetalle(false);
    setSolicitudSeleccionada(null);
  };

  return (
    <Box p={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Zona</TableCell>
            <TableCell>Acompañamiento</TableCell>
            <TableCell>Prestación</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {solicitudes.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.nombre}</TableCell>

              <TableCell>
                <Typography variant="body2">{s.zona}</Typography>
                {s.zona === "Interior / Otras provincias" && s.zonaInterior && (
                  <Typography variant="caption" color="text.secondary">
                    {s.zonaInterior}
                  </Typography>
                )}
              </TableCell>

              <TableCell>{s.tipoAcompanamiento}</TableCell>
              <TableCell>{s.tipoPrestacion}</TableCell>

              <TableCell>
                <Chip
                  label={s.estado}
                  color={s.estado === "nuevo" ? "warning" : "success"}
                  size="small"
                />
              </TableCell>

              <TableCell>
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => handleVerDetalle(s)}
                  sx={{ mr: 1, mb: 0.5 }}
                >
                  Ver detalle
                </Button>

                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => onVerMatches(s)}
                  sx={{ mr: 1, mb: 0.5 }}
                >
                  Ver matches
                </Button>

                <Button
                  size="small"
                  variant="contained"
                  href={`https://wa.me/${s.whatsapp}`}
                  target="_blank"
                >
                  WhatsApp
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      {/* MODAL */}
      <SolicitudDetalleModal
        open={openDetalle}
        onClose={handleCloseDetalle}
        solicitud={solicitudSeleccionada}
      />
    </Box>
  );
}