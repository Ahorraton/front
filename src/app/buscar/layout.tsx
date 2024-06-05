"use client";
import { styled, Container } from "@mui/material";
import React from "react";
import NavBar from "../(ahorratonLayout)/layout/NavBar";
import Footer from "../(ahorratonLayout)/layout/Footer";
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
  const query = searchParams.get('query')
  return (
    <div>
      <MainWrapper className="mainwrapper">
        <NavBar query_param={query}/>
        <Container>
          {children}
        </Container>
        <Footer />
      </MainWrapper>
    </div>
  );
}
