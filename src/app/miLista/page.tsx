import { Box, Breadcrumbs, Link, Typography } from "@mui/material";
import MiLista from "./MiLista";

export default function Page() {
  return (
    <Box>
      <Box mt={2}>
        <Breadcrumbs aria-label="breadcrumb">
          <Link color="inherit" href="/">
            Inicio
          </Link>
          <Typography color="textPrimary">Mi lista</Typography>
        </Breadcrumbs>
        <MiLista />;
      </Box>
    </Box>
  );
}
