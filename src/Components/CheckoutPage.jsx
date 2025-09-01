import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function CheckoutPage({ cartItems, setCartItems, showNotification }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    address: '',
    city: '',
    postalCode: '',
    paymentMethod: 'transfer',
  });

  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.fullName || !formData.address || !formData.city || !formData.postalCode) {
      showNotification('Harap isi semua kolom yang diperlukan!', 'error');
      return;
    }

    console.log('Pesanan dikirim:', { ...formData, cartItems, totalPrice });

    setCartItems([]);
    showNotification('Pesanan Anda berhasil dikirim!', 'success');
    setTimeout(() => {
      navigate('/products');
    }, 1000);
  };

  return (
    <div className="container mx-auto p-4 md:p-8 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Pembayaran</h2>

      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Detail Pengiriman</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label htmlFor="fullName" className="block text-gray-700 font-semibold mb-1">Nama Lengkap</label>
              <input
                type="text"
                id="fullName"
                name="fullName"
                value={formData.fullName}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="address" className="block text-gray-700 font-semibold mb-1">Alamat</label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="city" className="block text-gray-700 font-semibold mb-1">Kota</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="postalCode" className="block text-gray-700 font-semibold mb-1">Kode Pos</label>
              <input
                type="text"
                id="postalCode"
                name="postalCode"
                value={formData.postalCode}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                required
              />
            </div>
            <div>
              <label htmlFor="paymentMethod" className="block text-gray-700 font-semibold mb-1">Metode Pembayaran</label>
              <select
                id="paymentMethod"
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
              >
                <option value="transfer">Transfer Bank</option>
                <option value="cod">Bayar di Tempat (COD)</option>
                <option value="credit">Kartu Kredit</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-green-500 text-white py-3 px-6 rounded-lg hover:bg-green-600 transition duration-200 text-xl font-semibold"
            >
              Konfirmasi Pesanan
            </button>
          </form>
        </div>

        <div className="md:w-1/2">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ringkasan Pesanan</h3>
          <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between mb-3">
                <span className="text-gray-700">{item.name} (x{item.quantity})</span>
                <span className="text-gray-700 font-semibold">
                  Rp {(item.price * item.quantity).toLocaleString('id-ID')}
                </span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-lg border-t border-gray-200 pt-3">
              <span>Total:</span>
              <span>Rp {totalPrice.toLocaleString('id-ID')}</span>
            </div>
          </div>
          <button
            onClick={() => navigate('/cart')}
            className="mt-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition duration-200"
          >
            Kembali ke Keranjang
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutPage;