// src/components/ProductCard.jsx
import React from 'react';
// ❤️ MODIFIKASI: Import FontAwesomeIcon dan ikon hati
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons'; // Ikon hati terisi
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons'; // Ikon hati kosong

// ❤️ MODIFIKASI: Tambahkan favoriteItems dan toggleFavorite sebagai props
function ProductCard({ product, onAddToCart, navigateTo, favoriteItems, toggleFavorite }) {

  if (!product) {
    console.warn("ProductCard received an undefined product prop.");
    return null; 
  }

  const isFavorite = favoriteItems.some(item => item.id === product.id);

  return (
   
    <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:scale-105 relative">
    
      <button
        onClick={(e) => {
          e.stopPropagation(); // Mencegah klik card ketika klik favorit
          toggleFavorite(product);
        }}
        className={`absolute top-3 right-3 text-2xl z-10 transition-colors duration-200
                   ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
      >
        <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
      </button>

      {/* MODIFIKASI: Hapus onClick dari div ini, pindahkan ke img dan h3 */}
      <div>
        <img
          src={product.image}
          alt={product.name}
          // ❤️ MODIFIKASI: Tambahkan cursor-pointer dan onClick ke img
          className="w-full h-48 object-cover cursor-pointer"
          onClick={() => navigateTo('productDetail', product.id)}
        />
        <div className="p-4">
          <h3
            // ❤️ MODIFIKASI: Tambahkan cursor-pointer dan onClick ke h3
            className="text-lg font-semibold text-gray-800 mb-1 cursor-pointer hover:text-green-600"
            onClick={() => navigateTo('productDetail', product.id)}
          >
            {product.name}
          </h3>
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