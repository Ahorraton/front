// RootLayout.tsx
"use client";
import { baselightTheme } from "./GlobalTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container, Typography, Box } from "@mui/material";
import React from "react";
import NavBar from "./(ahorratonLayout)/components/NavBar/NavBar";
import Footer from "./(ahorratonLayout)/components/footer/Footer";
import { useSearchParams } from "next/navigation";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

const MainWrapper = styled("div")(() => ({
  display: "flex",
  flexDirection: "column",
  minHeight: "100vh",
}));

const BodyStyle = styled("div")(() => ({
  marginTop: "2%",
  marginBottom: "2%",
  maxWidth: "xl",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const searchParams = useSearchParams();
  const query = searchParams.get("query") || "";

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={baselightTheme}>
              <CssBaseline />
              <MainWrapper className="mainwrapper" id="main-wrapper-style">
                <NavBar query_param={query} />

                <BodyStyle className="bodystyle" id="main-content-style">
                  <Container component="main" id="main-content">
                    {children}
                  </Container>
                </BodyStyle>

                <Footer />
              </MainWrapper>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
