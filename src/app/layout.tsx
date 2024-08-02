"use client";
import { baselightTheme } from "./(ahorratonLayout)/theme/GlobalTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container } from "@mui/material";
import React from "react";
import NavBar from "./(ahorratonLayout)/layout/NavBar";
import Footer from "./(ahorratonLayout)/layout/Footer";
import { useSearchParams } from 'next/navigation'

const MainWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams()
  const query = searchParams.get('query') || ""
  let compare = false;
  if (window.location.pathname === '/comparar') {
    compare = true;
  }
  const [compareSearch, setCompareSearch] = React.useState<boolean>(compare);
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={baselightTheme}>
          {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
          <CssBaseline />
          <MainWrapper className="mainwrapper">
            <NavBar
              query_param={query}
              setCompareSearch={setCompareSearch}
              compareSearch={compareSearch}
              />
            <br />
            <Container>
              {children}
            </Container>
            <Footer />
          </MainWrapper>
        </ThemeProvider>
      </body>
    </html>
  );
}
