// src/components/ProductDetailPage.jsx
import React, { useState } from 'react'; // Import useState
import products from '../data/products';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Ikon hati terisi
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Ikon hati kosong


function ProductDetailPage({ productId, onAddToCart, navigateTo, favoriteItems, toggleFavorite}) {
  const product = products.find(p => p.id === productId);

  const [quantity, setQuantity] = useState(1);

  const isFavorite = favoriteItems.some(item => item.id === product?.id);

  // Jika produk tidak ditemukan
  if (!product) {
    return (
      <div className="container mx-auto p-4 md:p-8 mt-8 text-center text-red-600">
        Produk tidak ditemukan.
        <button
          onClick={() => navigateTo('home')}
          className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  // Fungsi untuk menangani perubahan quantity
  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) { // Pastikan quantity tidak kurang dari 1
      setQuantity(value);
    } else {
      setQuantity(1); // Set ke 1 jika inputnya 0 atau negatif
    }
  };

  // Modifikasi fungsi onAddToCart lokal untuk menggunakan quantity
  const handleAddToCartClick = () => {
    onAddToCart(product, quantity); // Kirimkan product dan quantity
    setQuantity(1); // Reset quantity ke 1 setelah ditambahkan ke keranjang
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg mt-8">
      <button
        onClick={() => navigateTo('home')}
        className="mb-6 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
      >
        &larr; Kembali ke Daftar Produk
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center">
            {product.name}
            <button
              onClick={() => toggleFavorite(product)}
              className={`ml-4 text-3xl transition-colors duration-200
                         ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
            >
              <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
            </button>
          </h1>
          <p className="text-green-600 font-bold text-4xl mb-6">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Panduan Perawatan</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Cahaya:</span> {product.care.light}<br />
              <span className="font-semibold">Penyiraman:</span> {product.care.water}<br />
              <span className="font-semibold">Kelembaban:</span> {product.care.humidity}<br />
              <span className="font-semibold">Ukuran Pot Ideal:</span> {product.care.potSize}
            </p>
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="text-lg font-semibold text-gray-700 mr-3">Jumlah:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 p-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
            />
          </div>

          {/* Modifikasi tombol Add to Cart untuk memanggil handleAddToCartClick */}
          <button
            onClick={handleAddToCartClick}
            className="w-full bg-green-500 text-white text-xl py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200"
          >
            Tambah ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;