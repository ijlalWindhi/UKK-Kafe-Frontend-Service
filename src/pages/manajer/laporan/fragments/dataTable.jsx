import React from "react";

const columns = [
  {
    title: "Nama Pelanggan",
    width: "15%",
    dataIndex: "transaksi",
    key: "transaksi",
    render: (data) => <span>{data?.nama_pelanggan}</span>,
  },
  {
    title: "Status",
    dataIndex: "transaksi",
    key: "transaksi",
    width: "15%",
    render: (data) => <span>{data?.status}</span>,
  },
  {
    title: "Tanggal Transaksi",
    dataIndex: "transaksi",
    key: "transaksi",
    width: "15%",
    render: (data) => (
      <span>
        {new Date(data?.tgl_transaksi).toLocaleDateString("id-ID", {
          day: "numeric",
          month: "long",
          year: "numeric",
        })}
      </span>
    ),
  },
  {
    title: "Pendapatan",
    dataIndex: "pendapatan",
    key: "pendapatan",
    width: "15%",
  },
];

export { columns };
