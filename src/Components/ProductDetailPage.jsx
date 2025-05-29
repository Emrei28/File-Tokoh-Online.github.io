// src/components/ProductDetailPage.jsx
import React from 'react';
import products from '../data/products'; // Import data produk

function ProductDetailPage({ productId, onAddToCart, navigateTo }) {
  // Cari produk berdasarkan ID yang diterima dari props
  const product = products.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="container mx-auto p-8 text-center bg-white shadow-md rounded-lg mt-8">
        <h2 className="text-2xl font-bold text-red-600">Produk tidak ditemukan!</h2>
        <button onClick={() => navigateTo('home')} className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600">
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg mt-8">
      <button onClick={() => navigateTo('home')} className="mb-6 text-green-600 hover:underline flex items-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
        </svg>
        Kembali ke Daftar Produk
      </button>

      <div className="flex flex-col md:flex-row gap-8">z
        <div className="md:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-auto object-cover rounded-lg shadow-lg"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">{product.name}</h1>
          <p className="text-green-600 font-extrabold text-3xl mb-4">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>

          <div className="bg-gray-50 p-4 rounded-md mb-6">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Panduan Perawatan:</h3>
            <ul className="list-disc list-inside text-gray-700 space-y-1">
              <li><span className="font-medium">Cahaya:</span> {product.care.light}</li>
              <li><span className="font-medium">Penyiraman:</span> {product.care.water}</li>
              <li><span className="font-medium">Kelembaban:</span> {product.care.humidity}</li>
              <li><span className="font-medium">Ukuran Pot:</span> {product.care.potSize}</li>
            </ul>
          </div>

          <button
            onClick={() => onAddToCart(product)}
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