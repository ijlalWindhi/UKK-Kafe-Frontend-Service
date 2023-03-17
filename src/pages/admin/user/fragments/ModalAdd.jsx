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
  InputGroup,
  InputRightElement,
  IconButton,
  Select,
  Button,
  Heading,
  FormHelperText,
  Box,
  Flex,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { addPengguna } from "./ApiHandler";
import AlertNotification from "../../../../components/alert";
import { Eye, EyeOff } from "react-feather";

// buat komponen ModalAdd
export default function ModalAdd({ isOpen, onClose, reload }) {
  // buat state
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [show, setShow] = useState(false);
  const handleClick = () => setShow(!show);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // fungsi untuk menambahkan pengguna
  const submitHandler = async (values) => {
    // set loading menjadi true
    setIsLoading(true);

    // panggil fungsi addPengguna
    const res = await addPengguna(values);
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
          <Heading fontSize={20}>Tambah Pengguna</Heading>
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
                  <InputGroup size="md">
                    <Input
                      type={show ? "text" : "password"} // tampilkan password jika state show true dan sebaliknya
                      name="password"
                      id="password"
                      borderRadius="lg"
                      focusBorderColor="green.600"
                      placeholder="Password"
                      {...register("password", {
                        required: true,
                      })}
                    />
                    <InputRightElement>
                      <IconButton
                        borderRadius="full"
                        size="sm"
                        variant="ghost"
                        mr={[2, 6, 10]}
                        onClick={handleClick}
                        aria-label={"whod hide"}
                        icon={show ? <EyeOff /> : <Eye />} // tampilkan icon eye jika state show true dan sebaliknya
                      />
                    </InputRightElement>
                  </InputGroup>
                  {/* 
                    jika error type nya required, maka tampilkan pesan error
                  */}
                  {errors.password?.type === "required" && (
                    <FormHelperText textColor="red" mb={4}>
                      Masukkan password
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
