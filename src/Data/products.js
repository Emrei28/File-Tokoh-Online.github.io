// src/data/products.js

const products = [
  {
    id: 1,
    name: "Monstera Deliciosa",
    category: "Indoor Plants",
    price: 150000,
    image: "https://images.unsplash.com/photo-1585598117791-876ce25c1884?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", // Ganti dengan URL gambar asli nanti
    description: "Tanaman tropis dengan daun lebar berlubang, cocok untuk dekorasi indoor.",
    care: {
      light: "Cahaya tidak langsung",
      water: "Siram saat tanah kering 2-3 cm",
      humidity: "Tinggi",
      potSize: "15-20 cm"
    }
  },
  {
    id: 2,
    name: "Sansevieria Trifasciata (Lidah Mertua)",
    category: "Indoor Plants",
    price: 75000,
    image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8TW9uc3RlcmElMjBEZWxpY2lvc2F8ZW58MHx8MHx8fDA%3D",
    description: "Tanaman yang sangat mudah dirawat, cocok untuk pemula. Dapat menyaring udara.",
    care: {
      light: "Toleran cahaya rendah hingga terang",
      water: "Siram sangat jarang, saat tanah kering",
      humidity: "Rendah",
      potSize: "10-12 cm"
    }
  },
  {
    id: 3,
    name: "Kaktus Opuntia",
    category: "Succulents & Cacti",
    price: 45000,
    image: "https://plus.unsplash.com/premium_photo-1669148911895-a95de51d09ca?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8TW9uc3RlcmElMjBEZWxpY2lvc2F8ZW58MHx8MHx8fDA%3D",
    description: "Jenis kaktus daun dayung, perawatan minim dan unik.",
    care: {
      light: "Cahaya matahari langsung",
      water: "Sangat jarang, saat tanah kering total",
      humidity: "Rendah",
      potSize: "8-10 cm"
    }
  },
  {
    id: 4,
    name: "Pothos Emas (Epipremnum Aureum)",
    category: "Indoor Plants",
    price: 60000,
    image: "https://images.unsplash.com/photo-1525310072745-f49212b5ac6d?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8Zmxvd2VyfGVufDB8fDB8fHww",
    description: "Tanaman merambat yang cantik dengan daun bercorak kuning emas.",
    care: {
      light: "Cahaya tidak langsung, toleran rendah",
      water: "Siram saat tanah kering",
      humidity: "Sedang",
      potSize: "12-15 cm"
    }
  },
  {
    id: 5,
    name: "Peace Lily (Spathiphyllum)",
    category: "Indoor Plants",
    price: 90000,
    image:  "https://images.unsplash.com/photo-1538998073820-4dfa76300194?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zmxvd2VyfGVufDB8fDB8fHww",
    care: {
      light: "Cahaya rendah hingga sedang",
      water: "Siram teratur, jaga tanah tetap lembab",
      humidity: "Tinggi",
      potSize: "12-15 cm"
    }
  },
];

export default products;