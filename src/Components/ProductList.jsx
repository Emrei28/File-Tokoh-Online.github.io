import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ProductCard from './ProductCard';

function ProductList({ onAddToCart, navigateTo, favoriteItems, toggleFavorite }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Semua');
  const [sortOption, setSortOption] = useState('default');
  const [products, setProducts] = useState([]); // State utama dari backend
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [categories, setCategories] = useState(['Semua']);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('https://tokoh-online-server.vercel.app/api/products');
        setProducts(response.data);
        const uniqueCategories = ['Semua', ...new Set(response.data.map(product => product.category))];
        setCategories(uniqueCategories);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Gagal memuat data tanaman. Coba lagi nanti.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    let results = [...products];
    if (selectedCategory !== 'Semua') {
      results = results.filter(product => product.category === selectedCategory);
    }
    if (searchQuery) {
      const lowercasedQuery = searchQuery.toLowerCase();
      results = results.filter(product =>
        (product.name && product.name.toLowerCase().includes(lowercasedQuery)) ||
        (product.description && product.description.toLowerCase().includes(lowercasedQuery)) ||
        (product.category && product.category.toLowerCase().includes(lowercasedQuery))
      );
    }
    switch (sortOption) {
      case 'price-asc':
        results.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        results.sort((a, b) => b.price - a.price);
        break;
      case 'name-asc':
        results.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name-desc':
        results.sort((a, b) => b.name.localeCompare(b.name));
        break;
      default:
        break;
    }
  }, [searchQuery, selectedCategory, sortOption, products]);

  // Perubahan hanya di bagian ini
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
        <p className="ml-4 text-gray-600 text-xl font-semibold">Memuat tanaman...</p>
      </div>
    );
  }

  if (error) return <p className="text-center text-red-600 text-xl py-10">{error}</p>;

  return (
    <section className="container mx-auto p-4 md:p-8 mt-16 sm:mt-20">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-8 text-center">Jelajahi Koleksi Tanaman Kami</h2>

      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center">
        <input
          type="text"
          placeholder="Cari tanaman..."
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 flex-grow text-lg"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

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
          className="p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 md:w-auto w-full text-lg"
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
        {products.length === 0 ? (
          <p className="col-span-full text-center text-gray-600 text-xl py-10">Tidak ada tanaman yang ditemukan.</p>
        ) : (
          products
            .filter(product =>
              (selectedCategory === 'Semua' || product.category === selectedCategory) &&
              (!searchQuery ||
                (product.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
                  product.category?.toLowerCase().includes(searchQuery.toLowerCase())))
            )
            .sort((a, b) => {
              switch (sortOption) {
                case 'price-asc': return a.price - b.price;
                case 'price-desc': return b.price - a.price;
                case 'name-asc': return a.name.localeCompare(b.name);
                case 'name-desc': return b.name.localeCompare(b.name);
                default: return 0;
              }
            })
            .map(product => (
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