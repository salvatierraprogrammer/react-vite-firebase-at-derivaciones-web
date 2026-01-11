import {
  Container,
  Typography,
  Paper,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
} from "@mui/material";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import SolicitudesTable from "../components/SolicitudesTable";
import AtsTable from "../components/AtsTable";
import MatchesDialog from "../components/MatchesDialog";

/* ---------------- SINÓNIMOS ---------------- */
const sinonimos = {
  tea: ["autismo", "trastorno del espectro autista"],
  autismo: ["tea"],
  psicosis: ["esquizofrenia"],
  ansiedad: ["trastorno de ansiedad"],
};

const normalizarTexto = (texto = "") => texto.toLowerCase();

const textoCoincide = (texto = "", busqueda = "") => {
  const t = normalizarTexto(texto);
  const b = normalizarTexto(busqueda);

  if (t.includes(b)) return true;

  const sin = sinonimos[b];
  if (!sin) return false;

  return sin.some((s) => t.includes(s));
};

/* ================= ADMIN PANEL ================= */
export default function AdminPanel() {
  /* 🔐 BLOQUEO */
  const CODIGO_CORRECTO = import.meta.env.VITE_CODIGO_ACCESO;
  const [bloqueado, setBloqueado] = useState(true);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(false);

  /* UI */
  const [tab, setTab] = useState(0);
  const [openMatches, setOpenMatches] = useState(false);

  const [solicitudes, setSolicitudes] = useState([]);
  const [ats, setAts] = useState([]);
  const [matches, setMatches] = useState([]);
  const [solicitudActual, setSolicitudActual] = useState(null);

  /* ---------------- FIRESTORE ---------------- */
  useEffect(() => {
    if (bloqueado) return;

    const fetchData = async () => {
      const solSnap = await getDocs(collection(db, "solicitudes_at"));
      const atSnap = await getDocs(collection(db, "at_registros"));

      setSolicitudes(solSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
      setAts(atSnap.docs.map((d) => ({ id: d.id, ...d.data() })));
    };

    fetchData();
  }, [bloqueado]);

  /* ---------------- VALIDAR CÓDIGO ---------------- */
  const validarCodigo = () => {
    if (codigo === CODIGO_CORRECTO) {
      setBloqueado(false);
      setError(false);
    } else {
      setError(true);
    }
  };

  /* ---------------- SCORE ---------------- */
  const calcularScore = (at, solicitud) => {
    let score = 0;
    const razones = [];

    if (!Array.isArray(at.zonas) || !at.zonas.includes(solicitud.zona)) {
      return { score: 0, razones };
    }
    score += 30;
    razones.push("Zona compatible");

    if (
      Array.isArray(at.tiposAcompanamiento) &&
      at.tiposAcompanamiento.includes(solicitud.tipoAcompanamiento)
    ) {
      score += 25;
      razones.push("Tipo de acompañamiento compatible");
    }

    if (textoCoincide(at.especializaciones, solicitud.diagnostico)) {
      score += 20;
      razones.push("Especialización relacionada");
    }

    if (textoCoincide(at.experiencia, solicitud.diagnostico)) {
      score += 15;
      razones.push("Experiencia previa");
    }

    if (
      solicitud.tipoPrestacion !== "AT particular (pago privado)" &&
      at.monotributo !== "no"
    ) {
      score += 10;
      razones.push("Compatible con prestación");
    }

    return { score, razones };
  };

  /* ---------------- MATCHES ---------------- */
  const buscarMatches = (solicitud) => {
    const resultado = ats
      .filter((at) => at.estado === "activo")
      .map((at) => {
        const { score, razones } = calcularScore(at, solicitud);
        return { ...at, score, razones };
      })
      .filter((at) => at.score >= 40)
      .sort((a, b) => b.score - a.score);

    setSolicitudActual(solicitud);
    setMatches(resultado);
    setOpenMatches(true);
  };

  /* ================= RENDER ================= */
  return (
    <>
      {/* 🔐 MODAL BLOQUEANTE */}
      <Dialog open={bloqueado} fullWidth maxWidth="xs">
        <DialogTitle>🔒 Acceso restringido</DialogTitle>

        <DialogContent>
          <Typography variant="body2" sx={{ mb: 2 }}>
            Ingresá el código de 6 dígitos para continuar
          </Typography>

          <TextField
            autoFocus
            fullWidth
            value={codigo}
            error={error}
            helperText={error ? "Código incorrecto" : ""}
            onChange={(e) => setCodigo(e.target.value)}
            inputProps={{
              maxLength: 6,
              inputMode: "numeric",
              style: { textAlign: "center", fontSize: 22, letterSpacing: 6 },
            }}
          />
        </DialogContent>

        <DialogActions>
          <Button variant="contained" fullWidth onClick={validarCodigo}>
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>

      {/* 🧠 PANEL */}
      {!bloqueado && (
        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Panel de Administración
          </Typography>

          <Paper elevation={3}>
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
              <Tab label="Solicitudes" />
              <Tab label="Acompañantes Terapéuticos" />
            </Tabs>

            {tab === 0 && (
              <SolicitudesTable
                solicitudes={solicitudes}
                onVerMatches={buscarMatches}
              />
            )}

            {tab === 1 && <AtsTable ats={ats} />}
          </Paper>

          <MatchesDialog
            open={openMatches}
            onClose={() => setOpenMatches(false)}
            matches={matches}
            solicitud={solicitudActual}
          />
        </Container>
      )}
    </>
  );
}