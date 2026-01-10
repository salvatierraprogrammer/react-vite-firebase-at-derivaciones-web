import { Dialog, DialogTitle, DialogContent, DialogActions, Paper, Typography, Box, Button, Chip } from "@mui/material";

export default function MatchesDialog({ open, onClose, matches, solicitud }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth>
      <DialogTitle>AT compatibles – {solicitud?.nombre}</DialogTitle>
      <DialogContent dividers>
        {matches.length === 0 ? (
          <Typography>No hay AT compatibles</Typography>
        ) : (
          matches.map((at) => (
            <Paper key={at.id} sx={{ p: 2, mb: 2 }}>
              <Typography fontWeight="bold">{at.nombre}</Typography>
              <Typography variant="body2">Zona: {at.zona}</Typography>

              <Box mt={1}>
                {at.tipo.map((t) => (
                  <Chip key={t} label={t} size="small" sx={{ mr: 0.5 }} />
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
        <Button onClick={onClose}>Cerrar</Button>
      </DialogActions>
    </Dialog>
  );
}