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
  Stack,
  useMediaQuery,
  useTheme,
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

export default function ATProfileModal({ at, open, onClose }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  if (!at) return null;

  return (
    <Dialog
      open={open}
      onClose={onClose}
      fullScreen={isMobile}
      fullWidth
      maxWidth="sm"
    >
      <DialogTitle sx={{ fontWeight: 700 }}>
        Perfil completo – {at.nombre}
      </DialogTitle>

      <DialogContent dividers>
        <Stack spacing={2}>
          {/* ================= DATOS BÁSICOS ================= */}
          <Section title="Datos personales">
            <Item icon={<PersonIcon />} text={at.nombre} />
            <Item icon={<WcIcon />} text={at.genero} />
            <Item icon={<WhatsAppIcon color="success" />} text={at.whatsapp} />
            <Item
              icon={<EmailIcon />}
              text={at.email || "No informado"}
            />
            <Item
              icon={
                <VerifiedIcon
                  color={at.certificadoAT ? "primary" : "disabled"}
                />
              }
              text={`Certificado AT: ${at.certificadoAT ? "Sí" : "No"}`}
            />
            {at.certificadoResolucion && (
              <Typography variant="body2" sx={{ ml: 4 }}>
                Resolución: {at.certificadoResolucion}
              </Typography>
            )}
          </Section>

          {/* ================= EDUCACIÓN ================= */}
          <Section title="Educación" icon={<SchoolIcon />}>
            <Typography>
              Estado educativo: {at.estadoEducativo || "No informado"}
            </Typography>
            {at.estadoEducativo === "estudiante" && at.estudianteCarrera && (
              <Typography sx={{ ml: 2 }}>
                Carrera: {at.estudianteCarrera}
              </Typography>
            )}
            {at.estadoEducativo === "graduado" && at.carreraFinalizada && (
              <Typography sx={{ ml: 2 }}>
                Carrera finalizada: {at.carreraFinalizada}
              </Typography>
            )}
          </Section>

          {/* ================= ESPECIALIZACIONES ================= */}
          <Section title="Especializaciones" icon={<AssignmentIcon />}>
            <Typography>{at.especializaciones || "No informado"}</Typography>
          </Section>

          {/* ================= EXPERIENCIA ================= */}
          <Section title="Experiencia laboral" icon={<WorkIcon />}>
            <Typography>{at.experiencia || "No informado"}</Typography>
          </Section>

          {/* ================= SEGUROS ================= */}
          <Section title="Seguros" icon={<FavoriteIcon />}>
            <Typography>
              Responsabilidad civil:{" "}
              {at.seguros?.responsabilidadCivil ? "Sí" : "No"}
            </Typography>
            <Typography>
              Accidentes personales:{" "}
              {at.seguros?.accidentesPersonales ? "Sí" : "No"}
            </Typography>
            <Typography>
              Puede gestionar: {at.seguros?.puedeGestionar ? "Sí" : "No"}
            </Typography>
          </Section>

          {/* ================= ZONAS ================= */}
          <Section title="Zonas" icon={<LocationOnIcon />}>
            <Box display="flex" gap={1} flexWrap="wrap">
              {at.zonas?.map((z) => (
                <Chip key={z} label={z} size="small" color="primary" />
              ))}
              {at.zonas?.includes("Interior / Otras provincias") &&
                at.zonaInterior && (
                  <Chip
                    label={`Interior: ${at.zonaInterior}`}
                    size="small"
                    color="secondary"
                  />
                )}
            </Box>
          </Section>

          {/* ================= DISPONIBILIDAD ================= */}
          <Section title="Disponibilidad" icon={<ScheduleIcon />}>
            <Box display="flex" gap={1} flexWrap="wrap">
              {at.disponibilidad?.map((d) => (
                <Chip key={d} label={d} size="small" color="success" />
              ))}
            </Box>
          </Section>

          {/* ================= TIPOS ================= */}
          <Section title="Tipos de acompañamiento" icon={<AssignmentIcon />}>
            <Box display="flex" gap={1} flexWrap="wrap">
              {at.tiposAcompanamiento?.map((t) => (
                <Chip key={t} label={t} size="small" color="info" />
              ))}
            </Box>
          </Section>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button fullWidth={isMobile} variant="contained" onClick={onClose}>
          Cerrar
        </Button>
      </DialogActions>
    </Dialog>
  );
}

/* ================= COMPONENTES AUX ================= */

function Section({ title, icon, children }) {
  return (
    <Box>
      <Typography variant="subtitle1" fontWeight={700} gutterBottom>
        {icon && <Box component="span" mr={0.5}>{icon}</Box>}
        {title}
      </Typography>
      <Divider sx={{ mb: 1 }} />
      <Box sx={{ ml: 1 }}>{children}</Box>
    </Box>
  );
}

function Item({ icon, text }) {
  return (
    <Box display="flex" alignItems="center" gap={1}>
      {icon}
      <Typography>{text}</Typography>
    </Box>
  );
}
