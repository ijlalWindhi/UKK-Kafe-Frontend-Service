// import library yang dibutuhkan
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  Container,
  FormControl,
  Input,
  Select,
  Text,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { addTransaksi, getMejaByStatus, updateStatusMeja } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, reload, user }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [dataMeja, setDataMeja] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // ambil data meja
  const getDataMeja = async () => {
    const res = await getMejaByStatus("kosong");
    setDataMeja(res.data);
  };

  // fungsi untuk menambahkan meja
  const submitHandler = async (values) => {
    // set loading menjadi true
    setIsLoading(true);
    const value = {
      ...values,
      id_user: user.id_user,
    };

    // panggil fungsi addTransaksi
    const res = await addTransaksi(value);
    await updateStatusMeja(values.id_meja, { status: "terisi" });
    // set message dan status dari respon
    setMessage(res.message);
    setStatus(res.status);

    // // jika status respon adalah success
    if (res.status === "success") {
      // set loading menjadi false dan reset form setelah 500ms
      setTimeout(() => {
        onClose(), reset(), setStatus(""), setMessage(""), reload();
        setIsLoading(false);
      }, 500);
      return;
    }
    // jika status respon bukan success
    else {
      // set loading menjadi false dan reset form setelah 1000ms
      setTimeout(() => {
        setIsLoading(false), setMessage(""), setStatus("");
      }, 1000);
    }
  };

  // ambil data meja ketika komponen pertama kali di render
  React.useEffect(() => {
    getDataMeja();
  }, [
    // jika dataMeja berubah maka ambil data meja kembali
    message,
  ]);

  // fungsi untuk menutup modal
  const handleClose = () => {
    reset();
    onClose();
  };

  return (
    <Modal
      onClose={onClose}
      isOpen={isOpen}
      isCentered
      blockScrollOnMount={false}
      motionPreset="scale"
      size={{ base: "sm", md: "xl" }}
    >
      <ModalOverlay />
      <ModalContent borderRadius="20px">
        <ModalBody p={8}>
          <Heading fontSize={20}>Tambah Transaksi</Heading>
          <Box mt={4}>
            {/* 
              jika status respon bukan success, maka tampilkan alert
            */}
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
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
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.nama_pelanggan?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Nama Pelanggan
                    </FormHelperText>
                  )}
                </Flex>
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
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.status?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Status
                    </FormHelperText>
                  )}
                </Flex>
              </Grid>
            </Container>
            <Button
              variant="outline"
              colorScheme={"green"}
              fontWeight={500}
              px={6}
              borderRadius="lg"
              onClick={handleClose} // panggil fungsi handleClose untuk menutup modal dan mereset form saat tombol batal diklik
            >
              Batal
            </Button>
            <Button
              type="submit"
              ml={4}
              px={6}
              colorScheme={"green"}
              borderRadius="lg"
              fontWeight={500}
              // panggil fungsi handleSubmit dan submitHandler saat tombol tambah diklik
              onClick={handleSubmit(async (values) => {
                await submitHandler(values);
              })}
              isLoading={isLoading}
            >
              Tambah
            </Button>
          </FormControl>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
