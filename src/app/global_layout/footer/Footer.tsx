import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";
import { Box } from "@mui/material";
import "./footer.css";

export default function Footer() {
  return (
    <Box className="footer" component="footer" id="footer">
      <Container maxWidth="sm">
        <Typography variant="body2" color="text.secondary" align="center">
          {"Hecho con cariño por "}
          <Link color="inherit" href="https://github.com/Ahorraton">
            Ahorratón
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}
