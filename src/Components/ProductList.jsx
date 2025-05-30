// src/components/ProductList.jsx
import { useState, useEffect } from 'react';
import productsData from '../data/products';
import ProductCard from './ProductCard';


function ProductList({ onAddToCart, navigateTo }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua'); // State untuk kategori yang dipilih
  const [filteredProducts, setFilteredProducts] = useState(productsData);

  // Dapatkan daftar kategori unik dari data produk
  const categories = ['Semua', ...new Set(productsData.map(product => product.category))];

  useEffect(() => {
    let results = productsData;

    // Filter berdasarkan kategori
    if (selectedCategory !== 'Semua') {
      results = results.filter(product => product.category === selectedCategory);
    }

    // Filter berdasarkan pencarian
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      results = results.filter(product =>
        (product.name && product.name.toLowerCase().includes(lowercasedQuery)) ||
        (product.description && product.description.toLowerCase().includes(lowercasedQuery)) ||
        (product.category && product.category.toLowerCase().includes(lowercasedQuery))
      );
    }

    setFilteredProducts(results);
  }, [searchQuery, selectedCategory]); // Bergantung pada searchQuery DAN selectedCategory

  return (
    <section className="container mx-auto p-4 md:p-8">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Koleksi Tanaman Kami</h2>

      {/* Kolom Pencarian & Filter Kategori */}
      <div className="mb-8 flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="Cari tanaman..."
          className="w-full max-w-md p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Dropdown Filter Kategori */}
        <select
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 md:w-auto w-full"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 text-lg">Tidak ada tanaman yang ditemukan dengan kata kunci "{searchQuery}" dan kategori "{selectedCategory}".</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              navigateTo={navigateTo}
            />
          ))
        )}
      </div>
    </section>
  );
}


export default ProductList;