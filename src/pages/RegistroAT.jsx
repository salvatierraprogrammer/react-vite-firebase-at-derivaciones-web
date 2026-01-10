import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Checkbox,
  FormControlLabel,
  FormGroup,
  FormControl,
  InputLabel,
  Divider,
  RadioGroup,
  Radio,
  Select,
  MenuItem,
} from "@mui/material";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useState } from "react";
import logo from "../assets/logo.png";
import {colors} from "../styles";
import { useNavigate } from "react-router-dom";
function RegistroAT() {
  const [tipos, setTipos] = useState([]);
  const [disponibilidad, setDisponibilidad] = useState([]);
  const [zonas, setZonas] = useState([]);
  const [certificadoAT, setCertificadoAT] = useState(false);
  const [monotributo, setMonotributo] = useState("");
  const [genero, setGenero] = useState("");

    /* 🛡️ SEGUROS */
  const [respCivil, setRespCivil] = useState(false);
  const [seguroAP, setSeguroAP] = useState(false);
  const [seguroGestionar, setSeguroGestionar] = useState(false);
  const navigate = useNavigate();
  const handleCheckboxArray = (value, array, setArray) => {
    setArray(
      array.includes(value)
        ? array.filter((v) => v !== value)
        : [...array, value]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "at_registros"), {
        nombre: e.target.nombre.value,
        genero,
        whatsapp: e.target.whatsapp.value.replace(/\s+/g, ""),
        email: e.target.email?.value || "",
        certificadoAT,
        certificadoResolucion: e.target.certificadoResolucion.value,
        especializaciones: e.target.especializaciones.value,
        monotributo,
          seguros: {
          responsabilidadCivil: respCivil,
          accidentesPersonales: seguroAP,
          puedeGestionar: seguroGestionar,
        },
        zonas,
        disponibilidad,
        tiposAcompanamiento: tipos,
        experiencia: e.target.experiencia.value,
        estado: "activo",
        zonaInterior: e.target.zonaInterior?.value || "",
        createdAt: serverTimestamp(),
      });


    
      navigate("/gracias-at");
      alert("Registro enviado correctamente 🙌");
      e.target.reset();
      setGenero("");
      setTipos([]);
      setDisponibilidad([]);
      setZonas([]);
      setCertificadoAT(false);
      setMonotributo("");
      setRespCivil(false);
      setSeguroAP(false);
      setSeguroGestionar(false);
    } catch (error) {
      console.error(error);
      alert("Error al enviar el registro");
    }
  };

  return (
    <Container   maxWidth="sm">
    <Paper
        elevation={4}
        sx={{
          mt: 6,
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
            style={{ width: 120, borderRadius: 12 }}
          />
        </Box>

        <Typography variant="h5" align="center" gutterBottom>
          Registro de Acompañante Terapéutico
        </Typography>

        <Typography
          variant="body2"
          align="center"
          color="text.secondary"
          sx={{ mb: 3 }}
        >
          Completá el formulario para recibir propuestas laborales
        </Typography>

        <Divider sx={{ mb: 3 }} />

        <Box component="form" onSubmit={handleSubmit}>
          <TextField
            name="nombre"
            label="Nombre y Apellido"
            fullWidth
            required
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 3 }}>
          <InputLabel id="genero-label">Género</InputLabel>
          <Select
            labelId="genero-label"
            label="Género"
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            required
          >
            <MenuItem value="Femenino">Femenino</MenuItem>
            <MenuItem value="Masculino">Masculino</MenuItem>
            <MenuItem value="No binario">No binario</MenuItem>
            <MenuItem value="Prefiere no decirlo">Prefiere no decirlo</MenuItem>
          </Select>
        </FormControl>
        <TextField
          name="whatsapp"
          label="WhatsApp"
          fullWidth
          required
          placeholder="11 1234 5678"
          helperText="Solo número, sin +54 ni 9"
          sx={{ mb: 2 }}
        />
          <TextField
          name="email"
          label="Email (opcional)"
          type="email"
          fullWidth
          sx={{ mb: 2 }}
        />

          {/* CERTIFICADO */}
          <FormControlLabel
            control={
              <Checkbox
                checked={certificadoAT}
                onChange={(e) => setCertificadoAT(e.target.checked)}
              />
            }
            label="Poseo certificado de Acompañante Terapéutico"
          />
          
    

          <TextField
            name="certificadoResolucion"
            label="Resolución del certificado (si corresponde)"
            fullWidth
            sx={{ mb: 2 }}
          />

          <TextField
            name="especializaciones"
            label="Especializaciones"
            fullWidth
            required
            placeholder="Ej: Psicosis, Equizofrenia, Niñes, TEA, Adultos mayores"
            sx={{ mb: 3 }}
          />

        <Divider sx={{ mb: 3 }} />
        
          {/* MONOTRIBUTO */}
          <FormControl sx={{ mb: 3 }}>
            <InputLabel shrink>Monotributo</InputLabel>
            <RadioGroup
              value={monotributo}
              onChange={(e) => setMonotributo(e.target.value)}
            >
              <FormControlLabel
                value="tiene"
                control={<Radio />}
                label="Poseo monotributo"
              />
              <FormControlLabel
                value="gestionar"
                control={<Radio />}
                label="Tengo posibilidad de gestionarlo"
              />
              <FormControlLabel
                value="no"
                control={<Radio />}
                label="No tengo monotributo"
              />
            </RadioGroup>
          </FormControl>
          
        <Divider sx={{ mb: 3 }} />
           {/* 🛡️ SEGUROS */}
          <FormControl sx={{ mb: 3 }}>
            <InputLabel shrink>Seguros profesionales</InputLabel>
            <FormGroup>
              <FormControlLabel
                control={<Checkbox checked={respCivil} onChange={(e) => setRespCivil(e.target.checked)} />}
                label="Responsabilidad Civil Profesional"
              />
              <FormControlLabel
                control={<Checkbox checked={seguroAP} onChange={(e) => setSeguroAP(e.target.checked)} />}
                label="Seguro de Accidentes Personales (AP)"
              />
              <FormControlLabel
                control={<Checkbox checked={seguroGestionar} onChange={(e) => setSeguroGestionar(e.target.checked)} />}
                label="Posibilidad de realizarlo"
              />
            </FormGroup>
          </FormControl>
          
          <Divider sx={{ mb: 3 }} />

          {/* ZONAS */}
          <FormControl sx={{ mb: 3 }}>
            <InputLabel shrink>Zonas donde buscás trabajar</InputLabel>

            <FormGroup>
              {[
                "CABA",
                "Zona Norte",
                "Zona Oeste",
                "Zona Sur",
                "Interior / Otras provincias",
              ].map((zona) => (
                <FormControlLabel
                  key={zona}
                  control={
                    <Checkbox
                      checked={zonas.includes(zona)}
                      onChange={() =>
                        handleCheckboxArray(zona, zonas, setZonas)
                      }
                    />
                  }
                  label={zona}
                />
              ))}
            </FormGroup>
          </FormControl>

          {/* Campo extra SOLO si selecciona Interior */}
          {zonas.includes("Interior / Otras provincias") && (
            <TextField
              name="zonaInterior"
              label="Provincia y localidad"
              placeholder="Ej: Córdoba capital, Mendoza – Godoy Cruz"
              fullWidth
              sx={{ mb: 3 }}
            />
          )}

          <Divider sx={{ mb: 3 }} />

          {/* DISPONIBILIDAD */}
          <FormControl sx={{ mb: 3 }}>
            <InputLabel shrink>Disponibilidad horaria</InputLabel>
            <FormGroup>
              {["Mañana", "Tarde", "Noche", "Fines de semana", "24 hs"].map(
                (item) => (
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={disponibilidad.includes(item)}
                        onChange={() =>
                          handleCheckboxArray(
                            item,
                            disponibilidad,
                            setDisponibilidad
                          )
                        }
                      />
                    }
                    label={item}
                  />
                )
              )}
            </FormGroup>
          </FormControl>
              <Divider sx={{ mb: 3 }} />

          {/* TIPOS */}
          <FormControl sx={{ mb: 3 }}>
            <InputLabel shrink>Tipos de acompañamiento</InputLabel>
            <FormGroup>
              {[
                "Niñes",
                "Adolescentes",
                "Adulto mayor",
                "Integración Escolar",
                "Discapacidad",
                "Salud mental",
              ].map((item) => (
                <FormControlLabel
                  key={item}
                  control={
                    <Checkbox
                      checked={tipos.includes(item)}
                      onChange={() =>
                        handleCheckboxArray(item, tipos, setTipos)
                      }
                    />
                  }
                  label={item}
                />
              ))}
            </FormGroup>
          </FormControl>

          <TextField
            name="experiencia"
            label="Experiencia laboral"
            fullWidth
            required
            multiline
            rows={3}
            sx={{ mb: 3 }}
          />

          <FormControlLabel
            control={<Checkbox required />}
            label="Acepto recibir consultas por WhatsApp"
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
            Registrarme como AT
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default RegistroAT;