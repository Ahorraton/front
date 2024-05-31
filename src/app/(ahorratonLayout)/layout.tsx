"use client";
import { styled, Container, Box } from "@mui/material";
import React, { useState } from "react";
import Header from "./layout/Header";
import Sidebar from "./layout/sidebar/Sidebar";
import Footer from "./layout/Footer";


const MainWrapper = styled("div")(() => ({
  minHeight: "90vh",
  display: "flex",
  flexDirection: "column",
}));

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <MainWrapper className="mainwrapper">
          <Container>
            {children}
          </Container>
      </MainWrapper>
      <Footer />
    </div>
  );
}
