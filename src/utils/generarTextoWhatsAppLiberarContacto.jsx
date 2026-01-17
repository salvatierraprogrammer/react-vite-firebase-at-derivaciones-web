/* ================= TEXTO PARA LIBERAR CONTACTO AT ================= */
export const generarTextoWhatsAppLiberarContacto = ({
  solicitud = {},
  matches = [],
} = {}) => {
  const nombre = solicitud?.nombre || "";

  const contactos = matches
    .filter(Boolean) // 🔐 CLAVE: elimina ATs rotos
    .map((at, index) => {
      const telefono = at?.whatsapp
        ? at.whatsapp.replace(/\D/g, "")
        : "";

      return [
        `👤 *Acompañante Terapéutico ${index + 1}*`,
        `Nombre: ${at?.nombre || "—"}`,
        `Género: ${at?.genero || "—"}`,
        ``,
        `📚 Formación`,
        at?.estadoEducativo ? `• Estado: ${at.estadoEducativo}` : null,
        at?.estudianteCarrera ? `• Carrera: ${at.estudianteCarrera}` : null,
        at?.carreraFinalizada
          ? `• Carrera finalizada: ${at.carreraFinalizada}`
          : null,
        ``,
        `🧠 Experiencia`,
        at?.experiencia || "—",
        ``,
        `📌 Especializaciones`,
        at?.especializaciones || "—",
        ``,
        `🕒 Disponibilidad`,
        Array.isArray(at?.disponibilidad)
          ? at.disponibilidad.map((d) => `• ${d}`).join("\n")
          : "—",
        ``,
        `📍 Zona`,
        Array.isArray(at?.zonas) ? at.zonas.join(", ") : "—",
        ``,
        `📄 Condiciones administrativas`,
        `• Monotributo: ${at?.monotributo || "—"}`,
        `• Seguro AP: ${at?.seguros?.accidentesPersonales ? "Sí" : "No"}`,
        `• Seguro RC: ${at?.seguros?.responsabilidadCivil ? "Sí" : "No"}`,
        ``,
        `📲 Contacto directo`,
        telefono ? `WhatsApp: https://wa.me/${telefono}` : "—",
        at?.email ? `Email: ${at.email}` : null,
        ``,
        `———————————————`,
      ]
        .filter(Boolean)
        .join("\n");
    });

  return [
    `Hola ${nombre} 👋`,
    ``,
    `Te escribimos desde *El Canal del AT*.`,
    ``,
    `✅ El proceso fue finalizado y ya podemos *liberar los datos de contacto* de los acompañantes terapéuticos seleccionados.`,
    ``,
    `A partir de ahora podés comunicarte *directamente* con ellos para coordinar entrevista, horarios y comienzo del acompañamiento.`,
    ``,
    ...contactos,
    ``,
    `Desde nuestra parte, la gestión administrativa queda cerrada.`,
    ``,
    `Ante cualquier nueva búsqueda, quedamos a disposición.`,
    ``,
    `Saludos cordiales 🙂`,
    `Equipo *El Canal del AT*`,
  ].join("\n");
};
