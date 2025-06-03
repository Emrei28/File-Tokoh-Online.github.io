// src/components/Header.jsx
import React from 'react';
import  { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faCartShopping, faBars, faXmark } from '@fortawesome/free-solid-svg-icons';

function Header({ cartItemCount, navigateTo, favoriteItemCount }) { 

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavigationClick = (page) => {
    navigateTo(page);
    setIsMenuOpen(false); 
  };

  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-21"> 
       <div className="text-2xl font-bold text-green-700 cursor-pointer" onClick={() => handleNavigationClick('landing')}>
        Toko Tanaman Hias Lokal
      </div>
      
      {/* ❤️ MODIFIKASI: Tombol hamburger/X harus memiliki z-index paling tinggi
          agar selalu bisa diakses untuk membuka/menutup menu. */}
      <button
        className={`md:hidden text-gray-700 text-2xl z-50 relative ${isMenuOpen ? 'hidden' : 'block'}`} // Sembunyikan jika menu terbuka
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        aria-label={isMenuOpen ? 'Tutup menu' : 'Buka menu'}
      >
        <FontAwesomeIcon icon={isMenuOpen ? faXmark : faBars} />
      </button>

       <nav className="hidden md:block">
        <ul className="flex space-x-6">
          <li><a href="#" onClick={() => handleNavigationClick('landing')} className="text-gray-700 hover:text-green-600 font-semibold">Beranda</a></li>
          <li><a href="#" onClick={() => handleNavigationClick('products')} className="text-gray-700 hover:text-green-600 font-semibold">Produk</a></li>
          <li><a href="#" onClick={() => handleNavigationClick('about')} className="text-gray-700 hover:text-green-600 font-semibold">Tentang Kami</a></li>
          <li><a href="#" onClick={() => handleNavigationClick('contact')} className="text-gray-700 hover:text-green-600 font-semibold">Kontak</a></li>
          <li>
            <a
              href="#"
              onClick={() => navigateTo('cart')}
              className="text-gray-700 hover:text-green-600 font-semibold relative"
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              {cartItemCount > 0 && ( // Tampilkan lingkaran jika ada item
                <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[20px] h-[20px]">
                  {cartItemCount}
                </span>
              )}
            </a>
          </li>
          {/* ❤️ BARU: Ikon favorit dengan badge hitungan */}
          <li>
            <a
              href="#"
              onClick={() => navigateTo('favorites')} // Link ke halaman favorit
              className="text-gray-700 hover:text-green-600 font-semibold relative"
            >
              <FontAwesomeIcon icon={solidHeart} className="text-xl" />
              {/* ❤️ MODIFIKASI: Pastikan tidak ada .length di sini, karena favoriteItemCount sudah angka */}
              {favoriteItemCount > 0 && ( // Tampilkan lingkaran jika ada item favorit
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[20px] h-[20px]">
                  {favoriteItemCount}
                </span>
              )}
            </a>
          </li>
        </ul>
      </nav>
      
      <div
        className={`fixed inset-0 bg-white z-40 flex flex-col items-center justify-center
                    transform transition-transform duration-300 ease-in-out
                    ${isMenuOpen ? 'translate-x-0' : 'translate-x-full'}
                    md:hidden`} // Selalu hidden di desktop
      >
        {/* Tombol Close di dalam Overlay Menu */}
        <button
          className="absolute top-4 right-4 text-gray-700 text-3xl p-2"
          onClick={() => setIsMenuOpen(false)}
          aria-label="Tutup menu"
        >
          <FontAwesomeIcon icon={faXmark} />
        </button>

        <ul className="flex flex-col space-y-6 text-2xl">
          <li><a href="#" onClick={() => handleNavigationClick('landing')} className="text-gray-700 hover:text-green-600 font-semibold">Beranda</a></li>
          <li><a href="#" onClick={() => handleNavigationClick('products')} className="text-gray-700 hover:text-green-600 font-semibold">Produk</a></li>
          <li><a href="#" onClick={() => handleNavigationClick('about')} className="text-gray-700 hover:text-green-600 font-semibold">Tentang Kami</a></li>
          <li><a href="#" onClick={() => handleNavigationClick('contact')} className="text-gray-700 hover:text-green-600 font-semibold">Kontak</a></li>
          <li>
            <a
              href="#"
              onClick={() => handleNavigationClick('cart')}
              className="text-gray-700 hover:text-green-600 font-semibold relative flex items-center justify-center"
            >
              <FontAwesomeIcon icon={faCartShopping} className="text-3xl mr-2" /> Keranjang
              {cartItemCount > 0 && (
                <span className="ml-2 text-base bg-green-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[24px] h-[24px]">
                  {cartItemCount}
                </span>
              )}
            </a>
          </li>
          <li>
            <a
              href="#"
              onClick={() => handleNavigationClick('favorites')}
              className="text-gray-700 hover:text-green-600 font-semibold relative flex items-center justify-center"
            >
              <FontAwesomeIcon icon={solidHeart} className="text-3xl mr-2" /> Favorit
              {favoriteItemCount > 0 && (
                <span className="ml-2 text-base bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[24px] h-[24px]">
                  {favoriteItemCount}
                </span>
              )}
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

export default Header;