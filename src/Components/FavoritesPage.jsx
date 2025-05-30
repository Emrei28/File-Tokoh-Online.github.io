// src/components/FavoritesPage.jsx
import React from 'react';
import ProductCard from './ProductCard'; // Import ProductCard untuk menampilkan item favorit

// Menerima favoriteItems, onAddToCart, toggleFavorite, dan navigateTo sebagai props
function FavoritesPage({ favoriteItems, onAddToCart, toggleFavorite, navigateTo }) {
  return (
    <section className="container mx-auto p-4 md:p-8 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Produk Favorit Anda</h2>

      {favoriteItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          <p className="mb-4">Anda belum memiliki produk favorit.</p>
          <button
            onClick={() => navigateTo('home')}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            Jelajahi Produk
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteItems.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              navigateTo={navigateTo}
              favoriteItems={favoriteItems} // Teruskan favoriteItems ke ProductCard
              toggleFavorite={toggleFavorite} // Teruskan toggleFavorite ke ProductCard
            />
          ))}
        </div>
      )}
    </section>
  );
}

export default FavoritesPage;