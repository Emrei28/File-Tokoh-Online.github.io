// src/components/ProductCard.jsx
import React from 'react';
// ❤️ MODIFIKASI: Import FontAwesomeIcon dan ikon hati
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Ikon hati terisi
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Ikon hati kosong


function ProductCard({ product, onAddToCart, navigateTo, favoriteItems, toggleFavorite }) {

  if (!product) {
    console.warn("ProductCard received an undefined product prop.");
    return null; 
  }

  const isFavorite = favoriteItems.some(item => item.id === product.id);

  return (
   
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 hover:shadow-xl hover:-translate-y-1 relative">
    
      <button
        onClick={(e) => {
          e.stopPropagation(); // Mencegah klik card ketika klik favorit
          toggleFavorite(product);
        }}
        className={`absolute top-4 right-4 text-3xl z-20 transition-colors duration-200
                   ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
        aria-label={isFavorite ? "Hapus dari Favorit" : "Tambah ke Favorit"}
      >
        <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
      </button>

      {/* MODIFIKASI: Hapus onClick dari div ini, pindahkan ke img dan h3 */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-60 object-cover cursor-pointer border-b border-gray-100"
          onClick={() => navigateTo('productDetail', product.id)}
        />

        <div className="p-4 flex flex-col justify-between h-auto">
          <h3
            className="text-lg font-semibold text-gray-800 mb-2 cursor-pointer hover:text-green-600 transition duration-200"
            onClick={() => navigateTo('productDetail', product.id)}
          >
            {product.name}
          </h3>
          <p className="text-green-700 font-bold text-2xl mb-4">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
        </div>
      </div>
      {/* Tombol Add to Cart terpisah di luar div yang diklik */}
      <div className="p-4 pt-0"> {/* Tambahkan padding atas 0 */}
        <button
            onClick={() => onAddToCart(product)}
            className="w-full bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 mt-auto"
        >
            Tambah ke Keranjang
        </button>
         <button
          onClick={() => toggleFavorite(product)}
          className={`text-2xl transition-colors duration-200
                     ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
          aria-label={isFavorite ? "Hapus dari favorit" : "Tambah ke favorit"}
        >
          <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;