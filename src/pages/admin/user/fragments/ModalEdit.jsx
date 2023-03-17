// import library yang dibutuhkan
import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  Container,
  FormControl,
  Input,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
  Select,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { updatePengguna, getPenggunaById } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, payload, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [pengguna, setPengguna] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fungsi untuk menambahkan pengguna
  const submitHandler = async (values) => {
    setIsLoading(true);
    // membuat object value untuk menampung data yang akan diupdate
    let value = {};
    // jika nama_user yang diinputkan tidak sama dengan nama_user yang ada di database maka tambahkan nama_user ke object value
    if (pengguna.nama_user !== values?.nama_user) {
      value.nama_user = values?.nama_user;
    }
    // jika role yang diinputkan tidak sama dengan role yang ada di database maka tambahkan role ke object value
    if (pengguna.role !== values?.role) {
      value.role = values?.role;
    }
    // jika password yang diinputkan tidak sama dengan password yang ada di database maka tambahkan password ke object value
    if (pengguna.password !== values?.password) {
      value.password = values?.password;
    }
    // jika username yang diinputkan tidak sama dengan username yang ada di database maka tambahkan username ke object value
    if (pengguna.username !== values?.username) {
      value.username = values?.username;
    }

    // panggil fungsi updatePengguna
    const res = await updatePengguna({ values: value, id: payload });
    // set message dan status dari respon
    setMessage(res.message);
    setStatus(res.status);
    // jika status respon adalah success
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

  // fungsi untuk menutup modal
  const handleClose = () => {
    reset();
    onClose();
  };

  // useEffect untuk mengambil data pengguna berdasarkan id
  useEffect(() => {
    if (pengguna) {
      reset({
        nama_user: pengguna.nama_user,
        username: pengguna.username,
        role: pengguna.role,
      });
    }
  }, [pengguna]);

  // useEffect untuk mengambil data pengguna berdasarkan id
  useEffect(() => {
    const getPengguna = async () => {
      const res = await getPenggunaById(payload);
      setPengguna(res.data);
    };
    getPengguna();
  }, [payload]);

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
          <Heading fontSize={20}>Tambah Pengguna</Heading>
          <Box mt={4}>
            <AlertNotification status={status} message={message} />
          </Box>
          <FormControl method="POST">
            <Container gridTemplateRows="repeat(2,1fr)" p={0} my={6}>
              <Grid templateColumns="repeat(2, 1fr)" gap={5} my={3}>
                <Flex direction="column">
                  <Input
                    name="nama_user"
                    id="nama_user"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Nama"
                    {...register("nama_user", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.nama_user?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan nama
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Select
                    name="role"
                    id="role"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Role"
                    {...register("role", {
                      required: true,
                    })}
                  >
                    <option value="admin">admin</option>
                    <option value="kasir">kasir</option>
                    <option value="manajer">manajer</option>
                  </Select>
                  {errors.role?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan role
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"username"}
                    name="username"
                    id="username"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Username"
                    {...register("username", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.username?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan username
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"password"}
                    name="password"
                    id="password"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Password"
                    {...register("password")}
                  />
                </Flex>
              </Grid>
            </Container>
            <Button
              variant="outline"
              colorScheme={"green"}
              fontWeight={500}
              px={6}
              borderRadius="lg"
              // ketika tombol batal diklik maka akan menjalankan fungsi handleClose
              onClick={handleClose}
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
              // ketika tombol submit diklik maka akan menjalankan fungsi submitHandler
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
