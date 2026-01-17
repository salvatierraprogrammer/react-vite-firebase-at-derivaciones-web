import { Box, Typography, Divider } from "@mui/material";

export default function FlyerSolicitud({ solicitud }) {
  if (!solicitud) return null;

  return (
    <Box
      id="flyer-solicitud"
      sx={{
        width: 700,
        minHeight: 900,
        backgroundImage: "url('/flyer-at-bg.png')", // 👉 poné tu imagen
        backgroundSize: "cover",
        backgroundPosition: "center",
        p: 4,
        color: "#4a2c6b",
        fontFamily: "Poppins, sans-serif",
      }}
    >
      <Typography variant="h5" align="center" fontWeight={700} mb={2}>
        📣 BÚSQUEDA DE ACOMPAÑANTE TERAPÉUTICO
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Typography><b>Zona:</b> {solicitud.zona}</Typography>
      <Typography><b>Edad del acompañado:</b> {solicitud.edad}</Typography>
      <Typography><b>Género:</b> {solicitud.generoAcompanado}</Typography>

      <Divider sx={{ my: 1 }} />

      <Typography>
        <b>Diagnóstico / situación:</b> {solicitud.diagnostico}
      </Typography>

      <Divider sx={{ my: 1 }} />

      <Typography><b>Tipo de acompañamiento:</b> {solicitud.tipoAcompanamiento}</Typography>
      <Typography><b>Prestación:</b> {solicitud.tipoPrestacion}</Typography>

      <Divider sx={{ my: 1 }} />

      <Typography><b>Días y horarios:</b></Typography>
      <Typography>{solicitud.horariosDetalle}</Typography>

      <Divider sx={{ my: 1 }} />

      <Typography><b>Preferencia de AT:</b> {solicitud.generoAT}</Typography>

      <Divider sx={{ my: 2 }} />

      <Typography align="center" fontWeight={600}>
        📲 Contacto: {solicitud.whatsapp}
      </Typography>

      <Typography align="center" variant="caption" display="block" mt={2}>
        El Canal del AT
      </Typography>
    </Box>
  );
}
