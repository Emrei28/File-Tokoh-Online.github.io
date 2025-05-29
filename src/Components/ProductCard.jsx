// src/components/ProductCard.jsx
import React from 'react';

function ProductCard({ product, onAddToCart, navigateTo }) { // Menerima 'navigateTo'
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 cursor-pointer">
      {/* Tambahkan onClick ke div utama untuk navigasi */}
      <div onClick={() => navigateTo('productDetail', product.id)}>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <div className="p-4">
          <h3 className="text-lg font-semibold text-gray-800 mb-1">{product.name}</h3>
          <p className="text-green-600 font-bold text-xl mb-3">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
      {/* Tombol Add to Cart terpisah di luar div yang diklik */}
      <div className="p-4 pt-0"> {/* Tambahkan padding atas 0 */}
        <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
        >
            Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}

export default ProductCard;