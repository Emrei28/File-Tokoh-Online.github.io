// src/App.jsx
import { useState, useEffect } from 'react'; // Import useState
import Header from './Components/Header'; // Import komponen Header
import ProductList from './Components/ProductList';
import CartPage from './Components/CartPage';
import ProductDetailPage from './Components/ProductDetailPage';
import Footer from './Components/Footer';
import AboutPage from './Components/AboutPage';
import ContactPage from './Components/ContactPage';
import FavoritesPage from './Components/FavoritesPage';
import Notification from './Components/Notification';

import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null); // State untuk menyimpan ID produk yang dipilih
  const [favoriteItems, setFavoriteItems] = useState(() => {
    // ❤️ BARIS BARU: Coba muat dari localStorage saat inisialisasi
    const savedFavorites = localStorage.getItem('favoriteItems');
    try { // ❤️ BARIS BARU: Tambahkan try-catch untuk penanganan error JSON.parse
        return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (e) {
        console.error("Failed to parse favoriteItems from localStorage", e);
        return [];
    }
  });

  const [notification, setNotification] = useState({
    message: '',
    type: '', // 'success', 'error', 'info', 'warning'
    isVisible: false,
  });
  
  useEffect(() => {
    localStorage.setItem('favoriteItems', JSON.stringify(favoriteItems));
  }, [favoriteItems]);

  const showNotification = (message, type = 'info') => {
    setNotification({ message, type, isVisible: true });
  };

  const hideNotification = () => {
    setNotification(prev => ({ ...prev, isVisible: false }));
  };

   const navigateTo = (page, productId = null) => {
    setCurrentPage(page);
    setSelectedProductId(productId);
  };

  const addToCart = (productToAdd, quantity = 1) => { // Default quantity = 1 jika tidak disediakan
    setCartItems(prevItems => {
      const existingItem = prevItems.find(item => item.id === productToAdd.id);
      if (existingItem) {
        // Jika produk sudah ada, update quantity-nya
        return prevItems.map(item =>
          item.id === productToAdd.id
            ? { ...item, quantity: item.quantity + quantity } // Tambahkan quantity yang baru
            : item
        );
      } else {
        // Jika produk belum ada, tambahkan sebagai item baru
        return [...prevItems, { ...productToAdd, quantity }]; 
      }
    });
    showNotification(`${productToAdd.name} ditambahkan ke keranjang!`, 'success');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
        removeItem(productId);
        return;
    }
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
    showNotification('Kuantitas diperbarui.', 'info');
  };

   const removeItem = (productId) => {
    const removedItemName = cartItems.find(item => item.id === productId)?.name; // Dapatkan nama item sebelum dihapus
    setCartItems(cartItems.filter(item => item.id !== productId));
    // ❤️ BARIS BARU: Tampilkan notifikasi setelah menghapus item
    showNotification(`${removedItemName || 'Item'} dihapus dari keranjang.`, 'info');
  };

  const toggleFavorite = (productToToggle) => {
    setFavoriteItems(prevFavorites => {
      const isFavorite = prevFavorites.some(item => item.id === productToToggle.id);
      if (isFavorite) {
        showNotification(`${productToToggle.name} dihapus dari favorit.`, 'info');
        return prevFavorites.filter(item => item.id !== productToToggle.id);
      } else {
        showNotification(`${productToToggle.name} ditambahkan ke favorit!`, 'success');
        return [...prevFavorites, productToToggle];
      }
    });
  };


  return (
    <div className="App bg-gray-100 min-h-screen">

      <Notification
        message={notification.message}
        type={notification.type}
        isVisible={notification.isVisible}
        onClose={hideNotification}
      />

      <Header
         cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
         navigateTo={navigateTo}
         favoriteItemCount={favoriteItems.length} // Ini yang meneruskan jumlah favorit (berupa angka)
      />
      <main className="flex-grow pt-20 pb-8">
        {currentPage === 'home' && (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">Selamat Datang di Toko Tanaman Hias Lokal!</h1>
            <p className="text-lg text-center text-gray-600 mb-8">Temukan koleksi tanaman hijau terbaik untuk rumah Anda.</p>
            <ProductList 
            onAddToCart={addToCart} 
            navigateTo={navigateTo} 
            favoriteItems={favoriteItems} 
            toggleFavorite={toggleFavorite}
            showNotification={showNotification}
            /> 
          </>
        )}

        {currentPage === 'about' && <AboutPage />}

        {currentPage === 'contact' && <ContactPage />}

        {currentPage === 'cart' && (
          <CartPage
            cartItems={cartItems}
            onUpdateQuantity={updateQuantity}
            onRemoveItem={removeItem}
            navigateTo={navigateTo}
            showNotification={showNotification}
          />
        )}

        {currentPage === 'productDetail' && selectedProductId && ( // Tampilkan ProductDetailPage
          <ProductDetailPage
            productId={selectedProductId}
            onAddToCart={addToCart}
            navigateTo={navigateTo}
            favoriteItems={favoriteItems} 
            toggleFavorite={toggleFavorite}
            showNotification={showNotification}
          />
        )}

        {currentPage === 'favorites' && (
          <FavoritesPage
            favoriteItems={favoriteItems}
            onAddToCart={addToCart}
            toggleFavorite={toggleFavorite}
            navigateTo={navigateTo}
            showNotification={showNotification}
          />
        )}

      </main>
      <Footer />
    </div>
  );
}

export default App;