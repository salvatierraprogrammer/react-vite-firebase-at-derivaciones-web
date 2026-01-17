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
} from "@mui/material";
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

export default function MatchesDialog({
  open,
  onClose,
  matches = [],
  solicitud,
}) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
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
          <Typography variant="body2" sx={{ opacity: 0.9,   color: "#fff", fontWeight: 400, mt: 0.5 }}>
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

            /* 📲 WhatsApp seguro */
            const texto = generarTextoWhatsApp({ at, solicitud });
            const telefonoLimpio =
              typeof at.whatsapp === "string"
                ? at.whatsapp.replace(/\D/g, "")
                : "";

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
                  p: 3,
                  mb: 2,
                  borderRadius: 2,
                  borderLeft: `5px solid ${colors.primary}`,
                }}
              >
                {/* HEADER AT */}
                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography variant="subtitle1" fontWeight={600}>
                    {at.nombre || "AT sin nombre"}
                  </Typography>

                  <Chip
                    label={`${nivel.label} · ${at.score ?? 0}%`}
                    color={nivel.color}
                    size="small"
                  />
                </Box>

                {/* INFO GENERAL */}
                <Typography variant="body2" color="text.secondary">
                  📍 Zonas:{" "}
                  {Array.isArray(at.zonas) && at.zonas.length > 0
                    ? at.zonas.join(", ")
                    : "—"}
                </Typography>

                <Divider sx={{ my: 2 }} />

                {/* MOTIVOS DE MATCH */}
                <Typography variant="subtitle2" fontWeight={600} gutterBottom>
                  ¿Por qué es compatible con este caso?
                </Typography>

                <List dense sx={{ pl: 1 }}>
                  {Array.isArray(at.razones) && at.razones.length > 0 ? (
                    at.razones.map((razon, i) => (
                      <ListItem key={i} disablePadding>
                        <ListItemText primary={`• ${razon}`} />
                      </ListItem>
                    ))
                  ) : (
                    <ListItem disablePadding>
                      <ListItemText primary="• Coincidencia general con el caso" />
                    </ListItem>
                  )}
                </List>

                {/* TIPOS DE ACOMPAÑAMIENTO */}
                {Array.isArray(at.tiposAcompanamiento) &&
                  at.tiposAcompanamiento.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography variant="caption" color="text.secondary">
                        Tipos de acompañamiento
                      </Typography>

                      <Box mt={0.5}>
                        {at.tiposAcompanamiento.map((t) => (
                          <Chip
                            key={t}
                            label={t}
                            size="small"
                            sx={{ mr: 0.5, mb: 0.5 }}
                          />
                        ))}
                      </Box>
                    </>
                  )}

                {/* CTA */}
                {whatsappUrl && (
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<WhatsAppIcon />}
                    sx={{
                      mt: 3,
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
                  Descargar ficha del caso (PDF)
                </Button>
              </Paper>
            );
          })
        )}
      </DialogContent>

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button
          onClick={onClose}
          variant="outlined"
          sx={{ color: colors.primary, borderColor: colors.primary }}
        >
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}
