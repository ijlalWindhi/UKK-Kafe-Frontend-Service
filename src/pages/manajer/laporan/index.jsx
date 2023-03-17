// Desc: Halaman Kelola Menu
// import library yang dibutuhkan
import React, { useState } from "react";
import { Box, Progress, Text, Flex, Select, Input } from "@chakra-ui/react";
import Table from "../../../components/table";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import {
  getAllDetailTransaksiByDate,
  getAllDetailTransaksiByMonth,
} from "./fragments/ApiHandler";
import { columns } from "./fragments/dataTable";

// buat komponen index
export default function index() {
  // buat state
  const [loading, setLoading] = useState(false);
  const [dataMenu, setDataMenu] = useState([]); // state untuk data menu
  const [totalPendapatan, setTotalPendapatan] = useState(null); // state untuk total pendapatan

  // fungsi untuk mengambil data menu berdasarkan bulan
  const getDataByMonth = async (month) => {
    setLoading(true);
    const res = await getAllDetailTransaksiByMonth(month);
    setDataMenu(res.data);
    setTotalPendapatan(res.total_keseluruhan);
    setLoading(false);
  };

  // fungsi untuk mengambil data menu berdasarkan tanggal
  const getDataByDate = async (date) => {
    setLoading(true);
    const res = await getAllDetailTransaksiByDate(date);
    setDataMenu(res.data);
    setTotalPendapatan(res.total_keseluruhan);
    setLoading(false);
  };

  return (
    <Container>
      {/* memanggil komponen heading */}
      <Heading text="Kelola Laporan Transaksi" />
      <Flex
        gap={{ base: 2, md: 5 }}
        w={{ base: "full", md: "50%" }}
        flexDir={{ base: "column", md: "row" }}
        mt={{ base: 2, md: 5 }}
      >
        <Flex direction="column" w={"full"}>
          <Text fontSize={"sm"} fontFamily={"Poppins"}>
            Filter Bulan
          </Text>
          <Select
            placeholder="Pilih Bulan"
            size="sm"
            borderRadius="lg"
            focusBorderColor="green.600"
            onChange={(e) => {
              getDataByMonth(e.target.value);
            }}
          >
            {/* menampilkan opsi bulan */}
            <option value="1">Januari</option>
            <option value="2">Februari</option>
            <option value="3">Maret</option>
            <option value="4">April</option>
            <option value="5">Mei</option>
            <option value="6">Juni</option>
            <option value="7">Juli</option>
            <option value="8">Agustus</option>
            <option value="9">September</option>
            <option value="10">Oktober</option>
            <option value="11">November</option>
            <option value="12">Desember</option>
          </Select>
        </Flex>
        <Flex direction="column" w={"full"}>
          <Text fontSize={"sm"} fontFamily={"Poppins"}>
            Filter Tanggal
          </Text>
          <Input
            placeholder="Cari Transaksi"
            borderRadius="lg"
            focusBorderColor="green.600"
            size="sm"
            type={"date"}
            onChange={(e) => {
              getDataByDate(e.target.value);
            }}
          />
        </Flex>
      </Flex>
      <Box my={10} maxW={"100%"}>
        {/*  jika loading true, maka tampilkan progress bar, jika loading false maka tampilkan table */}
        {loading ? (
          <Progress size="xs" isIndeterminate />
        ) : (
          <Box w={"100%"}>
            {
              // jika totalPendapatan tidak null, maka tampilkan total pendapatan
              totalPendapatan && (
                <Text fontSize={"sm"} fontFamily={"Poppins"} mb={2}>
                  Total Pendapatan : Rp. {totalPendapatan}
                </Text>
              )
            }
            <Table
              columns={columns}
              data={dataMenu?.map((item, index) => {
                return {
                  ...item,
                  key: index,
                };
              })}
              pagination={{
                position: ["bottomRight"],
                defaultPageSize: 3,
                showSizeChanger: true,
                pageSizeOptions: ["3", "5", "10"],
                showTotal: (total, range) =>
                  `${range[0]}-${range[1]} dari ${total} items`,
              }}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}
