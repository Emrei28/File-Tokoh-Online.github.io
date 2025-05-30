// src/App.jsx
import { useState } from 'react'; // Import useState
import Header from './Components/Header'; // Import komponen Header
import ProductList from './Components/ProductList';
import CartPage from './Components/CartPage';
import ProductDetailPage from './Components/ProductDetailPage';
import Footer from './Components/Footer';
import AboutPage from './Components/AboutPage';
import ContactPage from './Components/ContactPage';

import './App.css'

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [currentPage, setCurrentPage] = useState('home');
  const [selectedProductId, setSelectedProductId] = useState(null); // State untuk menyimpan ID produk yang dipilih


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
        return [...prevItems, { ...productToAdd, quantity }]; // Sertakan quantity yang baru
      }
    });
    // Opsional: navigasi ke halaman keranjang setelah menambahkan
    // navigateTo('cart');
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity < 1) {
        removeItem(productId);
        return;
    }
    setCartItems(cartItems.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (productId) => {
    setCartItems(cartItems.filter(item => item.id !== productId));
  };

  return (
    <div className="App bg-gray-100 min-h-screen">
      <Header
        cartItemCount={cartItems.reduce((total, item) => total + item.quantity, 0)}
        navigateTo={navigateTo}
      />
      <main className="pt-20">
        {currentPage === 'home' && (
          <>
            <h1 className="text-3xl font-bold text-center text-gray-800 mt-8 mb-4">Selamat Datang di Toko Tanaman Hias Lokal!</h1>
            <p className="text-lg text-center text-gray-600 mb-8">Temukan koleksi tanaman hijau terbaik untuk rumah Anda.</p>
            {/* Ini juga KUNCI: Pastikan navigateTo diteruskan ke ProductList */}
            <ProductList onAddToCart={addToCart} navigateTo={navigateTo} /> {/* <--- Pastikan baris ini ada dan benar */}
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
          />
        )}

        {currentPage === 'productDetail' && selectedProductId && ( // Tampilkan ProductDetailPage
          <ProductDetailPage
            productId={selectedProductId}
            onAddToCart={addToCart}
            navigateTo={navigateTo} // Kirim navigateTo kembali
          />
        )}

      </main>
      <Footer />
    </div>
  );
}

export default App;