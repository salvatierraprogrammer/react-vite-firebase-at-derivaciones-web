import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Paper,
  Typography,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import { colors } from "../styles";
import { generarTextoWhatsApp } from "../utils/whatsappTemplates";
import generarPDFMatch from "../utils/generarPDF";

/* 🔹 Nivel de match visual */
const getNivelMatch = (score = 0) => {
  if (score >= 80) return { label: "Ideal", color: "success" };
  if (score >= 55) return { label: "Buen match", color: "warning" };
  return { label: "Match parcial", color: "default" };
};

/* 📲 Normalizar WhatsApp Argentina */
const normalizarWhatsappAR = (telefono) => {
  if (!telefono) return "";

  let telefonoLimpio = telefono.toString().replace(/\D/g, "");

  // Si ya viene con 549
  if (telefonoLimpio.startsWith("549")) return telefonoLimpio;

  // Si viene con 54
  if (telefonoLimpio.startsWith("54"))
    return `549${telefonoLimpio.slice(2)}`;

  // Número local
  return `549${telefonoLimpio}`;
};

export default function MatchesDialog({
  open,
  onClose,
  matches = [],
  solicitud,
}) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullWidth
      maxWidth="sm"
      fullScreen={isMobile}
    >
      {/* HEADER */}
      <DialogTitle
        sx={{
          backgroundColor: colors.primary,
          color: "#fff",
          fontWeight: 600,
        }}
      >
        Acompañantes Terapéuticos compatibles
        {solicitud?.nombre && (
          <Typography variant="body2" sx={{ opacity: 0.9 }}>
            Caso: {solicitud.nombre}
          </Typography>
        )}
      </DialogTitle>

      <DialogContent dividers sx={{ backgroundColor: colors.background }}>
        {matches.length === 0 ? (
          <Typography align="center" color="text.secondary" sx={{ mt: 3 }}>
            No se encontraron AT compatibles con esta solicitud
          </Typography>
        ) : (
          matches.map((at) => {
            const nivel = getNivelMatch(at.score ?? 0);

            /* 📲 WhatsApp */
            const texto = generarTextoWhatsApp({ at, solicitud });
            const telefonoLimpio = normalizarWhatsappAR(at.whatsapp);

            const whatsappUrl =
              telefonoLimpio.length >= 8
                ? `https://api.whatsapp.com/send?phone=${telefonoLimpio}&text=${encodeURIComponent(
                    texto
                  )}`
                : null;

            return (
              <Paper
                key={at.id}
                elevation={3}
                sx={{
                  p: 2,
                  mb: 2,
                  borderRadius: 2,
                  borderLeft: `5px solid ${colors.primary}`,
                }}
              >
                {/* HEADER AT */}
                <Box
                  display="flex"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={1}
                >
                  <Typography fontWeight={600}>
                    {at.nombre || "AT sin nombre"}
                  </Typography>

                  <Chip
                    label={`${nivel.label} · ${at.score ?? 0}%`}
                    color={nivel.color}
                    size="small"
                  />
                </Box>

                <Typography variant="body2" color="text.secondary">
                  📍 Zonas:{" "}
                  {Array.isArray(at.zonas) && at.zonas.length > 0
                    ? at.zonas.join(", ")
                    : "—"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                <Typography fontWeight={600} variant="subtitle2">
                  ¿Por qué es compatible?
                </Typography>

                <List dense>
                  {Array.isArray(at.razones) && at.razones.length > 0 ? (
                    at.razones.map((r, i) => (
                      <ListItem key={i} disablePadding>
                        <ListItemText primary={`• ${r}`} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem disablePadding>
                      <ListItemText primary="• Coincidencia general con el caso" />
                    </ListItem>
                  )}
                </List>

                {/* CTA */}
                {whatsappUrl && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      mt: 2,
                      backgroundColor: "#25D366",
                      "&:hover": { backgroundColor: "#1ebe5b" },
                    }}
                    href={whatsappUrl}
                    target="_blank"
                  >
                    Contactar por WhatsApp
                  </Button>
                )}

                <Button
                  fullWidth
                  variant="outlined"
                  size="small"
                  sx={{ mt: 1 }}
                  onClick={() => generarPDFMatch({ at, solicitud })}
                >
                  Descargar ficha (PDF)
                </Button>
              </Paper>
            );
          })
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
