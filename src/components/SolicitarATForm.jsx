import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase/firebase";

function SolicitarATForm() {
  const handleSubmit = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, "solicitudes_at"), {
      nombre: e.target.nombre.value,
      zona: e.target.zona.value,
      whatsapp: e.target.whatsapp.value,
      createdAt: serverTimestamp()
    });

    alert("Solicitud enviada");
    e.target.reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input name="nombre" placeholder="Tu nombre" required />
      <input name="zona" placeholder="Zona" required />
      <input name="whatsapp" placeholder="WhatsApp" required />
      <button>Solicitar AT</button>
    </form>
  );
}

export default SolicitarATForm;
