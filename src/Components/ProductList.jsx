// src/components/ProductList.jsx
import { useState, useEffect } from 'react';
import productsData from '../data/products';
import ProductCard from './ProductCard';


function ProductList({ onAddToCart, navigateTo, favoriteItems, toggleFavorite}) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua'); 
  const [sortOption, setSortOption] = useState('default');
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

    switch (sortOption) {
      case 'price-asc': // Harga terendah ke tertinggi
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc': // Harga tertinggi ke terendah
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc': // Nama A-Z
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc': // Nama Z-A
        results.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        // Tidak ada pengurutan default, biarkan sesuai urutan data asli atau hasil filter
        // Atau bisa juga diurutkan berdasarkan ID jika ingin konsisten: results.sort((a, b) => a.id - b.id);
        break;
    }

    setFilteredProducts(results);
  }, [searchQuery, selectedCategory, sortOption]); // Bergantung pada searchQuery DAN selectedCategory

  return (
    <section className="container mx-auto p-4 md:p-8 mt-16 sm:mt-20">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Jelajahi Koleksi Tanaman Kami</h2>

      {/* Kolom Pencarian & Filter Kategori */}
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        {/* Input Pencarian */}
        <input
          type="text"
          placeholder="Cari tanaman..."
          className="w-full max-w-sm p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Dropdown Filter Kategori */}
        <select
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 md:w-auto w-full text-lg"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
        >
          {categories.map(category => (
            <option key={category} value={category}>{category}</option>
          ))}
        </select>

        <select
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 md:w-auto w-full text-lg" // ❤️ text-lg
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="default">Urutkan Berdasarkan...</option>
          <option value="price-asc">Harga: Terendah ke Tertinggi</option>
          <option value="price-desc">Harga: Tertinggi ke Terendah</option>
          <option value="name-asc">Nama: A - Z</option>
          <option value="name-desc">Nama: Z - A</option>
        </select>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 text-xl py-10">Tidak ada tanaman yang ditemukan dengan kata kunci "{searchQuery}" dan kategori "{selectedCategory}".</p>
        ) : (
          filteredProducts.map(product => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={onAddToCart}
              navigateTo={navigateTo}
              favoriteItems={favoriteItems} 
              toggleFavorite={toggleFavorite}
            />
          ))
        )}
      </div>
    </section>
  );
}


export default ProductList;