// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Text, Box } from "@chakra-ui/react";
import HeadingDashboard from "../../../components/text/HeadingDashboard";
import Container from "../../../components/container/Container";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";

// buat komponen index
export default function index() {
  // buat state user
  const [user, setUser] = useState(null);

  // jalankan useEffect
  useEffect(() => {
    // ambil data user dari local storage
    const user = getLocalStorage(LOCAL_STORAGE_USER);
    // set state user
    setUser(user);
  }, []);

  // tampilkan komponen
  return (
    // tampilkan container
    <Container>
      {/*  tampilkan heading, text, dan user dari komponen yang sudah diimport */}
      <Box
        textAlign={"center"}
        display={"flex"}
        flexDir={"column"}
        alignItems={"center"}
        gap={5}
        w={"full"}
        position={"absolute"}
        top={"50%"}
        left={"50%"}
        transform={"translate(-50%, -50%)"}
      >
        {/* tampilkan heading dan text dari komponen yang sudah diimport dengan membawa props */}
        <HeadingDashboard text="Selamat Datang di Dashboard Kasir" />
        <Text fontWeight={500} fontSize={"xl"}>
          {/* tampilkan user dari state user */}
          Saat ini anda login sebagai : {user?.nama_user}
        </Text>
      </Box>
    </Container>
  );
}
