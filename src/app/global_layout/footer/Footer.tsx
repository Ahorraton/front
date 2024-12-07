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
        <Box display='flex' flexDirection='row' justifyContent='center' alignItems='center'>
          <Box>
            <Typography marginRight={1}>
              🤍
            </Typography>
          </Box>
          <Box>
            <Box>
              <Typography variant="body2" color="black" align="center">
                {"Hecho con cariño"}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body2" color="black" align="center">
                {"por "}
                <Link color="inherit" href="https://github.com/Ahorraton">
                  Ahorratón
                </Link>{" "}
              </Typography>
            </Box>
          </Box>
          <Box>
            <Typography marginLeft={1}>
              🤍
            </Typography>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
