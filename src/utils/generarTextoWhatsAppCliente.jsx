/* ================= TEXTO PARA CLIENTE SOLICITANTE ================= */
export const generarTextoWhatsAppCliente = ({ solicitud, matches = [] }) => {
  const cantidad = matches.length;

  // Ejemplos anonimizados (solo para mostrar volumen)
  const ejemplos = matches.slice(0, 3).map((_, i) => {
    return `• Contacto ${i + 1}: AT con ${matches[i].score}% de compatibilidad`;
  });

  return [
    `Hola ${solicitud.nombre || ""} 👋`,
    ``,
    `Te escribimos desde *El Canal del AT* por tu solicitud de acompañamiento terapéutico.`,
    ``,
    `🔍 Realizamos el análisis del caso y encontramos *${cantidad} acompañantes terapéuticos compatibles* con tu búsqueda.`,
    ``,
    `📌 Ejemplo de compatibilidades encontradas:`,
    ...ejemplos,
    cantidad > 3 ? `• …y ${cantidad - 3} perfiles más` : null,
    ``,
    `Los perfiles fueron evaluados según:`,
    `• Zona`,
    `• Tipo de acompañamiento`,
    `• Experiencia y especialización`,
    `• Compatibilidad con la prestación`,
    ``,
    `👉 Para *liberar los datos de contacto* y avanzar con la vinculación, es necesario *confirmar el pago del servicio*.`,
    ``,
    `Una vez acreditado el pago, te enviamos:`,
    `• Los contactos completos de los AT`,
    `• Y quedás en contacto directo para coordinar entrevista y detalles del caso.`,
    ``,
    `Quedamos atentos para continuar 🙂`,
    `Equipo *El Canal del AT*`,
  ]
    .filter(Boolean)
    .join("\n");
};
