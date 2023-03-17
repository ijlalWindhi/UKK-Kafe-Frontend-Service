// import library yang dibutuhkan
import axios from "axios";
import {
  BASE_API,
  LOCAL_STORAGE_TOKEN,
  LOCAL_STORAGE_USER,
} from "../../../utils/constants";
import { setLocalStorage } from "../../../utils/helper/localStorage";

// fungsi untuk melakukan login
export default async function LoginHandler(values) {
  // url untuk melakukan login
  const LOGIN_URL = BASE_API + "/user/login";
  try {
    // melakukan request ke server
    const logindata = await axios.post(LOGIN_URL, values);
    // mengambil data dari response
    const res = logindata.data;

    // jika status response adalah success
    if (res.status === "success") {
      // menyimpan token dan data user ke local storage
      setLocalStorage(LOCAL_STORAGE_TOKEN, res.token);
      setLocalStorage(LOCAL_STORAGE_USER, res.data);

      // mengembalikan response
      return res;
    }

    // mengembalikan response
    return Promise.resolve({
      status: res.status, // status response
      message: res.message, // pesan response
    });
  } catch (err) {
    // jika terjadi error mengembalikan response
    return Promise.resolve({
      status: "error", // status response
      message: err.response?.data?.message, // pesan response
    });
  }
}
