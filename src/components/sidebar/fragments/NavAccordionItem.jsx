import { Button, Icon, Text, Box } from "@chakra-ui/react";
import React from "react";
import { NavLink, useLocation } from "react-router-dom";

export default function NavAccordionItem({
  label,
  path,
  icon,
  isOpen,
  onClose,
  onOpen,
}) {
  const location = useLocation();
  const active = path == location.pathname;

  return (
    <NavLink to={path}>
      <Button
        transition="200ms"
        my={[1, 2, 3]}
        pl={{ md: 10 }}
        pr={0}
        fontWeight={500}
        justifyContent={"flex-start"}
        alignItems="center"
        w={"full"}
        _hover={{ color: "primary.100" }}
        bg={active ? "gray.100" : "white"}
        color={active ? "primary.100" : "gray.500"}
        borderRadius="0"
        position={"relative"}
        onClick={isOpen ? onClose : onOpen}
      >
        <Icon as={icon} w={{ base: 4, lg: 3.5 }} h={{ base: 4, lg: 3.5 }} />
        <Text fontSize={"sm"} fontWeight={"normal"} maxW={"100%"} ml={4}>
          {label}
        </Text>
        <Box
          display={active ? "block" : "none"}
          h={"full"}
          w={2}
          borderRadius={"10px 0 0 10px"}
          bgColor={"primary.100"}
          position={"absolute"}
          right={0}
        />
      </Button>
    </NavLink>
  );
}
