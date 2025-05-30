// src/components/Header.jsx
import React from 'react';

function Header({ cartItemCount, navigateTo }) { // Menerima prop navigateTo
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center fixed w-full top-0 z-10">
      <div className="text-2xl font-bold text-green-700 cursor-pointer" onClick={() => navigateTo('home')}>
        Toko Tanaman Hias Lokal
      </div>

      <nav>
        <ul className="flex space-x-6">
          <li><a href="#" onClick={() => navigateTo('home')} className="text-gray-700 hover:text-green-600 font-semibold">Beranda</a></li>
          {/* Nanti di sini bisa ada link ke halaman daftar produk penuh */}
          <li><a href="#" onClick={() => navigateTo('home')} className="text-gray-700 hover:text-green-600 font-semibold">Produk</a></li>
          <li><a href="#" onClick={() => navigateTo('about')} className="text-gray-700 hover:text-green-600 font-semibold">Tentang Kami</a></li>
          <li><a href="#" onClick={() => navigateTo('contact')} className="text-gray-700 hover:text-green-600 font-semibold">Kontak</a></li>
          <li>
            <a
              href="#"
              onClick={() => navigateTo('cart')} // Ketika ikon keranjang diklik, pindah ke halaman 'cart'
              className="text-gray-700 hover:text-green-600 font-semibold relative"
            >
              
              <i className="fa-solid fa-cart-shopping text-xl"></i> {/* Perhatikan kelas 'text-xl' untuk ukuran */}
              {cartItemCount > 0 && ( // Tampilkan lingkaran jika ada item
                <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[20px] h-[20px]">
                  {cartItemCount}
                </span>
              )}
            </a>
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;