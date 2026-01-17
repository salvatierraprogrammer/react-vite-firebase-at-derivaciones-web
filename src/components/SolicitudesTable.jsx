import { useState } from "react";
import {
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Box,
  Typography,
  Paper,
  Stack,
  useMediaQuery,
  useTheme,
  CircularProgress,
  Select,
  MenuItem,
} from "@mui/material";

import SolicitudDetalleModal from "./SolicitudDetalleModal";
import { generarTextoWhatsAppCliente } from "../utils/generarTextoWhatsAppCliente";
import { generarTextoWhatsAppLiberarContacto } from "../utils/generarTextoWhatsAppLiberarContacto";

/* ---------------- ESTADOS ---------------- */
const estados = ["nuevo", "en_proceso", "cerrado", "pagado"];

export default function SolicitudesTable({
  solicitudes = [],
  onVerMatches,
  matchesPorSolicitud = {},
  loading = false,
}) {
  const [openDetalle, setOpenDetalle] = useState(false);
  const [solicitudSeleccionada, setSolicitudSeleccionada] = useState(null);
  const [estadosLocal, setEstadosLocal] = useState({});

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  /* ================= WHATSAPP MATCHES ================= */
  const generarLinkWhatsappMatches = (solicitud) => {
    const matches = matchesPorSolicitud[solicitud.id] || [];
    if (!solicitud?.whatsapp || matches.length === 0) return null;

    const telefono = solicitud.whatsapp.replace(/\D/g, "");
    if (telefono.length < 8) return null;

    const texto = generarTextoWhatsAppCliente({ solicitud, matches });
    return `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(texto)}`;
  };

  /* ================= WHATSAPP LIBERAR ================= */
  const generarLinkWhatsappLiberar = (solicitud) => {
    const matches = matchesPorSolicitud[solicitud.id] || [];
    if (!solicitud?.whatsapp || matches.length === 0) return null;

    const telefono = solicitud.whatsapp.replace(/\D/g, "");
    if (telefono.length < 8) return null;

    const texto = generarTextoWhatsAppLiberarContacto({ solicitud, matches });
    return `https://api.whatsapp.com/send?phone=${telefono}&text=${encodeURIComponent(texto)}`;
  };

  const handleChangeEstado = (id, nuevoEstado) => {
    setEstadosLocal((prev) => ({ ...prev, [id]: nuevoEstado }));
  };

  const handleVerDetalle = (s) => {
    setSolicitudSeleccionada(s);
    setOpenDetalle(true);
  };

  if (loading) {
    return (
      <Box p={3} textAlign="center">
        <CircularProgress />
        <Typography mt={2}>Cargando solicitudes…</Typography>
      </Box>
    );
  }

  if (!solicitudes.length) {
    return (
      <Box p={3} textAlign="center">
        <Typography>No hay solicitudes</Typography>
      </Box>
    );
  }

  return (
    <Box p={{ xs: 1, md: 3 }}>
      {isMobile ? (
        /* ================= MOBILE ================= */
        <Stack spacing={2}>
          {solicitudes.map((s) => {
            const estadoActual = estadosLocal[s.id] || s.estado;
            const whatsappMatches = generarLinkWhatsappMatches(s);
            const whatsappLiberar = generarLinkWhatsappLiberar(s);

            return (
              <Paper key={s.id} sx={{ p: 2, borderRadius: 2 }}>
                <Stack spacing={1.5}>
                  <Typography fontWeight={600}>{s.nombre}</Typography>

                  <Typography variant="body2">
                    <strong>Zona:</strong> {s.zona}
                  </Typography>

                  <Typography variant="body2">
                    <strong>Acompañamiento:</strong> {s.tipoAcompanamiento}
                  </Typography>

                  <Select
                    fullWidth
                    size="small"
                    value={estadoActual}
                    onChange={(e) =>
                      handleChangeEstado(s.id, e.target.value)
                    }
                  >
                    {estados.map((e) => (
                      <MenuItem key={e} value={e}>
                        {e}
                      </MenuItem>
                    ))}
                  </Select>

                  <Stack spacing={1} mt={1}>
                    <Button fullWidth onClick={() => handleVerDetalle(s)}>
                      Ver detalle
                    </Button>

                    <Button fullWidth onClick={() => onVerMatches(s)}>
                      Ver matches
                    </Button>

                    {whatsappMatches && (
                      <Button
                        fullWidth
                        variant="contained"
                        color="success"
                        href={whatsappMatches}
                        target="_blank"
                      >
                        Enviar matches
                      </Button>
                    )}

                    {whatsappLiberar &&
                      ["cerrado", "pagado"].includes(estadoActual) && (
                        <Button
                          fullWidth
                          variant="outlined"
                          color="success"
                          href={whatsappLiberar}
                          target="_blank"
                        >
                          Liberar contacto
                        </Button>
                      )}
                  </Stack>
                </Stack>
              </Paper>
            );
          })}
        </Stack>
      ) : (
        /* ================= DESKTOP / TABLET ================= */
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Nombre</TableCell>
              <TableCell>Zona</TableCell>
              <TableCell>Acompañamiento</TableCell>
              <TableCell>Estado</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {solicitudes.map((s) => {
              const estadoActual = estadosLocal[s.id] || s.estado;
              const whatsappMatches = generarLinkWhatsappMatches(s);
              const whatsappLiberar = generarLinkWhatsappLiberar(s);

              return (
                <TableRow key={s.id}>
                  <TableCell>{s.nombre}</TableCell>
                  <TableCell>{s.zona}</TableCell>
                  <TableCell>{s.tipoAcompanamiento}</TableCell>

                  <TableCell>
                    <Select
                      size="small"
                      value={estadoActual}
                      onChange={(e) =>
                        handleChangeEstado(s.id, e.target.value)
                      }
                    >
                      {estados.map((e) => (
                        <MenuItem key={e} value={e}>
                          {e}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>

                  <TableCell>
                    <Button size="small" onClick={() => handleVerDetalle(s)}>
                      Detalle
                    </Button>

                    <Button
                      size="small"
                      onClick={() => onVerMatches(s)}
                      sx={{ mx: 1 }}
                    >
                      Matches
                    </Button>

                    {whatsappMatches && (
                      <Button
                        size="small"
                        variant="contained"
                        color="success"
                        href={whatsappMatches}
                        target="_blank"
                        sx={{ mr: 1 }}
                      >
                        Enviar
                      </Button>
                    )}

                    {whatsappLiberar &&
                      ["cerrado", "pagado"].includes(estadoActual) && (
                        <Button
                          size="small"
                          variant="outlined"
                          color="success"
                          href={whatsappLiberar}
                          target="_blank"
                        >
                          Liberar
                        </Button>
                      )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <SolicitudDetalleModal
        open={openDetalle}
        onClose={() => setOpenDetalle(false)}
        solicitud={solicitudSeleccionada}
      />
    </Box>
  );
}
