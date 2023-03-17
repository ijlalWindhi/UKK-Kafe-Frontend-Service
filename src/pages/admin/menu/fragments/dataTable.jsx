import React from "react";
import ActionButton from "./ActionButton";
import { Text, Image } from "@chakra-ui/react";
import { BASE_API_IMAGE } from "../../../../utils/constants";
import { formatUang } from "../../../../utils/helper/formatUang";

const columns = [
  {
    title: "Nama Menu",
    dataIndex: "nama_menu",
    key: "nama_menu",
    width: "15%",
  },
  {
    title: "Jenis",
    dataIndex: "jenis",
    key: "jenis",
    width: "15%",
  },
  {
    title: "Harga",
    dataIndex: "harga",
    key: "harga",
    width: "15%",
    render: (data) => <span>{`Rp ${formatUang(data)}`}</span>,
  },
  {
    title: "Deskripsi",
    dataIndex: "deskripsi",
    key: "deskripsi",
    width: "15%",
    render: (data) => (
      <Text noOfLines={2} fontSize="sm">
        {data}
      </Text>
    ),
  },
  {
    title: "Gambar",
    dataIndex: "gambar",
    key: "gambar",
    width: "15%",
    render: (foto) => (
      <Image
        src={`${BASE_API_IMAGE}/${foto}`}
        alt="foto makanan"
        h={24}
        w={24}
        objectFit={"cover"}
        objectPosition={"center"}
      />
    ),
  },
  {
    title: "Aksi",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <ActionButton payload={data.id_menu} reload={data.reload} />
    ),
  },
];

export { columns };
