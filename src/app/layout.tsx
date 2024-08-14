// RootLayout.tsx
"use client";
import { baselightTheme } from "./(ahorratonLayout)/theme/GlobalTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container } from "@mui/material";
import React from "react";
import NavBar from "./(ahorratonLayout)/layout/NavBar";
import Footer from "./(ahorratonLayout)/layout/Footer";
import { useSearchParams } from 'next/navigation';
import { Provider } from 'react-redux';
import { store } from '../redux/store';

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
  const searchParams = useSearchParams();
  const query = searchParams.get('query') || "";
  let compare = false;
  if (typeof window !== 'undefined') {
    if (window.location.pathname === '/comparar') {
      compare = true;
    }
  }
  const [compareSearch, setCompareSearch] = React.useState<boolean>(compare);
  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <ThemeProvider theme={baselightTheme}>
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
        </Provider>
      </body>
    </html>
  );
}
