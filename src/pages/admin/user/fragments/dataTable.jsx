import React from "react";
import ActionButton from "./ActionButton";

const columns = [
  {
    title: "Nama",
    dataIndex: "nama_user",
    key: "nama_user",
    width: "15%",
  },
  {
    title: "Username",
    dataIndex: "username",
    key: "username",
    width: "15%",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    width: "15%",
  },
  {
    title: "Aksi",
    key: "aksi",
    width: "15%",
    render: (data) => (
      <ActionButton payload={data.id_user} reload={data.reload} />
    ),
  },
];

export { columns };
