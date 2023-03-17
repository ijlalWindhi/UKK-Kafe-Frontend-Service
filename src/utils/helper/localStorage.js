// fungi untuk menyimpan data ke local storage
function setLocalStorage(key, value) {
  // jika value adalah object
  if (typeof value === "object") {
    // ubah value menjadi string
    value = JSON.stringify(value);
  }
  // menyimpan data ke local storage
  localStorage.setItem(key, value);
}

// fungsi untuk mengambil data dari local storage
function getLocalStorage(key) {
  // mengambil data dari local storage
  let value = localStorage.getItem(key);
  try {
    // jika value adalah object maka ubah menjadi object
    value = JSON.parse(value);
  } catch (e) {
    // jika value bukan object maka tetapkan
    value = value;
  }
  // mengembalikan value
  return value;
}

// fungsi untuk menghapus data dari local storage
function clearLocalStorage() {
  // menghapus semua data dari local storage
  localStorage.clear();
}

// mengexport fungsi
export { setLocalStorage, getLocalStorage, clearLocalStorage };
