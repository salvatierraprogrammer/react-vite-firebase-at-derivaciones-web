import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

const generarPDFMatch = ({ at, solicitud }) => {
  const doc = new jsPDF();

  /* TÍTULO */
  doc.setFontSize(14);
  doc.text("Ficha de Match – Acompañante Terapéutico", 14, 15);

  /* INFO AT */
  doc.setFontSize(11);
  doc.text(`AT: ${at.nombre}`, 14, 25);
  doc.text(
    `Zonas: ${Array.isArray(at.zonas) ? at.zonas.join(", ") : "—"}`,
    14,
    32
  );
  doc.text(
    `Especializaciones: ${at.especializaciones || "—"}`,
    14,
    39
  );

  /* TABLA CASO */
  autoTable(doc, {
    startY: 50,
    head: [["Campo", "Detalle"]],
    body: [
      ["Caso / Solicitud", solicitud?.nombre || "—"],
      ["Zona", solicitud?.zona || "—"],
      ["Diagnóstico", solicitud?.diagnostico || "—"],
      ["Tipo de acompañamiento", solicitud?.tipoAcompanamiento || "—"],
      ["Prestación", solicitud?.tipoPrestacion || "—"],
      ["Score de compatibilidad", `${at.score}%`],
    ],
  });

  doc.save(`match-${at.nombre}.pdf`);
};

export default generarPDFMatch;