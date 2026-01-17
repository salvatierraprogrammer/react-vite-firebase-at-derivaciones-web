import html2canvas from "html2canvas";

const generarFlyer = async () => {
  const flyer = document.getElementById("flyer-solicitud");
  if (!flyer) return;

  const canvas = await html2canvas(flyer, {
    scale: 2,
    useCORS: true,
  });

  const link = document.createElement("a");
  link.download = `busqueda-at-${solicitud.id}.png`;
  link.href = canvas.toDataURL("image/png");
  link.click();
};
