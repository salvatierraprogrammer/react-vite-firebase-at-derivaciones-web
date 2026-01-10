import { TableRow, TableCell, Button, Chip } from "@mui/material";

export default function ATRow({ at, onVerPerfil }) {
  return (
    <TableRow>
      <TableCell>{at.nombre}</TableCell>
      <TableCell>{at.zonas?.join(", ")}</TableCell>
      <TableCell>
        {at.tiposAcompanamiento?.map((t) => (
          <Chip key={t} label={t} size="small" sx={{ mr: 0.5 }} />
        ))}
      </TableCell>
      <TableCell>
        <Chip
          label={at.estado}
          color={at.estado === "activo" ? "success" : "default"}
          size="small"
        />
      </TableCell>
      <TableCell>
        <Button size="small" variant="outlined" onClick={() => onVerPerfil(at)} sx={{ mr: 1 }}>
          Ver
        </Button>
        <Button size="small" variant="outlined" href={`https://wa.me/${at.whatsapp}`} target="_blank">
          What
        </Button>
      </TableCell>
    </TableRow>
  );
}
