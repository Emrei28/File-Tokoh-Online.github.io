import React from 'react';
import { useNavigate } from 'react-router-dom';
import ProductCard from './ProductCard';

function FavoritesPage({ favoriteItems, onAddToCart, toggleFavorite, showNotification }) {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto p-4 md:p-8 mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Favorit Anda</h2>
      {favoriteItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          <p>Belum ada tanaman favorit. Yuk, cari tanaman impian Anda!</p>
          <button
            onClick={() => navigate('/products')}
            className="mt-4 bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            Jelajahi Tanaman
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map((item) => (
            <ProductCard
              key={item.id}
              product={item}
              onAddToCart={onAddToCart}
              favoriteItems={favoriteItems}
              toggleFavorite={toggleFavorite}
              showNotification={showNotification}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default FavoritesPage;