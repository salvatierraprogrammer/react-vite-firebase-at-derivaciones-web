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
  FormControl,
  InputLabel,
  RadioGroup,
  Radio,
  Select,
  CircularProgress,
} from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import logo from "../assets/logo.png";
import { colors } from "../styles";
import { useState } from "react";

function SolicitarAT() {
  const [tipoAcompanamiento, setTipoAcompanamiento] = useState("");
  const [tipoPrestacion, setTipoPrestacion] = useState("");
  const [zona, setZona] = useState("");
  const [generoAcompanado, setGeneroAcompanado] = useState("");
  const [generoAT, setGeneroAT] = useState("");
  const [loading, setLoading] = useState(false); // ⬅️ NUEVO

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!zona) return alert("Seleccioná una zona");
    if (!tipoAcompanamiento) return alert("Seleccioná un tipo de acompañamiento");
    if (!tipoPrestacion) return alert("Seleccioná un tipo de prestación");

    try {
      setLoading(true); // ⬅️ ACTIVA LOADING

      await addDoc(collection(db, "solicitudes_at"), {
        nombre: e.target.nombre.value,
        whatsapp: e.target.whatsapp.value.replace(/\D/g, ""),
        zona,
        zonaInterior: e.target.zonaInterior?.value || "",
        edad: e.target.edad.value,
        diagnostico: e.target.diagnostico.value,
        tipoAcompanamiento,
        tipoPrestacion,
        generoAcompanado,
        generoAT,
        horariosDetalle: e.target.horariosDetalle.value,
        descripcion: e.target.descripcion.value,
        estado: "nuevo",
        createdAt: serverTimestamp(),
      });

      alert("Solicitud enviada 🙌\nTe contactaremos por WhatsApp");

      e.target.reset();
      setTipoAcompanamiento("");
      setTipoPrestacion("");
      setZona("");
      setGeneroAcompanado("");
      setGeneroAT("");
    } catch (error) {
      console.error(error);
      alert("Error al enviar la solicitud");
    } finally {
      setLoading(false); // ⬅️ DESACTIVA LOADING
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
      <Container maxWidth="sm" sx={{marginBottom: 4,  marginTop: 4, }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
          <Box textAlign="center" mb={2}>
            <img src={logo} alt="Logo" style={{ width: 110 }} />
          </Box>

          <Typography variant="h5" align="center" fontWeight={600} gutterBottom>
            ¿Necesitás Acompañante Terapéutico?
          </Typography>

          <Typography variant="body2" align="center" color="text.secondary" mb={3}>
            Completá el formulario y te contactamos con AT disponibles.
          </Typography>

          <Divider sx={{ mb: 3 }} />

          <Box component="form" onSubmit={handleSubmit}>
            <TextField label="Nombre de contacto" name="nombre" fullWidth required sx={{ mb: 2 }} />

            <TextField
              label="WhatsApp de contacto"
              name="whatsapp"
              fullWidth
              required
              helperText="Solo número, sin +54 ni 9"
              sx={{ mb: 2 }}
            />

            <FormControl sx={{ mb: 3 }}>
              <InputLabel shrink>Zona donde buscás AT</InputLabel>
              <RadioGroup value={zona} onChange={(e) => setZona(e.target.value)}>
                {["CABA", "Zona Norte", "Zona Oeste", "Zona Sur", "Interior / Otras provincias"].map(
                  (item) => (
                    <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                  )
                )}
              </RadioGroup>
            </FormControl>

            {zona === "Interior / Otras provincias" && (
              <TextField
                name="zonaInterior"
                label="Provincia y localidad"
                fullWidth
                sx={{ mb: 3 }}
              />
            )}

            <Divider sx={{ mb: 3 }} />

            <FormControl fullWidth sx={{ mb: 3 }}>
              <InputLabel>Género del acompañado</InputLabel>
              <Select value={generoAcompanado} onChange={(e) => setGeneroAcompanado(e.target.value)} required>
                <MenuItem value="Femenino">Femenino</MenuItem>
                <MenuItem value="Masculino">Masculino</MenuItem>
                <MenuItem value="Prefiero no decirlo">Prefiero no decirlo</MenuItem>
              </Select>
            </FormControl>

            <TextField label="Edad" name="edad" fullWidth required sx={{ mb: 2 }} />
            <TextField label="Diagnóstico" name="diagnostico" fullWidth required sx={{ mb: 3 }} />

            <FormControl sx={{ mb: 3 }}>
              <InputLabel shrink>Tipo de acompañamiento</InputLabel>
              <RadioGroup value={tipoAcompanamiento} onChange={(e) => setTipoAcompanamiento(e.target.value)}>
                {["Niñes", "Adolescentes", "Adulto mayor", "Integración Escolar", "Discapacidad", "Salud mental"].map(
                  (item) => (
                    <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                  )
                )}
              </RadioGroup>
            </FormControl>

            <FormControl sx={{ mb: 3 }}>
              <InputLabel shrink>Tipo de prestación</InputLabel>
              <RadioGroup value={tipoPrestacion} onChange={(e) => setTipoPrestacion(e.target.value)}>
                {[
                  "AT por obra social / prepaga",
                  "AT institucional",
                  "AT particular (pago privado)",
                ].map((item) => (
                  <FormControlLabel key={item} value={item} control={<Radio />} label={item} />
                ))}
              </RadioGroup>
            </FormControl>
            <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="genero-at-label">Género del AT</InputLabel>
            <Select
              labelId="genero-at-label"
              label="Género del AT"
              value={generoAT}
              onChange={(e) => setGeneroAT(e.target.value)}
              required
            >
              <MenuItem value="Indistinto">Indistinto / No relevante</MenuItem>
              <MenuItem value="Femenino">Femenino</MenuItem>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="No binario">No binario</MenuItem>
            </Select>
          </FormControl>
            <TextField
              label="Horarios"
              name="horariosDetalle"
              fullWidth
              multiline
              rows={3}
              required
              sx={{ mb: 2 }}
            />

            <TextField
              label="Descripción"
              name="descripcion"
              fullWidth
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />

            <FormControlLabel control={<Checkbox required />} label="Acepto ser contactado por WhatsApp" />

            <Button
              type="submit"
              fullWidth
              size="large"
              disabled={loading}
              sx={{
                mt: 3,
                py: 1.4,
                borderRadius: 2,
                backgroundColor: colors.primary,
                color: "#fff",
                "&:hover": { backgroundColor: colors.textPrimary },
              }}
            >
              {loading ? (
                <>
                  <CircularProgress size={22} sx={{ color: "#fff", mr: 1 }} />
                  Enviando… por favor espere
                </>
              ) : (
                "Solicitar Acompañante Terapéutico"
              )}
            </Button>
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="body2" align="center" color="text.secondary">
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

export default SolicitarAT;