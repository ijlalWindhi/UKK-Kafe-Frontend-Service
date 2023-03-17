// import library yang dibutuhkan
import React from "react";
import { Heading } from "@chakra-ui/react";

// buat komponen HeadingDashboard
export default function HeadingDashboard(props) {
  return (
    // tampilkan heading
    <Heading
      as="h1"
      size="xl"
      fontWeight={600}
      color={"green.600"}
      fontFamily={"Poppins"}
    >
      {/* tampilkan props text */}
      {props.text}
    </Heading>
  );
}
