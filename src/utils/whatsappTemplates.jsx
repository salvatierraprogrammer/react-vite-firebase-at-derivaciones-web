/* 🔤 Normaliza texto (minúsculas + sin acentos) SOLO para comparar */
const normalizar = (t = "") =>
  t
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");

/* 🧠 Sinónimos simples */
const sinonimos = {
  tea: ["tea", "autismo", "trastorno del espectro autista"],
};

/* 🔍 Comparación con sinónimos */
const textoIncluye = (texto = "", busqueda = "") => {
  const t = normalizar(texto);
  const b = normalizar(busqueda);

  if (t.includes(b)) return true;

  return Object.values(sinonimos).some((lista) =>
    lista.some(
      (s) => t.includes(normalizar(s)) && b.includes(normalizar(s))
    )
  );
};

/* 📲 TEXTO FINAL PARA WHATSAPP */
export const generarTextoWhatsApp = ({ at, solicitud }) => {
  const motivos = [];

  if (at.zonas?.includes(solicitud.zona)) {
    motivos.push(`✅ Zona compatible (${solicitud.zona})`);
  }

  if (at.tiposAcompanamiento?.includes(solicitud.tipoAcompanamiento)) {
    motivos.push(`🧩 Tipo de acompañamiento acorde al caso`);
  }

  if (
    textoIncluye(at.especializaciones, solicitud.diagnostico) ||
    textoIncluye(at.experiencia, solicitud.diagnostico)
  ) {
    motivos.push(`🧠 Experiencia en ${solicitud.diagnostico}`);
  }

  return [
    `Hola ${at.nombre}, ¿cómo estás? 👋`,
    ``,
    `Te contactamos desde *El Canal del AT* por una posible propuesta de acompañamiento terapéutico.`,
    ``,
    `📍 *Zona:* ${solicitud.zona}`,
    `👤 *Edad:* ${solicitud.edad || "—"}`,
    `🧠 *Diagnóstico:* ${solicitud.diagnostico}`,
    `🕒 *Horarios:* ${solicitud.horariosDetalle || "A coordinar"}`,
    ``,
    `🔍 *¿Por qué pensamos en vos?*`,
    ...motivos.map((m) => `• ${m}`),
    ``,
    `👉 *Si te interesa avanzar*, respondé por este medio y *enviaremos tu contacto al caso*.`,
    `La persona solicitante será quien se comunique con vos para brindarte más detalles y coordinar.`,
    ``,
    `Gracias por tu tiempo 💚`,
    `Equipo *El Canal del AT*`,
  ].join("\n");
};
