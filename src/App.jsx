import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import RegistroAT from "./pages/RegistroAT";
import AdminPanel from "./pages/AdminPanel";
import GraciasAT from "./pages/GraciasAT";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/registro-at" element={<RegistroAT />} />
      
        <Route path="/gracias-at" element={<GraciasAT />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;