// import library yang dibutuhkan
import axios from "axios";
import { BASE_API } from "../../../../utils/constants";
import { getLocalStorage } from "../../../../utils/helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../../../utils/constants";

// fungsi untuk mengambil semua data detail transaksi
export const getAllDetailTransaksi = async () => {
  // url untuk mengambil semua data detail transaksi
  const URL = `${BASE_API}/detail_transaksi/getMenu`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
      // menambahkan header Authorization
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data detail transaksi
      return Promise.resolve({
        status: "success",
        data: res.data,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response.data.message,
    });
  }
};
