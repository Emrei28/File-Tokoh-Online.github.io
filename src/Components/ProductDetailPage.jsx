import React, { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as regularHeart } from '@fortawesome/free-regular-svg-icons';

function ProductDetailPage({ onAddToCart, favoriteItems, toggleFavorite, showNotification, refreshCart }) {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`https://tokoh-online-server.vercel.app/api/products/${productId}`);
        setProduct(response.data);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCartClick = async () => {
    if (loading) return;
    setLoading(true);
    try {
      await onAddToCart(product, quantity);
      setQuantity(1);
    } catch (error) {
      console.error('Error menambahkan ke cart:', error);
      if (showNotification) showNotification('Gagal menambahkan ke keranjang.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const isFavorite = favoriteItems.some(item => item.id === product?.id);

  // Perubahan hanya di bagian ini
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-t-4 border-b-4 border-green-500"></div>
        <p className="ml-4 text-gray-600 text-xl font-semibold">Memuat detail produk...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto p-4 md:p-8 mt-8 text-center text-red-600">
        Produk tidak ditemukan.
        <button
          onClick={() => navigate('/products')}
          className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
        >
          Kembali ke Beranda
        </button>
      </div>
    );
  }

  const handleQuantityChange = (e) => {
    const value = parseInt(e.target.value);
    if (value > 0) {
      setQuantity(value);
    } else {
      setQuantity(1);
    }
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg mt-8">
      <button
        onClick={() => navigate('/products')}
        className="mb-6 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
      >
        &larr; Kembali ke Daftar Produk
      </button>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2 flex justify-center items-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-80 object-cover rounded-lg shadow-md"
          />
        </div>
        <div className="md:w-1/2">
          <h1 className="text-4xl font-bold text-gray-800 mb-3 flex items-center">
            {product.name}
            <button
              onClick={() => toggleFavorite(product)}
              className={`ml-4 text-3xl transition-colors duration-200
                          ${isFavorite ? 'text-red-500' : 'text-gray-300 hover:text-red-400'}`}
            >
              <FontAwesomeIcon icon={isFavorite ? solidHeart : regularHeart} />
            </button>
          </h1>
          <p className="text-green-600 font-bold text-4xl mb-6">
            Rp {product.price.toLocaleString('id-ID')}
          </p>
          <p className="text-gray-700 text-lg mb-6">{product.description}</p>

          <div className="bg-gray-50 p-4 rounded-lg mb-6 shadow-sm">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">Panduan Perawatan</h3>
            <p className="text-gray-700">
              <span className="font-semibold">Cahaya:</span> {product.care?.light || 'Tidak tersedia'}<br />
              <span className="font-semibold">Penyiraman:</span> {product.care?.water || 'Tidak tersedia'}<br />
              <span className="font-semibold">Kelembaban:</span> {product.care?.humidity || 'Tidak tersedia'}<br />
              <span className="font-semibold">Ukuran Pot Ideal:</span> {product.care?.potSize || 'Tidak tersedia'}
            </p>
          </div>

          <div className="flex items-center mb-6">
            <label htmlFor="quantity" className="text-lg font-semibold text-gray-700 mr-3">Jumlah:</label>
            <input
              type="number"
              id="quantity"
              min="1"
              value={quantity}
              onChange={handleQuantityChange}
              className="w-20 p-2 border border-gray-300 rounded-md text-center text-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              disabled={loading}
            />
          </div>

          <button
            onClick={handleAddToCartClick}
            className="w-full bg-green-500 text-white text-xl py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200"
            disabled={loading}
          >
            {loading ? 'Memproses...' : 'Tambah ke Keranjang'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailPage;