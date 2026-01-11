import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
} from "@mui/material";

const WEB_URL =
  import.meta.env.VITE_WEB_PREVIEW_URL ||
  process.env.REACT_APP_WEB_PREVIEW_URL;

export default function WebPreviewDialog({ open, onClose }) {
  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="lg">
      <DialogTitle sx={{ fontWeight: 600 }}>
        Vista previa del sitio
      </DialogTitle>

      <DialogContent dividers>
        {WEB_URL ? (
          <Box
            component="iframe"
            src={WEB_URL}
            title="Web preview"
            sx={{
              width: "100%",
              height: "70vh",
              border: "none",
              borderRadius: 1,
            }}
          />
        ) : (
          <Typography color="error">
            No hay URL configurada en las variables de entorno
          </Typography>
        )}
      </DialogContent>

      <DialogActions>
        <Button onClick={onClose} variant="outlined">
          Cerrar
        </Button>
        {WEB_URL && (
          <Button
            href={WEB_URL}
            target="_blank"
            rel="noopener noreferrer"
            variant="contained"
          >
            Abrir en nueva pestaña
          </Button>
        )}
      </DialogActions>
    </Dialog>
  );
}