// Desc: Halaman Tambah Transaksi
// import library yang dibutuhkan
import React, { useEffect, useState } from "react";
import {
  Text,
  InputGroup,
  Input,
  InputLeftElement,
  Flex,
  Grid,
  GridItem,
  Select,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import Heading from "../../../components/text/Heading";
import Container from "../../../components/container/Container";
import { getAllMenu, addDetailTransaksi } from "./fragments/ApiHandler";
import {
  addTransaksi,
  updateStatusMeja,
  getMejaByStatus,
} from "../transaksi/fragments/ApiHandler";
import AlertNotification from "../../../components/alert";
import { getLocalStorage } from "../../../utils/helper/localStorage";
import { LOCAL_STORAGE_USER } from "../../../utils/constants";
import { formatUang } from "../../../utils/helper/formatUang";

// buat komponen index
export default function index() {
  // deklarasi variabel
  const navigate = useNavigate(); // untuk navigasi halaman
  const user = getLocalStorage(LOCAL_STORAGE_USER); // ambil data user dari local storage
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm(); // untuk form
  const [menu, setMenu] = useState([]);
  const [kolomMenu, setKolomMenu] = useState([]);
  const [dataMeja, setDataMeja] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [status, setStatus] = useState(null);

  // fungsi untuk mengambil data meja
  const getDataMeja = async () => {
    const res = await getMejaByStatus("kosong");
    setDataMeja(res.data);
  };

  // fungsi untuk mengambil data menu
  const getDataMenu = async () => {
    setLoading(true);
    const res = await getAllMenu();
    setMenu(res.data);
    setLoading(false);
  };

  // fungsi untuk handle submit transaksi
  const submitHandlerTransaksi = async (values) => {
    // set loading menjadi true
    setLoading(true);
    const value = {
      ...values, // memeberikan nilai pada value berdasarkan nilai pada values
      id_user: user.id_user,
    };

    // panggil fungsi addTransaksi
    const res = await addTransaksi(value);
    await updateStatusMeja(values.id_meja, { status: "terisi" });
    // panggil fungsi addTransaksi
    // promise untuk menunggu fungsi addDetailTransaksi selesai
    await new Promise((resolve) => {
      // looping data pada state kolomMenu
      for (let i = 0; i < kolomMenu.length; i++) {
        // deklarasi variabel value
        const value = {
          id_transaksi: res.data.id_transaksi,
          id_menu: kolomMenu[i].id_menu,
          jumlah: kolomMenu[i].jumlah,
          harga: kolomMenu[i].total_harga,
        };
        // panggil fungsi addDetailTransaksi
        addDetailTransaksi(value);
      }
      // resolve promise setelah looping selesai
      // resolve promise digunakan agar fungsi addDetailTransaksi selesai
      resolve();
    });
    // set message dan status dari respon
    setMessage(res.message);
    setStatus(res.status);

    // // jika status respon adalah success
    if (res.status === "success") {
      // set loading menjadi false dan reset form setelah 500ms
      setTimeout(() => {
        reset(),
          setStatus(""),
          setMessage(""),
          setLoading(false),
          navigate("/dashboard/kasir/transaksi");
      }, 500);
      return;
    }
    // jika status respon bukan success
    else {
      // set loading menjadi false dan reset form setelah 1000ms
      setTimeout(() => {
        setLoading(false), setMessage(""), setStatus("");
      }, 1000);
    }
  };

  // fungsi untuk mengubah data pada state kolomMenu
  const handleChange = (e, indexRow, type) => {
    // ambil value dari input
    const value = e?.target?.value;
    // ubah data pada state kolomMenu
    setKolomMenu((prev) =>
      // map data pada state kolomMenu untuk mengubah data
      prev.map((item, idx) => {
        // jika index data sama dengan indexRow
        if (idx === indexRow) {
          // jika type adalah jumlah
          if (type === "jumlah") {
            // ubah data jumlah dan total_harga
            if (item.jumlah < 0) {
              // jika jumlah kurang dari 0, maka jumlahnya menjadi 0
              item.jumlah = 0;
            } else {
              // jika jumlah lebih dari 0, maka jumlahnya menjadi value
              item.jumlah = e;
              // menghitung total harga dengan mengalikan harga dengan jumlah
              item.total_harga = item.harga * item.jumlah;
            }
          }
          // jika type bukan jumlah
          else {
            // ubah data nama_menu, id_menu, dan harga
            item.nama_menu = value;
            // cari data menu berdasarkan nama menu
            const menuNew = menu.find((item) => item.nama_menu === value);
            item.id_menu = menuNew.id_menu;
            item.harga = menuNew.harga;
          }
        }
        // kembalikan data
        return item;
      })
    );
  };

  // fungsi untuk menambahkan baris pada tabel menu
  const handleAddRow = () => {
    // tambahkan data baru ke dalam state kolomMenu
    setKolomMenu((prev) => [
      // ...prev untuk menambahkan data baru ke dalam array
      ...prev,
      // data baru yang akan ditambahkan
      {
        id_menu: "",
        nama_menu: "",
        harga: "",
        jumlah: 0,
        total_harga: 0,
      },
    ]);
  };

  // fungsi untuk menghapus baris pada tabel menu
  const handleDeleteRow = (index) => {
    // hapus data pada state kolomMenu berdasarkan index
    setKolomMenu((prev) => prev.filter((_, idx) => idx !== index));
  };

  // ambil data menu ketika komponen pertama kali di render
  useEffect(() => {
    getDataMeja(); // memanggil fungsi getDataMeja
    getDataMenu(); // memanggil fungsi getDataMenu
  }, []);

  return (
    <Container>
      <Text
        cursor={"pointer"}
        onClick={() => navigate("/dashboard/kasir/transaksi")}
        mb={4}
      >{`<-- Kembali Ke Transaksi`}</Text>
      <Heading text="Tambah Transaksi" /> {/* memanggil komponen heading */}
      <Button
        colorScheme={"green"}
        size={"sm"}
        w={{ md: "40%", lg: "30%", xl: "20%" }}
        mt={2}
        // panggil fungsi handleSubmit dan submitHandlerTransaksi saat tombol tambah diklik
        onClick={handleSubmit(async (values) => {
          await submitHandlerTransaksi(values);
        })}
        isLoading={loading}
      >
        Simpan Transaksi
      </Button>
      {/* menampilkan alert notifikasi */}
      <AlertNotification status={status} message={message} />
      <Grid
        templateColumns={{ md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" }}
        gap={10}
        my={6}
      >
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Nomor Meja
            </Text>
            <Select
              name="id_meja"
              id="id_meja"
              borderRadius="lg"
              focusBorderColor="green.600"
              placeholder="Nomor Meja"
              {...register("id_meja", {
                required: true,
              })}
            >
              {dataMeja.map((item, index) => (
                <option key={index} value={item.id_meja}>
                  {item.nomor_meja}
                </option>
              ))}
            </Select>
            {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
            {errors.id_meja?.type === "required" && (
              <FormHelperText textColor="red" mb={4}>
                Masukkan Nomor Meja
              </FormHelperText>
            )}
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
              Nama Pelanggan
            </Text>
            <Input
              name="nama_pelanggan"
              id="nama_pelanggan"
              borderRadius="lg"
              focusBorderColor="green.600"
              placeholder="Nama Pelanggan"
              {...register("nama_pelanggan", {
                required: true,
              })}
            />
            {/* jika error type nya required, maka tampilkan pesan error */}
            {errors.nama_pelanggan?.type === "required" && (
              <FormHelperText textColor="red" mb={4}>
                Masukkan Nama Pelanggan
              </FormHelperText>
            )}
          </Flex>
        </GridItem>
        <GridItem>
          <Flex direction="column">
            <Text fontSize={"sm"} fontFamily={"Poppins"}>
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
            >
              <option value="belum_bayar">Belum Bayar</option>
              <option value="lunas">Lunas</option>
            </Select>
            {/* jika error type nya required, maka tampilkan pesan error */}
            {errors.status?.type === "required" && (
              <FormHelperText textColor="red" mb={4}>
                Masukkan Status
              </FormHelperText>
            )}
          </Flex>
        </GridItem>
      </Grid>
      <Heading text="Detail Pemesanan" /> {/* memanggil komponen heading */}
      <Flex flexDir={"column"}>
        <Button
          colorScheme={"green"}
          size={"sm"}
          mt={4}
          w={{ md: "40%", lg: "30%", xl: "20%" }}
          onClick={() => {
            handleAddRow();
          }}
        >
          Tambah Menu
        </Button>
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
              <Select
                onChange={(e) => {
                  handleChange(e, indexRow, "menu");
                }}
                value={row.nama_menu}
                placeholder="Pilih Menu"
              >
                {menu.map((item) => (
                  <option value={item.nama_menu}>{item.nama_menu}</option>
                ))}
              </Select>
            </Flex>
            <Flex direction="column">
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Harga
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={"Rp "} />
                <Input readOnly value={formatUang(row.harga)} />
              </InputGroup>
            </Flex>
            <Flex direction="column">
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Jumlah
              </Text>
              <Flex alignItems={"center"} gap={3}>
                <Button
                  colorScheme={"blue"}
                  size={"md"}
                  onClick={() => {
                    handleChange(row.jumlah - 1, indexRow, "jumlah");
                  }}
                >
                  -
                </Button>
                <Text fontSize={"xl"} fontWeight={"semibold"}>
                  {row.jumlah}
                </Text>
                <Button
                  colorScheme={"blue"}
                  size={"md"}
                  onClick={() => {
                    handleChange(row.jumlah + 1, indexRow, "jumlah");
                  }}
                >
                  +
                </Button>
              </Flex>
            </Flex>
            <Flex direction="column">
              <Text fontSize={"sm"} fontFamily={"Poppins"}>
                Total Harga
              </Text>
              <InputGroup>
                <InputLeftElement pointerEvents="none" children={"Rp "} />
                <Input readOnly value={formatUang(row.total_harga)} />
              </InputGroup>
            </Flex>
            <Button
              colorScheme={"red"}
              size={"md"}
              onClick={() => {
                handleDeleteRow(indexRow);
              }}
            >
              Hapus
            </Button>
          </Flex>
        ))}
        {/* jika kolom menu lebih dari 0, maka tampilkan total harga */}
        {kolomMenu.length > 0 && (
          <Text fontSize={"md"} mb={2} fontFamily={"Poppins"}>
            Total Harga : Rp{" "}
            {/* 
            menampilkan total harga dengan menggunakan fungsi reduce
            reduce adalah fungsi yang digunakan untuk mengurangi array menjadi satu nilai
            reduce akan menghitung total harga dari semua menu yang ada
          */}
            {kolomMenu.reduce((total, item) => {
              // total adalah nilai awal, item adalah nilai yang akan dihitung
              return total + item.total_harga;
            }, 0)}
          </Text>
        )}
      </Flex>
    </Container>
  );
}
