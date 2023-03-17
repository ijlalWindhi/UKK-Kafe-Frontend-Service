import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  Text,
  Icon,
} from "@chakra-ui/react";
import React from "react";
import NavAccordionItem from "./NavAccordionItem";

export default function NavAccordion({
  payload,
  heading,
  icon,
  isOpen,
  onClose,
  onOpen,
}) {
  return (
    <>
      <Accordion allowMultiple>
        <AccordionItem border="0">
          <AccordionButton
            _hover={{ color: "primary.100" }}
            bgColor={"white"}
            color={"gray.500"}
            my={[1, 2, 3]}
            px={[2, 3, 6]}
            justifyContent={"space-between"}
            alignItems="center"
            w={"full"}
            borderRadius="0"
          >
            <Box display={"flex"} alignItems={"center"}>
              <Icon
                as={icon}
                w={{ base: 4, lg: 3.5 }}
                h={{ base: 4, lg: 3.5 }}
              />
              <Text fontSize={"sm"} fontWeight={"normal"} ml={4}>
                {heading}
              </Text>
            </Box>
            <Box display={"flex"}>
              <AccordionIcon />
            </Box>
          </AccordionButton>
          <AccordionPanel
            transitionDuration={0}
            p={0}
            display={"flex"}
            flexDir={"column"}
          >
            {payload.map((item, index) => {
              return (
                <NavAccordionItem
                  key={index}
                  label={item.label}
                  path={item.path}
                  icon={item.icon}
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                />
              );
            })}
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
}
