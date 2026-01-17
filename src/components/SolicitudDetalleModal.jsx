import html2canvas from "html2canvas";
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

export default function SolicitudDetalleModal({
  open,
  onClose,
  solicitud,
  onLiberarAT,
}) {
  if (!solicitud) return null;

  /* ---------- GENERAR FLYER ---------- */
  const generarFlyer = async () => {
    const flyer = document.getElementById("flyer-solicitud");
    if (!flyer) return;

    const canvas = await html2canvas(flyer, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });

    const link = document.createElement("a");
    link.download = `busqueda-at-${solicitud.id || "canal-at"}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      {/* ================= MODAL ================= */}
      <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
        <DialogTitle sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography variant="h6">Detalle de la solicitud</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <DialogContent dividers>
          <Box mb={2}>
            <Chip
              label={solicitud.estado}
              color={solicitud.estado === "nuevo" ? "warning" : "success"}
              size="small"
            />
          </Box>

          <Section icon={PersonIcon} title="Contacto">
            <Info label="Nombre" value={solicitud.nombre} />
            <Info label="WhatsApp" value={solicitud.whatsapp} />
          </Section>

          <Divider sx={{ my: 2 }} />

          <Section icon={PlaceIcon} title="Zona">
            <Info label="Zona" value={solicitud.zona} />
            {solicitud.zona === "Interior / Otras provincias" && (
              <Info label="Localidad" value={solicitud.zonaInterior} />
            )}
          </Section>

          <Divider sx={{ my: 2 }} />

          <Section icon={AccessibilityNewIcon} title="Acompañado">
            <Info label="Edad" value={solicitud.edad} />
            <Info label="Género" value={solicitud.generoAcompanado} />
            <Info label="Diagnóstico" value={solicitud.diagnostico} />
          </Section>

          <Divider sx={{ my: 2 }} />

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

          <Section icon={WcIcon} title="Preferencia AT">
            <Info label="Género AT" value={solicitud.generoAT} />
          </Section>

          <Divider sx={{ my: 2 }} />

          <Section icon={ScheduleIcon} title="Días y horarios">
            <Typography variant="body2">
              {solicitud.horariosDetalle || "—"}
            </Typography>
          </Section>

          <Divider sx={{ my: 2 }} />

          <Section icon={PsychologyIcon} title="Descripción">
            <Typography variant="body2">
              {solicitud.descripcion || "—"}
            </Typography>
          </Section>
        </DialogContent>

        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button variant="contained" color="secondary" onClick={generarFlyer}>
            Generar flyer
          </Button>

          <Button
            startIcon={<WhatsAppIcon />}
            variant="contained"
            color="success"
            href={`https://wa.me/${solicitud.whatsapp}`}
            target="_blank"
          >
            WhatsApp
          </Button>

          {solicitud.estado !== "cerrado" && onLiberarAT && (
            <Button
              variant="contained"
              color="warning"
              onClick={() => onLiberarAT(solicitud)}
            >
              Liberar AT
            </Button>
          )}

          <Button onClick={onClose} variant="outlined">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>

      {/* ================= FLYER OCULTO ================= */}
      <Box sx={{ display: "none" }}>
        <FlyerSolicitud solicitud={solicitud} />
      </Box>
    </>
  );
}

/* ================= FLYER ================= */
function FlyerSolicitud({ solicitud }) {
  return (
    <Box
      id="flyer-solicitud"
      sx={{
        width: 700,
        minHeight: 900,
        backgroundImage: "url('/flyer.png')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 4,
        color: "#4b2c6f",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Typography variant="h5" align="center" fontWeight={700} mb={2}>
        📣 BÚSQUEDA DE ACOMPAÑANTE TERAPÉUTICO
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography><b>Zona:</b> {solicitud.zona}</Typography>
      <Typography><b>Edad:</b> {solicitud.edad}</Typography>
      <Typography><b>Género:</b> {solicitud.generoAcompanado}</Typography>

      <Divider sx={{ my: 1 }} />

      <Typography><b>Diagnóstico:</b> {solicitud.diagnostico}</Typography>

      <Divider sx={{ my: 1 }} />

      <Typography><b>Tipo:</b> {solicitud.tipoAcompanamiento}</Typography>
      <Typography><b>Prestación:</b> {solicitud.tipoPrestacion}</Typography>

      <Divider sx={{ my: 1 }} />

      <Typography><b>Horarios:</b></Typography>
      <Typography>{solicitud.horariosDetalle}</Typography>

      <Divider sx={{ my: 1 }} />

      <Typography><b>Preferencia AT:</b> {solicitud.generoAT}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography align="center" fontWeight={600}>
        📲 Contacto: {solicitud.whatsapp}
      </Typography>

      <Typography align="center" variant="caption" mt={2}>
        El Canal del AT
      </Typography>
    </Box>
  );
}

/* ================= AUX ================= */
function Section({ icon: Icon, title, children }) {
  return (
    <Box>
      <Box display="flex" alignItems="center" mb={1}>
        <Icon sx={{ color: "primary.main", fontSize: 20 }} />
        <Typography sx={{ ml: 1, fontWeight: 600 }}>
          {title}
        </Typography>
      </Box>
      {children}
    </Box>
  );
}

function Info({ label, value }) {
  return (
    <Typography variant="body2">
      <strong>{label}:</strong> {value || "—"}
    </Typography>
  );
}
