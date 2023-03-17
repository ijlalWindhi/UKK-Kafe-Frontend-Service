// import library yang dibutuhkan
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  Grid,
  GridItem,
  Container,
  FormControl,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Select,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { addMenu } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  // fungsi untuk menambahkan meja
  const submitHandler = async (values) => {
    // set loading menjadi true
    setIsLoading(true);
    let form = new FormData();
    form.append("nama_menu", values.nama_menu);
    form.append("jenis", values.jenis);
    form.append("harga", values.harga.replace(/\./g, ""));
    form.append("deskripsi", values.deskripsi);
    form.append("gambar", values.foto[0]);

    if (
      values.foto[0].type !== "image/jpeg" &&
      values.foto[0].type !== "image/png" &&
      values.foto[0].type !== "image/jpg" &&
      values.foto[0].type !== "image/webp"
    ) {
      setMessage("File harus berupa gambar");
      setStatus("error");
      setTimeout(() => {
        setIsLoading(false), setMessage(""), setStatus("");
      }, 1000);
      return;
    }

    // panggil fungsi addMenu
    const res = await addMenu(form);
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
          <Heading fontSize={20}>Tambah Menu</Heading>
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
                  <Input
                    name="nama_menu"
                    id="nama_menu"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="Nama Menu"
                    {...register("nama_menu", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.nama_menu?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Nama Menu
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Select
                    name="jenis"
                    id="jenis"
                    borderRadius="lg"
                    focusBorderColor="green.600"
                    placeholder="jenis"
                    {...register("jenis", {
                      required: true,
                    })}
                  >
                    <option value="makanan">Makanan</option>
                    <option value="minuman">Minuman</option>
                  </Select>
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.jenis?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan jenis
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <InputGroup>
                    <InputLeftElement pointerEvents="none" children="Rp" />
                    <Input
                      name="harga"
                      id="harga"
                      borderRadius="lg"
                      focusBorderColor="green.600"
                      placeholder="Harga"
                      {...register("harga", { required: true })}
                      onChange={(event) => {
                        const { value } = event.target;
                        let nilaiBaru = value.replace(/\D/g, "");
                        nilaiBaru = nilaiBaru.replace(
                          /\B(?=(\d{3})+(?!\d))/g,
                          "."
                        );
                        setValue("harga", nilaiBaru);
                      }}
                    />
                  </InputGroup>
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.harga?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan Harga
                    </FormHelperText>
                  )}
                </Flex>
                <Flex direction="column">
                  <Input
                    type={"file"}
                    name="foto"
                    id="foto"
                    borderRadius="lg"
                    focusBorderColor="green.500"
                    placeholder="Foto"
                    {...register("foto", {
                      required: true,
                    })}
                  />
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.gambar?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan gambar
                    </FormHelperText>
                  )}
                </Flex>
                <GridItem colSpan={2}>
                  <Flex direction="column">
                    <Textarea
                      name="deskripsi"
                      id="deskripsi"
                      borderRadius="lg"
                      focusBorderColor="green.600"
                      placeholder="Deskripsi"
                      {...register("deskripsi", {
                        required: true,
                      })}
                    />
                    {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                    {errors.deskripsi?.type === "required" && (
                      <FormHelperText textColor="red" mb={4}>
                        Masukkan Deskripsi
                      </FormHelperText>
                    )}
                  </Flex>
                </GridItem>
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
