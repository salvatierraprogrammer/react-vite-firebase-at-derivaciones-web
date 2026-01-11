import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box,
  IconButton,
  Button,
  Divider,
  Chip,
} from "@mui/material";

import CloseIcon from "@mui/icons-material/Close";
import PersonIcon from "@mui/icons-material/Person";
import PlaceIcon from "@mui/icons-material/Place";
import AccessibilityNewIcon from "@mui/icons-material/AccessibilityNew";
import ScheduleIcon from "@mui/icons-material/Schedule";
import PsychologyIcon from "@mui/icons-material/Psychology";
import WcIcon from "@mui/icons-material/Wc";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";

export default function SolicitudDetalleModal({ open, onClose, solicitud }) {
  if (!solicitud) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      {/* HEADER */}
      <DialogTitle
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="h6">Detalle de la solicitud</Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {/* ESTADO */}
        <Box mb={2}>
          <Chip
            label={solicitud.estado}
            color={solicitud.estado === "nuevo" ? "warning" : "success"}
            size="small"
          />
        </Box>

        {/* CONTACTO */}
        <Section icon={PersonIcon} title="Contacto">
          <Info label="Nombre" value={solicitud.nombre} />
          <Info label="WhatsApp" value={solicitud.whatsapp} />
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* ZONA */}
        <Section icon={PlaceIcon} title="Zona">
          <Info label="Zona" value={solicitud.zona} />
          {solicitud.zona === "Interior / Otras provincias" && (
            <Info label="Localidad" value={solicitud.zonaInterior} />
          )}
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* ACOMPAÑADO */}
        <Section icon={AccessibilityNewIcon} title="Acompañado">
          <Info label="Edad" value={solicitud.edad} />
          <Info label="Género" value={solicitud.generoAcompanado} />
          <Info
            label="Diagnóstico / situación"
            value={solicitud.diagnostico}
          />
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* PRESTACIÓN */}
        <Section icon={LocalHospitalIcon} title="Prestación">
          <Info
            label="Tipo de acompañamiento"
            value={solicitud.tipoAcompanamiento}
          />
          <Info
            label="Tipo de prestación"
            value={solicitud.tipoPrestacion}
          />
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* AT */}
        <Section icon={WcIcon} title="Preferencias de AT">
          <Info label="Género del AT" value={solicitud.generoAT} />
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* HORARIOS */}
        <Section icon={ScheduleIcon} title="Días y horarios">
          <Typography variant="body2">
            {solicitud.horariosDetalle || "—"}
          </Typography>
        </Section>

        <Divider sx={{ my: 2 }} />

        {/* DESCRIPCIÓN */}
        <Section
          icon={PsychologyIcon}
          title="Descripción del acompañamiento"
        >
          <Typography variant="body2">
            {solicitud.descripcion || "—"}
          </Typography>
        </Section>
      </DialogContent>

      {/* FOOTER */}
      <DialogActions sx={{ px: 3, pb: 2 }}>
        <Button
          startIcon={<WhatsAppIcon />}
          variant="contained"
          color="success"
          href={`https://wa.me/${solicitud.whatsapp}`}
          target="_blank"
        >
          WhatsApp
        </Button>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ---------- COMPONENTES AUX ---------- */

function Section({ icon: Icon, title, children }) {
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={1}>
        <Icon sx={{ color: "primary.main", fontSize: 20 }} />
        <Typography variant="subtitle1" sx={{ ml: 1, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <Typography variant="body2" sx={{ mb: 0.5 }}>
      <strong>{label}:</strong> {value || "—"}
    </Typography>
  );
}