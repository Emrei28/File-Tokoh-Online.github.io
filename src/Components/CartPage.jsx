// src/components/CartPage.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';

function CartPage({ cartItems, onUpdateQuantity, onRemoveItem, showNotification, refreshCart }) {
  const navigate = useNavigate();

  const totalOverallPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleUpdateQuantity = async (productId, newQuantity) => {
    try {
      await onUpdateQuantity(productId, newQuantity);
    } catch (error) {
      console.error('Error updating quantity:', error);
      if (showNotification) showNotification('Gagal memperbarui kuantitas.', 'error');
    }
  };

  const handleRemoveItem = async (productId, productName) => {
    try {
      await onRemoveItem(productId, productName);
    } catch (error) {
      console.error('Error removing item:', error);
      if (showNotification) showNotification('Gagal menghapus item.', 'error');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="container mx-auto p-4 text-center mt-8">
        <p className="text-2xl font-semibold text-gray-600 mb-4">
          Keranjang Anda masih kosong. Silahkan pilih produk favorit Anda!
        </p>
        <button
          onClick={() => navigate('/products')}
          className="bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200 text-lg font-semibold"
        >
          Lihat Produk
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4 md:p-8 mt-8">
      <h2 className="text-4xl text-center font-bold text-gray-800 mb-6">Keranjang Belanja Anda</h2>
      <div className="overflow-x-auto shadow-lg rounded-lg">
        <table className="w-full text-left table-auto">
          <thead className="bg-green-600 text-white">
            <tr>
              <th className="p-4 rounded-tl-lg">Produk</th>
              <th className="p-4">Harga</th>
              <th className="p-4 text-center">Jumlah</th>
              <th className="p-4 text-right">Total</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item) => (
              <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="p-4 flex items-center">
                  <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-md mr-4" />
                  <span className="font-semibold text-gray-700">{item.name}</span>
                </td>
                <td className="p-4 text-green-600 font-semibold">
                  Rp {item.price.toLocaleString('id-ID')}
                </td>
                <td className="p-4 text-center">
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => handleUpdateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 p-2 border border-gray-300 rounded-md text-center"
                  />
                </td>
                <td className="p-4 font-bold text-right">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </td>
                <td className="p-4 text-right">
                  <button
                    onClick={() => handleRemoveItem(item.id, item.name)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition duration-200 text-xs"
                  >
                    Hapus
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-end items-center mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
        <span className="text-xl font-bold text-gray-800 mr-4">Total Belanja:</span>
        <span className="text-3xl font-extrabold text-green-700">
          Rp {totalOverallPrice.toLocaleString('id-ID')}
        </span>
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => navigate('/products')}
          className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
        >
          &larr; Lanjutkan Belanja
        </button>
        <button
          onClick={() => navigate('/checkout')}
          className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 text-xl font-semibold"
        >
          Lanjut ke Pembayaran
        </button>
      </div>
    </div>
  );
}

export default CartPage;