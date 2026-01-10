import { Table, TableHead, TableRow, TableCell, TableBody, Button, Chip, Box } from "@mui/material";

export default function SolicitudesTable({ solicitudes, onVerMatches }) {
  return (
    <Box p={3}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell>Zona</TableCell>
            <TableCell>Tipo</TableCell>
            <TableCell>Estado</TableCell>
            <TableCell>Acciones</TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {solicitudes.map((s) => (
            <TableRow key={s.id}>
              <TableCell>{s.nombre}</TableCell>
              <TableCell>{s.zona}</TableCell>
              <TableCell>{s.tipo}</TableCell>
              <TableCell>
                <Chip label={s.estado} color="warning" size="small" />
              </TableCell>
              <TableCell>
                <Button size="small" variant="outlined" onClick={() => onVerMatches(s)} sx={{ mr: 1 }}>
                  Ver matches
                </Button>
                <Button
                  size="small"
                  variant="contained"
                  href={`https://wa.me/${s.whatsapp}`}
                  target="_blank"
                >
                  WhatsApp
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Box>
  );
}