// RootLayout.tsx
"use client";
import { baselightTheme } from "./(ahorratonLayout)/theme/GlobalTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container, Typography } from "@mui/material";
import React from "react";
import NavBar from "./(ahorratonLayout)/layout/NavBar";
import Footer from "./(ahorratonLayout)/layout/Footer";
import { useSearchParams } from "next/navigation";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";

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
  const query = searchParams.get("query") || "";

  return (
    <html lang="en">
      <body>
        <Provider store={store}>
          <PersistGate loading={null} persistor={persistor}>
            <ThemeProvider theme={baselightTheme}>
              <CssBaseline />
              <MainWrapper className="mainwrapper">
                <NavBar query_param={query} />
                <br />
                <Container maxWidth="xl">{children}</Container>
                <br />
                <Footer />
              </MainWrapper>
            </ThemeProvider>
          </PersistGate>
        </Provider>
      </body>
    </html>
  );
}
