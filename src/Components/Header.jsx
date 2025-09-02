// src/components/Header.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as solidHeart, faCartShopping, faBars, faXmark, faUserCircle } from '@fortawesome/free-solid-svg-icons';

function Header({ cartItemCount, favoriteItemCount, user, onLogout }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleNavigationClick = (page) => {
    navigate(page);
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
  };
  
  const handleLogoutClick = () => {
    onLogout();
    setIsMenuOpen(false);
    setIsProfileMenuOpen(false);
    navigate('/');
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
            <button onClick={() => handleNavigationClick('/')} className="text-gray-700 hover:text-green-600 font-semibold">Beranda</button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/products')} className="text-gray-700 hover:text-green-600 font-semibold">Produk</button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/about')} className="text-gray-700 hover:text-green-600 font-semibold">Tentang Kami</button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/contact')} className="text-gray-700 hover:text-green-600 font-semibold">Kontak</button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/cart')} className="text-gray-700 hover:text-green-600 font-semibold relative">
              <FontAwesomeIcon icon={faCartShopping} className="text-xl" />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-green-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[20px] h-[20px]">
                  {cartItemCount}
                </span>
              )}
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/favorites')} className="text-gray-700 hover:text-green-600 font-semibold relative">
              <FontAwesomeIcon icon={solidHeart} className="text-xl" />
              {favoriteItemCount > 0 && (
                <span className="absolute -top-2 -right-2 text-xs bg-red-500 text-white rounded-full px-2 py-1 flex items-center justify-center min-w-[20px] h-[20px]">
                  {favoriteItemCount}
                </span>
              )}
            </button>
          </li>
          {user ? (
            <li className="relative">
              <button 
                onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                className="text-gray-700 hover:text-green-600 font-semibold flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faUserCircle} className="text-2xl" />
                <span>Hi, {user.full_name.split(' ')[0]}</span>
              </button>
              <div className={`absolute right-0 top-full mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg ${isProfileMenuOpen ? 'block' : 'hidden'}`}>
                <button 
                  onClick={handleLogoutClick}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-gray-100"
                >
                  Logout
                </button>
              </div>
            </li>
          ) : (
            <li>
              <button
                onClick={() => handleNavigationClick('/login')}
                className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200 font-semibold"
              >
                Login
              </button>
            </li>
          )}
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
            <button onClick={() => handleNavigationClick('/')} className="text-gray-700 hover:text-green-600 font-semibold">Beranda</button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/products')} className="text-gray-700 hover:text-green-600 font-semibold">Produk</button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/about')} className="text-gray-700 hover:text-green-600 font-semibold">Tentang Kami</button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/contact')} className="text-gray-700 hover:text-green-600 font-semibold">Kontak</button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/cart')} className="text-gray-700 hover:text-green-600 font-semibold relative flex items-center justify-center">
              <FontAwesomeIcon icon={faCartShopping} className="text-3xl mr-2" /> Keranjang ({cartItemCount})
            </button>
          </li>
          <li>
            <button onClick={() => handleNavigationClick('/favorites')} className="text-gray-700 hover:text-green-600 font-semibold relative flex items-center justify-center">
              <FontAwesomeIcon icon={solidHeart} className="text-3xl mr-2" /> Favorit ({favoriteItemCount})
            </button>
          </li>
          {user ? (
            <>
              <li className="text-center">
                <p className="text-gray-700 font-semibold flex items-center justify-center gap-2">
                    <FontAwesomeIcon icon={faUserCircle} className="text-3xl" />
                    <span>Hi, {user.full_name.split(' ')[0]}</span>
                </p>
              </li>
              <li>
                <button
                    onClick={handleLogoutClick}
                    className="text-red-500 font-semibold"
                >
                    Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <button
                onClick={() => handleNavigationClick('/login')}
                className="text-green-500 font-semibold"
              >
                Login
              </button>
            </li>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;