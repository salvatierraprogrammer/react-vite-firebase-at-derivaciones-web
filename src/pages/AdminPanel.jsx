import { Container, Typography, Paper, Tabs, Tab } from "@mui/material";
import { useState, useEffect } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebase";
import SolicitudesTable from "../components/SolicitudesTable";
import AtsTable from "../components/AtsTable";
import MatchesDialog from "../components/MatchesDialog";

export default function AdminPanel() {
  const [tab, setTab] = useState(0);
  const [open, setOpen] = useState(false);
  const [matches, setMatches] = useState([]);
  const [solicitudActual, setSolicitudActual] = useState(null);

  const [solicitudes, setSolicitudes] = useState([]);
  const [ats, setAts] = useState([]);

  // 🔹 Traer datos de Firestore
  useEffect(() => {
    const fetchSolicitudes = async () => {
      const querySnapshot = await getDocs(collection(db, "solicitudes"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setSolicitudes(data);
    };

    const fetchAts = async () => {
      const querySnapshot = await getDocs(collection(db, "at_registros"));
      const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAts(data);
    };

    fetchSolicitudes();
    fetchAts();
  }, []);

  const buscarMatches = (solicitud) => {
    const resultado = ats.filter(
      (at) =>
        at.estado === "activo" &&
        at.zona === solicitud.zona &&
        at.tiposAcompanamiento?.includes(solicitud.tipo)
    );
    setSolicitudActual(solicitud);
    setMatches(resultado);
    setOpen(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6 }}>
      <Typography variant="h4" gutterBottom>Panel de Administración</Typography>

      <Paper elevation={3}>
        <Tabs value={tab} onChange={(e, v) => setTab(v)} indicatorColor="primary" textColor="primary">
          <Tab label="Solicitudes" />
          <Tab label="Acompañantes Terapéuticos" />
        </Tabs>

        {tab === 0 && <SolicitudesTable solicitudes={solicitudes} onVerMatches={buscarMatches} />}
        {tab === 1 && <AtsTable ats={ats} />}
      </Paper>

      <MatchesDialog open={open} onClose={() => setOpen(false)} matches={matches} solicitud={solicitudActual} />
    </Container>
  );
}