// Desc: Halaman Detail Transaksi
// import library yang dibutuhkan
import React, { useEffect, useState, useRef } from "react";
import {
  Text,
  Input,
  Flex,
  Grid,
  GridItem,
  Select,
  Box,
} from "@chakra-ui/react";
import Container from "../../../components/container/Container";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import {
  getTransaksiById,
  getDetailTransaksiByIdTransaksi,
} from "./fragments/ApiHandler";
import { jsPDF } from "jspdf";

// buat komponen index
export default function index() {
  // deklarasi variabel
  const navigate = useNavigate();
  const { id } = useParams();
  const { register, reset } = useForm();
  const [transaksi, setTransaksi] = useState([]);
  const [kolomMenu, setKolomMenu] = useState([]);
  const pdfRef = useRef(); // ref untuk komponen pdf

  // fungsi untuk mengambil data transaksi berdasarkan id
  const getTransaksi = async () => {
    const res = await getTransaksiById(id);
    const resDetailTransaksi = await getDetailTransaksiByIdTransaksi(id);
    setTransaksi(res.data);
    setKolomMenu(resDetailTransaksi.data);
  };

  // fungsi untuk handle download pdf
  const handleDownload = () => {
    const content = pdfRef.current;

    const doc = new jsPDF({
      orientation: "portrait",
      unit: "px",
    });
    doc.html(content, {
      callback: function (doc) {
        doc.save("laporanTransaksi.pdf");
      },
      html2canvas: {
        scale: 0.5,
      },
    });
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

  useEffect(() => {
    setTimeout(() => {
      handleDownload();
      navigate(`/dashboard/kasir/transaksi/${id}`);
    }, 1500);
  }, [kolomMenu]);

  return (
    <Container>
      <Box ref={pdfRef}>
        <h1 style={{ width: "300px", fontWeight: "bold", fontSize: "20px" }}>
          Laporan Pemesanan
        </h1>
        <Grid
          templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
          gap={10}
          my={6}
        >
          <GridItem>
            <Flex direction="column">
              <Text
                fontSize={"sm"}
                fontFamily={"Poppins"}
                style={{ marginBottom: "10px" }}
              >
                Tanggal Transaksi
              </Text>
              <Input
                name="tgl_transaksi"
                id="tgl_transaksi"
                borderRadius="lg"
                focusBorderColor="green.600"
                placeholder="Tanggal Transaksi"
                {...register("tgl_transaksi")}
                isReadOnly
                style={{ width: "200px" }}
              />
            </Flex>
            <Flex direction="column" my={4}>
              <Text
                fontSize={"sm"}
                fontFamily={"Poppins"}
                style={{ marginBottom: "10px" }}
              >
                Status Pembayaran
              </Text>
              <Select
                name="status"
                id="status"
                borderRadius="lg"
                focusBorderColor="green.600"
                placeholder="Status Pembayaran"
                {...register("status", {
                  required: true,
                })}
                style={{ width: "200px" }}
              >
                <option value="belum_bayar">Belum Bayar</option>
                <option value="lunas">Lunas</option>
              </Select>
            </Flex>
          </GridItem>
          <GridItem>
            <Flex direction="column" style={{ width: "200px" }}>
              <Text
                fontSize={"sm"}
                fontFamily={"Poppins"}
                style={{ marginBottom: "30px" }}
              >
                Nomor Meja
              </Text>
              <Input
                name="id_meja"
                id="id_meja"
                borderRadius="lg"
                focusBorderColor="green.600"
                placeholder="Nomor Meja"
                {...register("id_meja")}
                isReadOnly
              />
            </Flex>
            <Flex direction="column" style={{ width: "200px" }}>
              <Text
                fontSize={"sm"}
                fontFamily={"Poppins"}
                style={{ marginBottom: "30px" }}
              >
                Status Meja
              </Text>
              <Select
                name="status_meja"
                id="status_meja"
                borderRadius="lg"
                focusBorderColor="green.600"
                placeholder="Status Meja"
                {...register("status_meja", {
                  required: true,
                })}
              >
                <option value="terisi">Terisi</option>
                <option value="kosong">Kosong</option>
              </Select>
              {/* jika error type nya required, maka tampilkan pesan error */}
            </Flex>
          </GridItem>
          <GridItem>
            <Flex direction="column" style={{ width: "200px" }}>
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Nama Pelanggan
              </Text>
              <Input
                style={{ marginTop: "50px" }}
                name="nama_pelanggan"
                id="nama_pelanggan"
                borderRadius="lg"
                focusBorderColor="green.600"
                placeholder="Nama Pelanggan"
                {...register("nama_pelanggan", {
                  required: true,
                })}
              />
            </Flex>
          </GridItem>
        </Grid>
        <h1 style={{ width: "300px", fontWeight: "bold", fontSize: "20px" }}>
          Detail Pemesanan
        </h1>
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
                <h2
                  style={{
                    width: "150px",
                    fontSize: "14px",
                    marginBottom: "50px",
                  }}
                >
                  Nama Menu
                </h2>
                <Input
                  readOnly
                  value={row.menu.nama_menu}
                  style={{ width: "150px" }}
                />
              </Flex>
              <Flex direction="column">
                <h2
                  style={{
                    width: "150px",
                    fontSize: "14px",
                    marginBottom: "50px",
                  }}
                >
                  Harga
                </h2>
                <Input
                  readOnly
                  value={row.menu.harga}
                  style={{ width: "150px" }}
                />
              </Flex>
              <Flex direction="column">
                <h2
                  style={{
                    width: "150px",
                    fontSize: "14px",
                    marginBottom: "50px",
                  }}
                >
                  Jumlah
                </h2>
                <Flex alignItems={"center"} gap={3}>
                  <Text fontSize={"md"}>
                    <Input
                      readOnly
                      value={row.jumlah}
                      style={{ width: "150px" }}
                    />
                  </Text>
                </Flex>
              </Flex>
              <Flex direction="column">
                <h2
                  style={{
                    width: "150px",
                    fontSize: "14px",
                    marginBottom: "50px",
                  }}
                >
                  Total Harga
                </h2>
                <Input readOnly value={row.harga} style={{ width: "150px" }} />
              </Flex>
            </Flex>
          ))}
          {/* jika kolom menu lebih dari 0, maka tampilkan total harga */}
          {kolomMenu.length > 0 && (
            <h1
              style={{ width: "300px", fontWeight: "bold", fontSize: "20px" }}
            >
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
            </h1>
          )}
        </Flex>
      </Box>
    </Container>
  );
}
