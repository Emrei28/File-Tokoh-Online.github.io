// src/components/CartPage.jsx
import React from 'react';

function CartPage({ cartItems, onUpdateQuantity, onRemoveItem,navigateTo }) {
   const totalOverallPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <div className="container mx-auto p-4 md:p-8 bg-white shadow-md rounded-lg mt-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Keranjang Belanja Anda</h2>

      {cartItems.length === 0 ? (
        <div className="text-center text-gray-600 text-lg">
          <p className="text-center text-gray-600 text-lg">Keranjang Anda masih kosong. Yuk, cari tanaman impian!</p>
          <button
            onClick={() => navigateTo('home')}
            className="bg-green-500 text-white py-2 px-4 rounded-md hover:bg-green-600 transition duration-200"
          >
            Mulai Belanja
          </button>
        </div>
      ) : (
        <>
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-sm">
              <thead>
                <tr className="bg-gray-100 text-gray-700 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Produk</th>
                  <th className="py-3 px-6 text-right">Harga</th>
                  <th className="py-3 px-6 text-center">Jumlah</th>
                  <th className="py-3 px-6 text-right">Total</th>
                  <th className="py-3 px-6 text-center">Aksi</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light">
                {cartItems.map(item => (
                  <tr key={item.id} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="py-3 px-6 text-left whitespace-nowrap">
                      <div className="flex items-center">
                        <img src={item.image} alt={item.name} className="w-12 h-12 object-cover rounded-md mr-3" />
                        <span className="font-semibold">{item.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-6 text-right">Rp {item.price.toLocaleString('id-ID')}</td>
                    <td className="py-3 px-6 text-center">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.id, parseInt(e.target.value))}
                        className="w-16 p-2 border border-gray-300 rounded-md text-center focus:outline-none focus:ring-1 focus:ring-green-500"
                      />
                    </td>
                    <td className="py-3 px-6 text-right font-semibold">
                      Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                    </td>
                    <td className="py-3 px-6 text-center">
                      <button
                        onClick={() => onRemoveItem(item.id)}
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

          {/* Bagian Total Harga Keseluruhan */}
          <div className="flex justify-end items-center mt-6 p-4 bg-gray-100 rounded-lg shadow-sm">
            <span className="text-xl font-bold text-gray-800 mr-4">Total Belanja:</span>
            <span className="text-3xl font-extrabold text-green-700">
              Rp {totalOverallPrice.toLocaleString('id-ID')}
            </span>
          </div>

          {/* Tombol Lanjut ke Pembayaran / Checkout */}
          <div className="flex justify-between items-center mt-6">
            <button
              onClick={() => navigateTo('home')}
              className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
            >
              &larr; Lanjutkan Belanja
            </button>
            <button
              onClick={() => alert('Fitur checkout belum diimplementasikan!')} // Contoh alert
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition duration-200 text-xl font-semibold"
            >
              Lanjut ke Pembayaran
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default CartPage;