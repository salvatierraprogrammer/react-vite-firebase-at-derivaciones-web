import {
  Container,
  Box,
  Typography,
  Paper,
  Tabs,
  Tab,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from "@mui/material";
import { useState } from "react";

function AdminPanel() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [matches, setMatches] = useState([]);
  const [solicitudActual, setSolicitudActual] = useState(null);

  // 🔧 DATOS MOCK (PRUEBA)
  const solicitudes = [
    {
      id: 1,
      nombre: "María López",
      zona: "CABA",
      tipo: "Adulto mayor",
      whatsapp: "5491112345678",
      estado: "nuevo",
    },
  ];

  const ats = [
    {
      id: 1,
      nombre: "Juan Pérez",
      zona: "CABA",
      tipo: ["Adulto mayor", "Adolescente"],
      whatsapp: "5491198765432",
      estado: "activo",
    },
    {
      id: 2,
      nombre: "Laura Gómez",
      zona: "Zona Sur",
      tipo: ["Niños"],
      whatsapp: "5491188887777",
      estado: "activo",
    },
  ];

  // 🧠 MATCHING AUTOMÁTICO
  const buscarMatches = (solicitud) => {
    const resultado = ats.filter(
      (at) =>
        at.estado === "activo" &&
        at.zona === solicitud.zona &&
        at.tipo.includes(solicitud.tipo)
    );

    setSolicitudActual(solicitud);
    setMatches(resultado);
    setOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>
        Panel de Administración
      </Typography>

      <Paper elevation={3}>
        <Tabs
          value={tab}
          onChange={(e, v) => setTab(v)}
          indicatorColor="primary"
          textColor="primary"
        >
          <Tab label="Solicitudes" />
          <Tab label="Acompañantes Terapéuticos" />
        </Tabs>

        {/* ================= SOLICITUDES ================= */}
        {tab === 0 && (
          <Box p={3}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Nombre</TableCell>
                  <TableCell>Zona</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Estado</TableCell>
                  <TableCell>Acciones</TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {solicitudes.map((s) => (
                  <TableRow key={s.id}>
                    <TableCell>{s.nombre}</TableCell>
                    <TableCell>{s.zona}</TableCell>
                    <TableCell>{s.tipo}</TableCell>
                    <TableCell>
                      <Chip
                        label={s.estado}
                        color="warning"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        onClick={() => buscarMatches(s)}
                        sx={{ mr: 1 }}
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
          </Box>
        )}

        {/* ================= ATS ================= */}
        {tab === 1 && (
          <Box p={3}>
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
                {ats.map((at) => (
                  <TableRow key={at.id}>
                    <TableCell>{at.nombre}</TableCell>
                    <TableCell>{at.zona}</TableCell>
                    <TableCell>
                      {at.tipo.map((t) => (
                        <Chip
                          key={t}
                          label={t}
                          size="small"
                          sx={{ mr: 0.5 }}
                        />
                      ))}
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={at.estado}
                        color="success"
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        size="small"
                        variant="outlined"
                        href={`https://wa.me/${at.whatsapp}`}
                        target="_blank"
                      >
                        WhatsApp
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Box>
        )}
      </Paper>

      {/* ================= MODAL MATCHES ================= */}
      <Dialog open={open} onClose={() => setOpen(false)} fullWidth>
        <DialogTitle>
          AT compatibles – {solicitudActual?.nombre}
        </DialogTitle>

        <DialogContent dividers>
          {matches.length === 0 ? (
            <Typography>No hay AT compatibles</Typography>
          ) : (
            matches.map((at) => (
              <Paper key={at.id} sx={{ p: 2, mb: 2 }}>
                <Typography fontWeight="bold">{at.nombre}</Typography>
                <Typography variant="body2">
                  Zona: {at.zona}
                </Typography>

                <Box mt={1}>
                  {at.tipo.map((t) => (
                    <Chip
                      key={t}
                      label={t}
                      size="small"
                      sx={{ mr: 0.5 }}
                    />
                  ))}
                </Box>

                <Button
                  variant="contained"
                  size="small"
                  sx={{ mt: 2 }}
                  href={`https://wa.me/${at.whatsapp}`}
                  target="_blank"
                >
                  Contactar por WhatsApp
                </Button>
              </Paper>
            ))
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cerrar</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminPanel;