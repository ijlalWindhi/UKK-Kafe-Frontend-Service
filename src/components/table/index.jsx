// import library yang dibutuhkan
import React from "react";
import { Table } from "antd";

// buat komponen index
export default function index({ data, columns, pagination }) {
  return (
    <Table
      columns={columns} // set columns dari props
      dataSource={data} // set data dari props
      pagination={pagination} // set pagination dari props
      scroll={{
        x: 500, // set scroll x
      }}
    />
  );
}
