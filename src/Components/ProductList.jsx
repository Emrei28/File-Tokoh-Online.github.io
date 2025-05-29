// src/components/ProductList.jsx
import React from 'react';
import products from '../data/products';
import ProductCard from './ProductCard';

// Pastikan navigateTo diterima sebagai prop di ProductList
function ProductList({ onAddToCart, navigateTo }) { // <--- Pastikan navigateTo ada di sini!
  return (
    <section className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Koleksi Tanaman Kami</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map(product => (
          // Ini adalah baris KUNCI: Pastikan navigateTo diteruskan ke ProductCard
          <ProductCard
            key={product.id}
            product={product}
            onAddToCart={onAddToCart}
            navigateTo={navigateTo} // <--- Pastikan baris ini ada dan benar
          />
        ))}
      </div>
    </section>
  );
}

export default ProductList;