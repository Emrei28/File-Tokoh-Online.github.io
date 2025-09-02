// src/App.jsx
import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import axios from 'axios';

import './App.css';

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
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  const showNotification = (message, type = 'success') => {
    setNotification({ message, type, isVisible: true });
    setTimeout(() => {
      setNotification({ message: '', type: '', isVisible: false });
    }, 3000);
  };

  const refreshCart = () => {
    setRefresh(prev => !prev);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common['Authorization'];
    setCartItems([]);
    showNotification('Anda telah keluar dari akun.', 'info');
  };

  const handleLoginSuccess = (newToken, newUser) => {
    setToken(newToken);
    setUser(newUser);
    axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
    refreshCart();
  };

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
      axios.defaults.headers.common['Authorization'] = `Bearer ${storedToken}`;
    }
  }, []);

  useEffect(() => {
    const fetchCartItems = async () => {
      if (token) {
        try {
          const response = await axios.get('/api/cart');
          setCartItems(response.data || []);
        } catch (error) {
          console.error('Error fetching cart:', error);
          if (error.response && error.response.status === 403) {
            handleLogout();
          }
          setCartItems([]);
        }
      } else {
        setCartItems([]);
      }
    };
    fetchCartItems();
  }, [token, refresh]);

  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const addToCart = async (productToAdd, quantity = 1) => {
    try {
      await axios.post('/api/cart', {
        product_id: productToAdd.id,
        quantity: quantity,
      });
      showNotification(`${quantity} ${productToAdd.name} berhasil ditambahkan ke keranjang!`, 'success');
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
      refreshCart();
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
          cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)} // Hitung total kuantitas
          favoriteItemCount={favoriteItems.length} 
          user={user}
          onLogout={handleLogout}
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
                onUpdateQuantity={updateQuantity}
                onRemoveItem={removeItem}
                showNotification={showNotification}
                refreshCart={refreshCart}
              />
            } />
            <Route path="/product/:productId" element={
              <ProductDetailPage
                onAddToCart={addToCart}
                favoriteItems={favoriteItems}
                toggleFavorite={toggleFavorite}
                showNotification={showNotification}
                refreshCart={refreshCart}
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
            <Route path="/login" element={
              <LoginPage onLoginSuccess={handleLoginSuccess} showNotification={showNotification} />
            } />
            <Route path="/register" element={
              <RegisterPage onLoginSuccess={handleLoginSuccess} showNotification={showNotification} />
            } />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;