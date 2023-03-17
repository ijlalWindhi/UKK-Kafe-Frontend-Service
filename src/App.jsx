// import library yang dibutuhkan
import React from "react";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import PublicRoutes from "./utils/routes/PublicRoutes";
import ProtectedRoutes from "./utils/routes/ProtectedRoutes";
import Layout from "./components/layout/Layout";
import {
  Login,
  AdminDashboard,
  AdminUser,
  AdminMeja,
  AdminMenu,
  KasirDashboard,
  KasirTransaksi,
  KasirTransaksiDetail,
  KasirTambahTransaksi,
  KasirTransaksiDetailCetak,
  ManajerDashboard,
  ManajerTransaksi,
  ManajerTransaksiDetail,
  ManajerMenu,
  ManajerLaporan,
} from "./pages";

// buat rute
const router = createBrowserRouter(
  // buat rute dari element
  createRoutesFromElements(
    <>
      {/* rute utama */}
      <Route path="/" element={<ProtectedRoutes />}>
        {/* auto redirect ke halaman login */}
        <Route path="/" element={<Navigate to="/login" />} />
        {/* rute untuk role admin */}
        <Route path="/dashboard/admin" element={<Layout />}>
          {/* rute dashboard */}
          <Route index element={<AdminDashboard />} />
          {/* rute user */}
          <Route path="user" element={<AdminUser />} />
          {/* rute meja */}
          <Route path="meja" element={<AdminMeja />} />
          {/* rute menu */}
          <Route path="menu" element={<AdminMenu />} />
        </Route>
        {/* rute untuk role kasir */}
        <Route path="/dashboard/kasir" element={<Layout />}>
          {/* rute dashboard */}
          <Route index element={<KasirDashboard />} />
          {/* rute transaksi */}
          <Route path="transaksi" element={<KasirTransaksi />} />
          {/* rute tambah transaksi */}
          <Route path="tambah-transaksi" element={<KasirTambahTransaksi />} />
          {/* rute detail transaksi */}
          <Route path="transaksi/:id" element={<KasirTransaksiDetail />} />
        </Route>
        {/* rute untuk role manajer */}
        <Route path="/dashboard/manajer" element={<Layout />}>
          {/* rute dashboard */}
          <Route index element={<ManajerDashboard />} />
          {/* rute transaksi */}
          <Route path="transaksi" element={<ManajerTransaksi />} />
          {/* rute detail transaksi */}
          <Route path="transaksi/:id" element={<ManajerTransaksiDetail />} />
          {/* rute menu */}
          <Route path="menu" element={<ManajerMenu />} />
          {/* rute laporan */}
          <Route path="laporan" element={<ManajerLaporan />} />
        </Route>
      </Route>
      {/* rute login */}
      <Route path="login" element={<PublicRoutes />}>
        {/* halaman login */}
        <Route index element={<Login />} />
      </Route>
      {/* rute cetak transaksi */}
      <Route
        path="/dashboard/kasir/transaksi/:id/cetak"
        element={<KasirTransaksiDetailCetak />}
      />
    </>
  )
);

// buat komponen utama
export default function App() {
  /* berikan router ke provider */
  return <RouterProvider router={router} />;
}
