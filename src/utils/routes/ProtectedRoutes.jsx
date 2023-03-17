// import library yang dibutuhkan
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../helper/localStorage";
import { LOCAL_STORAGE_TOKEN, LOCAL_STORAGE_USER } from "../constants";
import AdminLayout from "../../components/layout/Layout";

// buat komponen ProtectedRoutes
const userAuth = () => {
  // ambil token dari local storage
  const token = getLocalStorage(LOCAL_STORAGE_TOKEN);
  // ambil user dari local storage
  const user = getLocalStorage(LOCAL_STORAGE_USER);
  // jika token ada maka kembalikan token dan user
  if (token) {
    return {
      token: token,
      user: user.role,
    };
  }
  // jika tidak ada maka kembalikan false
  else {
    return false;
  }
};

// buat komponen ProtectedRoutes
const ProtectedRoutes = () => {
  // ambil token dari fungsi userAuth
  const { token } = userAuth();
  // jika token ada maka kembalikan layout admin
  return token ? (
    <Outlet render={(props) => <AdminLayout {...props} />} />
  ) : (
    // jika tidak ada maka kembalikan ke halaman login
    <Navigate to="/login" />
  );
};

// export komponen ProtectedRoutes
export default ProtectedRoutes;
