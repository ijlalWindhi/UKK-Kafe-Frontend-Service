// import library yang dibutuhkan
import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { getLocalStorage } from "../helper/localStorage";
import { LOCAL_STORAGE_USER } from "../constants";

// buat komponen ProtectedRoutes
const userAuth = () => {
  // ambil user dari local storage
  const user = getLocalStorage(LOCAL_STORAGE_USER);
  // jika user ada maka kembalikan role dan auth
  if (user) {
    return {
      role: user.role,
      auth: true,
    };
  }
  // jika tidak ada maka kembalikan false
  else {
    return {
      role: null,
      auth: false,
    };
  }
};

// buat komponen ProtectedRoutes
export default function PublicRoutes() {
  // ambil token dan role dari fungsi userAuth
  const { auth, role } = userAuth();
  return (
    <>
      {/* 
        jika auth true dan role admin maka kembalikan ke halaman dashboard admin
      */}
      {auth ? (
        role === "admin" ? (
          <Navigate to="/dashboard/admin/" />
        ) : // jika auth true dan role manajer maka kembalikan ke halaman dashboard manajer
        role === "manajer" ? (
          <Navigate to="/dashboard/manajer/" />
        ) : (
          // jika auth true dan role kasir maka kembalikan ke halaman dashboard kasir
          <Navigate to="/dashboard/kasir/" />
        )
      ) : (
        // jika auth false maka kembalikan ke halaman login
        <Outlet />
      )}
    </>
  );
}
