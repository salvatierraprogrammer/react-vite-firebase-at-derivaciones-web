import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Divider,
  Chip,
} from "@mui/material";
import PersonIcon from "@mui/icons-material/Person";
import WcIcon from "@mui/icons-material/Wc";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import EmailIcon from "@mui/icons-material/Email";
import VerifiedIcon from "@mui/icons-material/Verified";
import WorkIcon from "@mui/icons-material/Work";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import ScheduleIcon from "@mui/icons-material/Schedule";
import FavoriteIcon from "@mui/icons-material/Favorite";
import AssignmentIcon from "@mui/icons-material/Assignment";
import SchoolIcon from "@mui/icons-material/School";
import EmojiEventsIcon from "@mui/icons-material/EmojiEvents";

export default function ATProfileModal({ at, open, onClose }) {
  if (!at) return null;

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Perfil completo – {at.nombre}</DialogTitle>
      
      <DialogContent dividers>
        <Box display="flex" flexDirection="column" gap={1.5}>
          {/* Datos básicos */}
          <Box display="flex" alignItems="center" gap={1}>
            <PersonIcon color="primary" /> <Typography>{at.nombre}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <WcIcon color="action" /> <Typography>{at.genero}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <WhatsAppIcon color="success" /> <Typography>{at.whatsapp}</Typography>
          </Box>
          <Box display="flex" alignItems="center" gap={1}>
            <EmailIcon color="action" /> <Typography>{at.email || "No informado"}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <VerifiedIcon color={at.certificadoAT ? "primary" : "disabled"} />
            <Typography>Certificado AT: {at.certificadoAT ? "Sí" : "No"}</Typography>
          </Box>
          {at.certificadoResolucion && (
            <Typography sx={{ ml: 4 }}>
              Resolución: {at.certificadoResolucion}
            </Typography>
          )}

          <Box display="flex" alignItems="center" gap={1}>
            <AssignmentIcon color="action" /> <Typography>Especializaciones: {at.especializaciones}</Typography>
          </Box>

          <Box display="flex" alignItems="center" gap={1}>
            <WorkIcon color="action" /> <Typography>Monotributo: {at.monotributo || "-"}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Estado educativo */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <SchoolIcon fontSize="small" sx={{ mr: 0.5 }} /> Educación
          </Typography>
          <Box sx={{ ml: 2, display: "flex", flexDirection: "column", gap: 0.5 }}>
            <Typography>
              Estado educativo: {at.estadoEducativo || "No informado"}
            </Typography>

            {at.estadoEducativo === "estudiante" && at.estudianteCarrera && (
              <Typography sx={{ ml: 2 }}>
                Está estudiando: {at.estudianteCarrera}
              </Typography>
            )}
            {at.estadoEducativo === "graduado" && at.carreraFinalizada && (
              <Typography sx={{ ml: 2 }}>
                Carrera finalizada: {at.carreraFinalizada}
              </Typography>
            )}
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Seguros */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <FavoriteIcon fontSize="small" sx={{ mr: 0.5 }} /> Seguros
          </Typography>
          <Box display="flex" flexDirection="column" gap={0.5} sx={{ ml: 2 }}>
            <Typography>Responsabilidad Civil: {at.seguros?.responsabilidadCivil ? "Sí" : "No"}</Typography>
            <Typography>Accidentes Personales: {at.seguros?.accidentesPersonales ? "Sí" : "No"}</Typography>
            <Typography>Puede gestionar: {at.seguros?.puedeGestionar ? "Sí" : "No"}</Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Zonas */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <LocationOnIcon fontSize="small" sx={{ mr: 0.5 }} /> Zonas
          </Typography>
          <Box sx={{ ml: 2, display: "flex", gap: 1, flexWrap: "wrap" }}>
            {at.zonas?.map((z) => (
              <Chip key={z} label={z} color="primary" size="small" />
            ))}
            {at.zonas?.includes("Interior / Otras provincias") && at.zonaInterior && (
              <Chip label={`Interior: ${at.zonaInterior}`} color="secondary" size="small" />
            )}
          </Box>

          {/* Disponibilidad y tipos */}
          <Box mt={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              <ScheduleIcon fontSize="small" sx={{ mr: 0.5 }} /> Disponibilidad
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", ml: 2 }}>
              {at.disponibilidad?.map((d) => (
                <Chip key={d} label={d} color="success" size="small" />
              ))}
            </Box>
          </Box>

          <Box mt={1}>
            <Typography variant="subtitle1" fontWeight="bold">
              <AssignmentIcon fontSize="small" sx={{ mr: 0.5 }} /> Tipos de acompañamiento
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", ml: 2 }}>
              {at.tiposAcompanamiento?.map((t) => (
                <Chip key={t} label={t} color="info" size="small" />
              ))}
            </Box>
          </Box>

          <Divider sx={{ my: 2 }} />

          {/* Experiencia */}
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            <WorkIcon fontSize="small" sx={{ mr: 0.5 }} /> Experiencia laboral
          </Typography>
          <Typography sx={{ ml: 2 }}>{at.experiencia}</Typography>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button variant="contained" onClick={onClose} color="primary">
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}