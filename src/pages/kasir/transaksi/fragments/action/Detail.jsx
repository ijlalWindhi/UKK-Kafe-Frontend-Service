// import library yang dibutuhkan
import { IconButton } from "@chakra-ui/react";
import { Eye } from "react-feather";
import { Link } from "react-router-dom";

// buat komponen detail
export default function Detail({ payload }) {
  return (
    // membuat link ke halaman detail transaksi
    <Link to={`/dashboard/kasir/transaksi/${payload.id_transaksi}`}>
      {/* set onOpen ke komponen IconButton */}
      <IconButton
        aria-label="detail"
        icon={<Eye />}
        colorScheme="blue"
      />
    </Link>
  );
}
