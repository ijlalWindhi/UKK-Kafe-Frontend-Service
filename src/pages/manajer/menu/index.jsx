// Desc: Halaman Kelola Menu
// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import { Box, Progress, Text } from "@chakra-ui/react";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { getAllDetailTransaksi } from "./fragments/ApiHandler";
import { Chart } from "chart.js/auto";
import { Pie } from "react-chartjs-2";

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [dataMenu, setDataMenu] = useState([]); // state untuk data menu

  // fungsi untuk mengambil data menu
  const getData = async () => {
    const res = await getAllDetailTransaksi();
    setDataMenu(res.data);
  };

  // ambil data menu ketika komponen pertama kali di render
  useEffect(() => {
    setLoading(true);
    getData();
    setLoading(false);
  }, []);

  // opstion untuk chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        align: "center",
        labels: {
          color: "#000",
          font: {
            size: 12,
          },
        },
      },
    },
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
  };

  // data untuk chart
  const data = {
    // menampilkan nama menu yang paling banyak dipesan dan paling sedikit dipesan
    labels: [
      `Paling Banyak Dipesan (${dataMenu[0]?.menu?.nama_menu})`,
      `Paling Sedikit Dipesan (${
        dataMenu[dataMenu.length - 1]?.menu?.nama_menu
      })`,
    ],
    // menampilkan jumlah menu yang paling banyak dipesan dan paling sedikit dipesan
    datasets: [
      {
        data: [
          `
        ${dataMenu[0]?.jumlah || 0}
        `,
          `
        ${dataMenu[dataMenu.length - 1]?.jumlah || 0}
        `,
        ],
        backgroundColor: ["#EF5DA8", "#219ebc"],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <Container>
      <Heading text="Kelola Menu" /> {/* memanggil komponen heading */}
      <Text fontFamily={"Poppins"} my={5}>
        Statistik Menu
      </Text>
      <Box my={10} maxW={"100%"}>
        {/*  jika loading true, maka tampilkan progress bar, jika loading false maka tampilkan table */}
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Box w={{ base: "full", md: "40%" }} m={"auto"}>
            {/* memanggil komponen chart */}
            <Pie data={data} options={options} />
          </Box>
        )}
      </Box>
    </Container>
  );
}
