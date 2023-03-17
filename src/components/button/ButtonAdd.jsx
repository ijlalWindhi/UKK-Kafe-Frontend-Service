// import library yang dibutuhkan
import React from "react";
import { Button, Icon } from "@chakra-ui/react";
import { FaPlusCircle } from "react-icons/fa";

// buat komponen ButtonAdd
export default function ButtonAdd({ heading, onclick }) {
  return (
    <Button
      colorScheme={"green"}
      size={{ base: "sm", md: "md" }}
      px={"10"}
      fontWeight={400}
      fontFamily={"Poppins"}
      onClick={() => onclick()}
      w={{ base: "full", md: "auto" }}
    >
      {heading} {/* tampilkan heading */}
      <Icon ml={2} as={FaPlusCircle} w={5} h={5} />
    </Button>
  );
}
