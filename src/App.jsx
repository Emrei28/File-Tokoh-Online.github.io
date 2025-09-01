// App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import Header from './components/Header';
import ProductList from './components/ProductList';
import CartPage from './components/CartPage';
import ProductDetailPage from './components/ProductDetailPage';
import Footer from './components/Footer';
import AboutPage from './components/AboutPage';
import ContactPage from './components/ContactPage';
import FavoritesPage from './components/FavoritesPage';
import Notification from './components/Notification';
import LandingPage from './components/LandingPage';
import CheckoutPage from './components/CheckoutPage';
import axios from 'axios';
import LoginPage from './components/LoginPage'; // <--- Tambahkan impor LoginPage

import './App.css';

// Atur URL dasar untuk semua permintaan API
axios.defaults.baseURL = 'https://tokoh-online-server.vercel.app';

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [favoriteItems, setFavoriteItems] = useState(() => {
    const savedFavorites = localStorage.getItem('favoriteItems');
    try {
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (e) {
      console.error("Failed to parse favoriteItems from localStorage", e);
      return [];
    }
  });
  const [notification, setNotification] = useState({
    message: '',
    type: '',
    isVisible: false,
  });
  const [refresh, setRefresh] = useState(false);

  // --- Start: Perubahan untuk Autentikasi ---
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  
  // Fungsi untuk menangani login yang berhasil
  const handleLoginSuccess = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    // Set header Authorization global agar setiap request menyertakan token
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    refreshCart(); // Perbarui keranjang setelah login
  };

  // Fungsi untuk menangani logout
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    // Hapus header Authorization saat logout
    delete axios.defaults.headers.common['Authorization'];
    showNotification('Anda telah keluar dari akun.', 'info');
    // Mungkin Anda ingin mengosongkan keranjang di sini juga
    setCartItems([]);
  };

  useEffect(() => {
    // Cek localStorage saat aplikasi pertama kali dimuat
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
    
    // Perbarui keranjang saat token atau user berubah
    const fetchCartItems = async () => {
      try {
        const response = await axios.get('/api/cart');
        setCartItems(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
        // Tangani error, misal token kadaluarsa
        if (error.response && error.response.status === 403) {
            handleLogout();
        }
      }
    };
    fetchCartItems();

  }, [token, refresh]); // Tambahkan `token` sebagai dependency

  // --- End: Perubahan untuk Autentikasi ---

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', isVisible: false });
    }, 3000);
  };

  const refreshCart = () => {
    setRefresh(prev => !prev);
  };
  
  const addToCart = async (productToAdd, quantity = 1) => {
    try {
      // Sekarang kita tidak perlu mencari item di state lokal lagi,
      // cukup kirim data ke backend, backend yang akan menentukan apakah akan menambah atau memperbarui.
      const response = await axios.post('/api/cart', {
        product_id: productToAdd.id,
        quantity: quantity,
      });

      showNotification(`${quantity} ${productToAdd.name} berhasil ditambahkan ke keranjang!`, 'success');

      // Perbarui tampilan keranjang di seluruh aplikasi
      refreshCart();
    } catch (error) {
      console.error('Error menambahkan ke cart:', error);
      showNotification('Gagal menambahkan ke keranjang.', 'error');
    }
  };

  const updateQuantity = async (itemId, newQuantity) => {
    try {
      await axios.put(`/api/cart/${itemId}`, { quantity: newQuantity });
      refreshCart();
      showNotification('Kuantitas berhasil diperbarui!', 'success');
    } catch (error) {
      console.error('Error updating quantity:', error);
      showNotification('Gagal memperbarui kuantitas.', 'error');
    }
  };

  const removeItem = async (itemId, productName) => {
    try {
      await axios.delete(`/api/cart/${itemId}`);
      refreshCart(); // Ini yang memicu pembaruan di komponen lain
      showNotification(`"${productName}" berhasil dihapus dari keranjang.`, 'success');
    } catch (error) {
      console.error('Error removing item:', error);
      showNotification('Gagal menghapus item.', 'error');
    }
  };

  const toggleFavorite = (product) => {
    setFavoriteItems(prevFavorites => {
      const isCurrentlyFavorite = prevFavorites.some(item => item.id === product.id);
      if (isCurrentlyFavorite) {
        showNotification(`${product.name} berhasil dihapus dari favorit.`, 'success');
        return prevFavorites.filter(item => item.id !== product.id);
      } else {
        showNotification(`${product.name} berhasil ditambahkan ke favorit!`, 'success');
        return [...prevFavorites, product];
      }
    });
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        <Header 
          cartItemCount={cartItems.length} 
          favoriteItemCount={favoriteItems.length} 
          user={user} // <--- Kirim state user ke komponen Header
          onLogout={handleLogout} // <--- Kirim fungsi logout ke Header
        />
        <Notification
          message={notification.message}
          type={notification.type}
          isVisible={notification.isVisible}
        />
        <main className="flex-grow pt-20">
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/products" element={
              <ProductList
                onAddToCart={addToCart}
                favoriteItems={favoriteItems}
                toggleFavorite={toggleFavorite}
              />
            } />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/cart" element={
              <CartPage
                cartItems={cartItems}
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                showNotification={showNotification}
                refreshCart={refresh}
              />
            } />
            <Route path="/product/:productId" element={
              <ProductDetailPage
                onAddToCart={addToCart}
                favoriteItems={favoriteItems}
                toggleFavorite={toggleFavorite}
                showNotification={showNotification}
                refreshCart={refresh}
              />
            } />
            <Route path="/favorites" element={
              <FavoritesPage
                favoriteItems={favoriteItems}
                onAddToCart={addToCart}
                toggleFavorite={toggleFavorite}
                showNotification={showNotification}
              />
            } />
            <Route path="/checkout" element={
              <CheckoutPage
                cartItems={cartItems}
                setCartItems={setCartItems}
                showNotification={showNotification}
              />
            } />

            {/* --- Start: Rute baru untuk Login dan Registrasi --- */}
            <Route path="/login" element={
              <LoginPage onLoginSuccess={handleLoginSuccess} showNotification={showNotification} />
            } />
            {/* Tambahkan rute untuk registrasi di sini setelah Anda membuat komponennya */}
            {/* <Route path="/register" element={<RegisterPage />} /> */}
            {/* --- End: Rute baru --- */}

          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;