"use client";
import { styled, Container, Box } from "@mui/material";
import React from "react";
import Footer from "./layout/Footer";
import NavBar from "./layout/NavBar";


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
  return (
    <div>
      <MainWrapper className="mainwrapper">
        <NavBar />
        <Container>
          {children}
        </Container>
        <Footer />
      </MainWrapper>
    </div>
  );
}
