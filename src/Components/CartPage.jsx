// src/components/CartPage.jsx
import React from 'react';

function CartPage({ cartItems, onUpdateQuantity, onRemoveItem }) {
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Keranjang Belanja Anda</h2>

      {cartItems.length === 0 ? (
        <p className="text-center text-gray-600 text-lg">Keranjang Anda masih kosong. Yuk, cari tanaman impian!</p>
      ) : (
        <>
          <div className="space-y-4">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center border-b pb-4 last:border-b-0">
                <img src={item.image} alt={item.name} className="w-24 h-24 object-cover rounded-md mr-4" />
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-green-600 font-bold text-lg">Rp {item.price.toLocaleString('id-ID')}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                    disabled={item.quantity === 1} // Nonaktifkan jika jumlahnya 1
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="text-lg font-medium">{item.quantity}</span>
                  <button
                    onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                    className="bg-gray-200 text-gray-700 px-3 py-1 rounded-md hover:bg-gray-300"
                  >
                    +
                  </button>
                  <button
                    onClick={() => onRemoveItem(item.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 ml-4"
                  >
                    Hapus
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t pt-4 mt-6 flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-800">Total:</span>
            <span className="text-2xl font-bold text-green-700">Rp {calculateTotal().toLocaleString('id-ID')}</span>
          </div>

          <div className="mt-8 text-center">
            <button className="bg-green-600 text-white text-xl py-3 px-8 rounded-lg hover:bg-green-700 transition duration-200">
              Lanjutkan ke Pembayaran (Segera Hadir!)
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;