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
import { useState, useEffect, useMemo } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";

import SolicitudesTable from "../components/SolicitudesTable";
import AtsTable from "../components/AtsTable";
import MatchesDialog from "../components/MatchesDialog";
import { generarTextoWhatsAppCliente } from "../utils/generarTextoWhatsAppCliente";

/* ---------------- SINÓNIMOS ---------------- */
const sinonimos = {
  tea: ["autismo", "trastorno del espectro autista"],
  autismo: ["tea"],
  psicosis: ["esquizofrenia"],
  ansiedad: ["trastorno de ansiedad"],
};

/* ---------------- HELPERS ---------------- */
const normalizarTexto = (texto = "") =>
  String(texto).toLowerCase().trim();

const textoCoincide = (texto = "", busqueda = "") => {
  if (!texto || !busqueda) return false;

  const textoFinal = Array.isArray(texto) ? texto.join(" ") : texto;
  const t = normalizarTexto(textoFinal);
  const b = normalizarTexto(busqueda);

  if (t.includes(b)) return true;

  const sin = sinonimos[b];
  if (!sin) return false;

  return sin.some((s) => t.includes(s));
};

/* 👤 GÉNERO */
const generoCompatible = (atGenero, generoAT) => {
  if (!generoAT || generoAT === "indistinto") return true;
  return atGenero === generoAT;
};

const scoreGenero = (atGenero, generoAT) => {
  if (!generoAT || generoAT === "indistinto") {
    return { puntos: 5, razon: "Género indistinto" };
  }
  if (atGenero === generoAT) {
    return { puntos: 15, razon: "Género compatible" };
  }
  return { puntos: 0, razon: null };
};

/* 👶 NIÑES */
const trabajaConNinies = (tipos = []) =>
  tipos.some((t) => normalizarTexto(t).includes("niñ"));

/* ================= ADMIN PANEL ================= */
export default function AdminPanel() {
  const CODIGO_CORRECTO = import.meta.env.VITE_CODIGO_ACCESO;

  const [bloqueado, setBloqueado] = useState(true);
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState(false);

  const [tab, setTab] = useState(0);
  const [openMatches, setOpenMatches] = useState(false);

  const [solicitudes, setSolicitudes] = useState([]);
  const [ats, setAts] = useState([]);
  const [matches, setMatches] = useState([]);
  const [solicitudActual, setSolicitudActual] = useState(null);
  const [matchesPorSolicitud, setMatchesPorSolicitud] = useState({});
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
      at.tiposAcompanamiento.some(
        (t) =>
          normalizarTexto(t) ===
          normalizarTexto(solicitud.tipoAcompanamiento)
      )
    ) {
      score += 25;
      razones.push("Tipo de acompañamiento compatible");
    }

    if (
      solicitud.grupoEtario === "niñes" &&
      trabajaConNinies(at.tiposAcompanamiento)
    ) {
      score += 10;
      razones.push("Experiencia con niñes");
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

    const genero = scoreGenero(at.genero, solicitud.generoAT);
    score += genero.puntos;
    if (genero.razon) razones.push(genero.razon);

    return { score, razones };
  };

  /* ---------------- MATCHES ---------------- */
const buscarMatches = (solicitud) => {
  const resultado = ats
    .filter((at) => at.estado === "activo")
    .filter((at) => generoCompatible(at.genero, solicitud.generoAT))
    .map((at) => {
      const { score, razones } = calcularScore(at, solicitud);
      return { ...at, score, razones };
    })
    .filter((at) => at.score >= 40)
    .sort((a, b) => b.score - a.score);

  setMatchesPorSolicitud((prev) => ({
    ...prev,
    [solicitud.id]: resultado,
  }));

  setSolicitudActual(solicitud);
  setMatches(resultado);
  setOpenMatches(true);
};

  /* ---------------- WHATSAPP CLIENTE ---------------- */
  const whatsappClienteUrl = useMemo(() => {
    if (!solicitudActual?.whatsapp || matches.length === 0) return null;

    const texto = generarTextoWhatsAppCliente({
      solicitud: solicitudActual,
      matches,
    });

    return `https://wa.me/${solicitudActual.whatsapp}?text=${encodeURIComponent(
      texto
    )}`;
  }, [solicitudActual, matches]);

  /* ================= RENDER ================= */
  return (
    <>
      <Dialog open={bloqueado} fullWidth maxWidth="xs">
        <DialogTitle>🔒 Acceso restringido</DialogTitle>
        <DialogContent>
          <Typography sx={{ mb: 2 }}>
            Ingresá el código para continuar
          </Typography>
          <TextField
            fullWidth
            autoFocus
            value={codigo}
            error={error}
            helperText={error ? "Código incorrecto" : ""}
            onChange={(e) => setCodigo(e.target.value)}
            inputProps={{
              maxLength: 6,
              style: { textAlign: "center", fontSize: 22 },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button fullWidth variant="contained" onClick={validarCodigo}>
            Ingresar
          </Button>
        </DialogActions>
      </Dialog>

      {!bloqueado && (
        <Container maxWidth="lg" sx={{ mt: 6 }}>
          <Typography variant="h4" gutterBottom>
            Panel de Administración
          </Typography>

          <Paper>
            <Tabs value={tab} onChange={(e, v) => setTab(v)}>
              <Tab label="Solicitudes" />
              <Tab label="ATs" />
            </Tabs>

            {tab === 0 && (
            <SolicitudesTable
              solicitudes={solicitudes}
              onVerMatches={buscarMatches}
              matchesPorSolicitud={matchesPorSolicitud}
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
