import React from "react";
import { Icon, Button, Text, Tooltip } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { MdLogout } from "react-icons/md";
import { clearLocalStorage } from "../../../utils/helper/localStorage";

export default function Logout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    clearLocalStorage();
    navigate("/login");
  };

  return (
    <Button
      transition="200ms"
      my={[1, 2, 3]}
      px={[2, 3, 6]}
      fontWeight={500}
      justifyContent={"flex-start"}
      alignItems="center"
      w={"full"}
      _hover={{ color: "green.500", borderColor: "transparent" }}
      bg={"white"}
      color={"gray.500"}
      borderRadius="0"
      position={"relative"}
      onClick={() => handleLogout()}
    >
      <Icon as={MdLogout} w={{ base: 4, lg: 3.5 }} h={{ base: 4, lg: 3.5 }} />
      <Text fontSize={"sm"} fontWeight={"normal"} ml={4}>
        Logout
      </Text>
    </Button>
  );
}
