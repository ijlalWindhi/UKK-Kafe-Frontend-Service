// import library yang dibutuhkan
import React from "react";
import { Box, Center } from "@chakra-ui/react";

// buat komponen Container
const Container = ({ children }) => {
  return (
    <Center
      minH={"100vh"}
      w={"full"}
      maxW={"100vw"}
      mt={{ base: 24, sm: 20, md: 0 }}
    >
      <Box
        minH={"80vh"}
        w={{ base: "90%", md: "90%", xl: "80%" }}
        rounded={"2xl"}
        boxShadow={"lg"}
        p={{ base: 5, md: 10 }}
        my={{ md: 12 }}
        position={"relative"}
      >
        {children} {/* tampilkan children */}
      </Box>
    </Center>
  );
};

export default Container;
