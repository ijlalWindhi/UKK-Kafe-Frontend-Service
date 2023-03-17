// import library yang dibutuhkan
import axios from "axios";
import { BASE_API } from "../../../../utils/constants";
import { getLocalStorage } from "../../../../utils/helper/localStorage";
import { LOCAL_STORAGE_TOKEN } from "../../../../utils/constants";

// fungsi untuk mengambil semua data menu
export const getAllMenu = async () => {
  // url untuk mengambil semua data menu
  const URL = `${BASE_API}/menu/getAllData`;
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
      // mengembalikan data menu
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
      message: err.response,
    });
  }
};

// fungsi untuk mengambil data menu berdasarkan id
export const getMenuById = async (id) => {
  // url untuk mengambil data menu berdasarkan id
  const URL = `${BASE_API}/menu/getById/${id}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.get(URL, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data menu
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

// fungsi untuk mengambil data menu berdasarkan nama
export const searchMenu = async (value) => {
  // url untuk mengambil data menu berdasarkan nama
  const URL = `${BASE_API}/menu/search/${value}`;
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
      // mengembalikan data menu
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

// fungsi untuk mengambil data menu
export const addMenu = async (values) => {
  // url untuk menambahkan data menu
  const URL = `${BASE_API}/menu/create`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.post(URL, values, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      return Promise.resolve({
        status: "success",
        message: "Berhasil menambahkan menu",
        data: res.data,
      });
    }
  } catch (err) {
    // jika terjadi error
    // mengembalikan error
    return Promise.resolve({
      status: "error",
      message: err.response,
    });
  }
};

// fungsi untuk mengambil data menu berdasarkan id
export const updateMenu = async ({ values, id }) => {
  // url untuk mengubah data menu berdasarkan id
  const URL = `${BASE_API}/menu/edit/${id}`;
  // melakukan request ke server
  try {
    // melakukan request ke server
    const data = await axios.patch(URL, values, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data menu
      return Promise.resolve({
        status: "success",
        message: "Berhasil mengubah menu",
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

// fungsi untuk menghapus data menu berdasarkan id
export const deleteMenu = async (id) => {
  // url untuk menghapus data menu berdasarkan id
  const URL = `${BASE_API}/menu/delete/${id}`;
  try {
    // melakukan request ke server
    const data = await axios.delete(URL, {
      headers: {
        Authorization: `Bearer ${getLocalStorage(LOCAL_STORAGE_TOKEN)}`, // mengambil token dari local storage
      },
    });
    // mengambil data dari response
    const res = data.data;

    // jika status response adalah success
    if (res.status === "success") {
      // mengembalikan data menu
      return Promise.resolve({
        status: "success",
        message: "Berhasil menghapus menu",
        data: res.data.id_user,
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
