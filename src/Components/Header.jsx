// Header.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

function Header({ favoriteItemCount, refreshCart }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [localCartItemCount, setLocalCartItemCount] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCartCount = async () => {
      try {
        const response = await axios.get('https://tokoh-online-server.vercel.app/api/cart');
        setLocalCartItemCount(response.data.length);
      } catch (error) {
        console.error('Error fetching cart count:', error);
      }
    };
    fetchCartCount();
  }, [refreshCart]); // Dependensi yang benar, akan memicu re-fetch saat refreshCart berubah

  const handleNavigationClick = (page) => {
    navigate(page);
    setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-21">
      <div className="text-2xl font-bold text-green-700 cursor-pointer" onClick={() => handleNavigationClick('/')}>
        Toko Tanaman Hias Lokal
      </div>
      
      <button
        className={`md:hidden text-gray-700 text-2xl z-50 relative ${isMenuOpen ? 'hidden' : 'block'}`}
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
      >
        <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
      </button>

      <nav className="hidden md:block">
        <ul className="flex space-x-6">
          <li>
            <button
              onClick={() => handleNavigationClick('/')}
              className="text-gray-700 hover:text-green-600 font-semibold"
            >
              Beranda
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/products')}
              className="text-gray-700 hover:text-green-600 font-semibold"
            >
              Produk
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/about')}
              className="text-gray-700 hover:text-green-600 font-semibold"
            >
              Tentang Kami
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/contact')}
              className="text-gray-700 hover:text-green-600 font-semibold"
            >
              Kontak
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/cart')}
              className="text-gray-700 hover:text-green-600 font-semibold relative"
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              {localCartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[20px] h-[20px]">
                  {localCartItemCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/favorites')}
              className="text-gray-700 hover:text-green-600 font-semibold relative"
            >
              <FontAwesomeIcon icon={solidHeart} className="text-xl" />
              {favoriteItemCount > 0 && ( // Pakai favoriteItemCount dari props
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[20px] h-[20px]">
                  {favoriteItemCount}
                </span>
              )}
            </button>
          </li>
        </ul>
      </nav>
      
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center
                     transform transition-transform duration-300 ease-in-out
                     ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                     md:hidden`}
      >
        <button
          className="absolute top-4 right-4 text-gray-700 text-3xl p-2"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Tutup menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <ul className="flex flex-col space-y-6 text-2xl">
          <li>
            <button
              onClick={() => handleNavigationClick('/')}
              className="text-gray-700 hover:text-green-600 font-semibold"
            >
              Beranda
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/products')}
              className="text-gray-700 hover:text-green-600 font-semibold"
            >
              Produk
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/about')}
              className="text-gray-700 hover:text-green-600 font-semibold"
            >
              Tentang Kami
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/contact')}
              className="text-gray-700 hover:text-green-600 font-semibold"
            >
              Kontak
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/cart')}
              className="text-gray-700 hover:text-green-600 font-semibold relative flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-3xl mr-2" /> Keranjang
              {localCartItemCount > 0 && (
                <span className="ml-2 text-base bg-green-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[24px] h-[24px]">
                  {localCartItemCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <button
              onClick={() => handleNavigationClick('/favorites')}
              className="text-gray-700 hover:text-green-600 font-semibold relative flex items-center justify-center"
            >
              <FontAwesomeIcon icon={solidHeart} className="text-3xl mr-2" /> Favorit
              {favoriteItemCount > 0 && (
                <span className="ml-2 text-base bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[24px] h-[24px]">
                  {favoriteItemCount}
                </span>
              )}
            </button>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;