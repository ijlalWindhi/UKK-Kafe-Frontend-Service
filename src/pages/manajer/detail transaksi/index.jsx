// Desc: Halaman Detail Transaksi
// import library yang dibutuhkan
import React, { useEffect, useState } from "react";
import {
  Text,
  Input,
  Flex,
  Grid,
  GridItem,
  InputGroup,
  InputLeftElement,
} from "@chakra-ui/react";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import {
  getTransaksiById,
  getDetailTransaksiByIdTransaksi,
} from "./fragments/ApiHandler";
import { formatUang } from "../../../utils/helper/formatUang";

// buat komponen index
export default function index() {
  // deklarasi variabel
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    register,
    formState: { errors },
    reset,
  } = useForm();
  const [transaksi, setTransaksi] = useState([]);
  const [kolomMenu, setKolomMenu] = useState([]);

  // fungsi untuk mengambil data transaksi berdasarkan id
  const getTransaksi = async () => {
    const res = await getTransaksiById(id);
    const resDetailTransaksi = await getDetailTransaksiByIdTransaksi(id);
    setTransaksi(res.data);
    setKolomMenu(resDetailTransaksi.data);
  };

  // fungsi untuk memasukan data ke dalam form
  useEffect(() => {
    if (transaksi) {
      const tgl_transaksi = new Date(
        transaksi?.tgl_transaksi
      ).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "long",
        year: "numeric",
      }); // mengubah format tanggal menjadi tanggal lokal indonesia
      reset({
        tgl_transaksi: tgl_transaksi,
        id_meja: transaksi?.meja?.nomor_meja,
        nama_pelanggan: transaksi?.nama_pelanggan,
        status: transaksi?.status,
        status_meja: transaksi?.meja?.status,
      });
    }
  }, [transaksi]);

  // ambil data menu ketika komponen pertama kali di render
  useEffect(() => {
    getTransaksi();
  }, []);

  return (
    <Container>
      <Text
        cursor={"pointer"}
        onClick={() => navigate("/dashboard/manajer/transaksi")}
        mb={4}
      >{`<-- Kembali Ke Transaksi`}</Text>
      <Heading text="Detail Transaksi" /> {/* memanggil komponen heading */}
      <Grid
        templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={10}
        my={6}
      >
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Tanggal Transaksi
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="green.600"
              placeholder="Tanggal Transaksi"
              {...register("tgl_transaksi")}
              isReadOnly
            />
          </Flex>
          <Flex direction="column" my={4}>
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Status Pembayaran
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="green.600"
              placeholder="Tanggal Transaksi"
              {...register("status")}
              isReadOnly
            />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Nomor Meja
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="green.600"
              placeholder="Nomor Meja"
              {...register("id_meja")}
              isReadOnly
            />
          </Flex>
          <Flex direction="column" my={4}>
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Status Meja
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="green.600"
              placeholder="Nomor Meja"
              {...register("status_meja")}
              isReadOnly
            />
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Nama Pelanggan
            </Text>
            <Input
              borderRadius="lg"
              focusBorderColor="green.600"
              placeholder="Nama Pelanggan"
              {...register("nama_pelanggan", {
                required: true,
              })}
              isReadOnly
            />
          </Flex>
        </GridItem>
      </Grid>
      <Heading text="Detail Pemesanan" /> {/* memanggil komponen heading */}
      <Flex flexDir={"column"}>
        {kolomMenu.map((row, indexRow) => (
          <Flex
            w={"full"}
            gap={10}
            my={6}
            alignItems={"flex-end"}
            key={indexRow}
          >
            <Flex direction="column">
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Nama Menu
              </Text>
              <Input readOnly value={row.menu.nama_menu} />
            </Flex>
            <Flex direction="column">
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Harga
              </Text>
              <InputGroup>
                <InputLeftElement children="Rp " />
                <Input readOnly value={formatUang(row.menu.harga)} />
              </InputGroup>
            </Flex>
            <Flex direction="column">
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Jumlah
              </Text>
              <Flex alignItems={"center"} gap={3}>
                <Text fontSize={"md"}>
                  <Input readOnly value={row.jumlah} />
                </Text>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Total Harga
              </Text>
              <InputGroup>
                <InputLeftElement children="Rp " />
                <Input readOnly value={formatUang(row.harga)} />
              </InputGroup>
            </Flex>
          </Flex>
        ))}
        {/* jika kolom menu lebih dari 0, maka tampilkan total harga */}
        {kolomMenu.length > 0 && (
          <Text fontSize={"md"} mb={2} fontFamily={"Poppins"}>
            Total Harga : Rp.
            {/* 
            menampilkan total harga dengan menggunakan fungsi reduce
            reduce adalah fungsi yang digunakan untuk mengurangi array menjadi satu nilai
            reduce akan menghitung total harga dari semua menu yang ada
          */}
            {kolomMenu.reduce((total, item) => {
              // total adalah nilai awal, item adalah nilai yang akan dihitung
              return total + item.harga;
            }, 0)}
          </Text>
        )}
      </Flex>
    </Container>
  );
}
