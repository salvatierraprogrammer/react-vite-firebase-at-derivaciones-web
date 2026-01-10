import {
  Container,
  Box,
  Typography,
  TextField,
  Button,
  Link,
  Paper,
  Checkbox,
  FormControlLabel,
  MenuItem,
  Divider,
} from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import logo from "../assets/logo.png";
import { colors } from "../styles";

function Home() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "solicitudes_at"), {
        nombre: e.target.nombre.value,
        whatsapp: e.target.whatsapp.value.replace(/\D/g, ""),
        zona: e.target.zona.value,
        edad: e.target.edad.value,
        tipo: e.target.tipo.value,
        dias: e.target.dias.value,
        horario: e.target.horario.value,
        estado: "nuevo",
        createdAt: serverTimestamp(),
      });

      alert(
        "Solicitud enviada 🙌\nTe contactaremos por WhatsApp para confirmar y ofrecerte opciones."
      );
      e.target.reset();
    } catch (error) {
      console.error(error);
      alert("Error al enviar la solicitud");
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        backgroundColor: colors.background,
        
        display: "flex",
        alignItems: "center",
      }}
    >
      <Container maxWidth="sm">
        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderRadius: 3,
            backgroundColor: colors.background,
          }}
        >
          {/* LOGO */}
          <Box textAlign="center" mb={2}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: 110, borderRadius: 12 }}
            />
          </Box>

          <Typography
            variant="h5"
            align="center"
            sx={{ color: colors.textPrimary, fontWeight: 600 }}
            gutterBottom
          >
            ¿Necesitás Acompañante Terapéutico?
          </Typography>

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
            mb={3}
          >
            Completá el formulario y te conectamos con AT disponibles según tu
            necesidad.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              label="Nombre de contacto"
              name="nombre"
              fullWidth
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="WhatsApp de contacto"
              name="whatsapp"
              fullWidth
              required
              placeholder="11 1234 5678"
              helperText="Solo número, sin +54 ni 9"
              sx={{ mb: 2 }}
            />

            <TextField
              select
              label="Zona / Ciudad"
              name="zona"
              fullWidth
              required
              sx={{ mb: 2 }}
            >
              <MenuItem value="CABA">CABA</MenuItem>
              <MenuItem value="Zona Norte">Zona Norte</MenuItem>
              <MenuItem value="Zona Oeste">Zona Oeste</MenuItem>
              <MenuItem value="Zona Sur">Zona Sur</MenuItem>
              <MenuItem value="Interior">Interior / Otras provincias</MenuItem>
            </TextField>

            <TextField
              label="Edad del acompañado"
              name="edad"
              fullWidth
              required
              placeholder="Ej: 8, 15, 72"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Tipo de acompañamiento"
              name="tipo"
              fullWidth
              required
              placeholder="Ej: niñez, TEA, salud mental, adulto mayor, escolar"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Días requeridos"
              name="dias"
              fullWidth
              required
              placeholder="Ej: lunes a viernes"
              sx={{ mb: 2 }}
            />

            <TextField
              label="Horario aproximado"
              name="horario"
              fullWidth
              required
              placeholder="Ej: 13 a 18 hs"
              sx={{ mb: 2 }}
            />

            <FormControlLabel
              control={<Checkbox required />}
              label="Acepto ser contactado por WhatsApp"
            />

            <Button
              type="submit"
              fullWidth
              size="large"
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                backgroundColor: colors.primary,
                color: "#fff",
                "&:hover": {
                  backgroundColor: colors.textPrimary,
                },
              }}
            >
              Solicitar Acompañante Terapéutico
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography
            variant="body2"
            align="center"
            color="text.secondary"
          >
            ¿Sos Acompañante Terapéutico?{" "}
            <Link href="/registro-at" underline="hover">
              Registrate acá
            </Link>
          </Typography>
        </Paper>
      </Container>
    </Box>
  );
}

export default Home;