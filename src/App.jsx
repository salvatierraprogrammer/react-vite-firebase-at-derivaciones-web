import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegistroAT from "./pages/RegistroAT";
import AdminPanel from "./pages/AdminPanel";
import GraciasAT from "./pages/GraciasAT";
import SolicitarAT from "./pages/SolicitarAT";
import Header from "./components/home/Header";
import Footer from "./components/home/Footer";

function App() {
  return (
    <BrowserRouter>
    <Header/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro-at" element={<RegistroAT />} />
        <Route path="/admin" element={<AdminPanel />} />
        <Route path="/gracias-at" element={<GraciasAT />} />
        <Route path="/solicitar-at" element={<SolicitarAT />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;