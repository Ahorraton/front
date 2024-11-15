// RootLayout.tsx
"use client";
import { baselightTheme } from "./global_layout/GlobalTheme";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { styled, Container, Typography, Box } from "@mui/material";
import React, { Suspense } from "react";
import NavBar from "./global_layout/navBar/NavBar";
import Footer from "./global_layout/footer/Footer";
import { useSearchParams } from "next/navigation";
import { Provider } from "react-redux";
import { store, persistor } from "../redux/store";
import { PersistGate } from "redux-persist/integration/react";
import Loading from "./loadingScreens/loading";

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

const RootLayout = ({ children }: { children: React.ReactNode }) => {
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
                  <Container
                    component="main"
                    id="main-content"
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      minHeight: "120vh",
                    }}
                  >
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
};

const RootLayoutWithSuspense = ({
  children,
}: {
  children: React.ReactNode;
}) => (
  <Suspense fallback={<Loading />}>
    <RootLayout>{children}</RootLayout>
  </Suspense>
);

export default RootLayoutWithSuspense;
