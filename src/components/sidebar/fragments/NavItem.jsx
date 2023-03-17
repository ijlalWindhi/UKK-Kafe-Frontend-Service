import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { Icon, Button, Text, Box } from "@chakra-ui/react";

export default function NavItem({
  label,
  link,
  icon,
  isOpen,
  onClose,
  onOpen,
}) {
  const location = useLocation();
  const active = location.pathname == link;
  return (
    <NavLink to={link} cursor="pointer">
      <Button
        transition="200ms"
        my={[1, 2, 3]}
        px={[2, 3, 6]}
        fontWeight={500}
        justifyContent={"flex-start"}
        alignItems="center"
        w={"full"}
        _hover={{ color: "green.600", borderColor: "transparent" }}
        bg={active ? "gray.100" : "white"}
        color={active ? "green.600" : "gray.500"}
        borderRadius="0"
        position={"relative"}
        onClick={isOpen ? onClose : onOpen}
      >
        <Icon as={icon} w={{ base: 4, md: 3.5 }} h={{ base: 4, md: 3.5 }} />
        <Text fontSize={"sm"} fontWeight={"normal"} ml={4}>
          {label}
        </Text>
        <Box
          display={active ? "block" : "none"}
          h={"full"}
          w={2}
          borderRadius={"10px 0 0 10px"}
          bgColor={"green.600"}
          position={"absolute"}
          right={0}
        />
      </Button>
    </NavLink>
  );
}
