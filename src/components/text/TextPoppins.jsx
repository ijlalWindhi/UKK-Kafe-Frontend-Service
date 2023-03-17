// import library yang dibutuhkan
import React from "react";
import { Text } from "@chakra-ui/react";

// buat komponen TextPoppins
export default function TextPoppins({
  text,
  fontWeight,
  fontSize,
  marginBottom,
  marginTop,
  color,
}) {
  return (
    <Text
      fontFamily={"Poppins"}
      fontWeight={fontWeight} // set font weight dari props
      fontSize={fontSize} // set font size dari props
      mb={marginBottom} // set margin bottom dari props
      mt={marginTop} // set margin top dari props
      color={color} // set color dari props
    >
      {/* tampilkan text dari props */}
      {text}
    </Text>
  );
}
