// import library yang dibutuhkan
import React from "react";
import { Flex } from "@chakra-ui/react";
import Delete from "./action/Delete";
import Detail from "./action/Detail";

// buat komponen ActionButton
export default function ActionButton({ payload, reload }) {
  return (
    <Flex dir="row" gap={3}>
      {/* set payload dan reload ke komponen Delete dan Detail */}
      <Delete payload={payload} reload={reload} />
      <Detail payload={payload} reload={reload} />
    </Flex>
  );
}
