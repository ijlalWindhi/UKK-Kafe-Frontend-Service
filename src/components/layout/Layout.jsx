// import library yang dibutuhkan
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../sidebar";
import { Box, Grid, GridItem } from "@chakra-ui/react";

// buat komponen Layout
export default function Layout() {
  return (
    <Box w={"100vw"} maxW="100%" bgColor={"white"}>
      <Grid
        templateColumns={{ md: "15rem auto" }}
        minH={"100vh"}
        bgColor={"white"}
      >
        <GridItem position={"relative"}>
          <Sidebar />
        </GridItem>
        <GridItem>
          <Outlet /> {/* tampilkan outlet */}
          {/* outlet adalah komponen yang akan ditampilkan di dalam layout yang di definisikan di App.jsx / pada rute utama */}
        </GridItem>
      </Grid>
    </Box>
  );
}
