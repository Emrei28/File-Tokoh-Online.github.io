// src/components/RegisterPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function RegisterPage({ onLoginSuccess, showNotification }) {
  const [full_name, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postal_code, setPostalCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleManualRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post('/api/auth/register', {
        full_name,
        email,
        password,
        address,
        city,
        postal_code,
      });

      const { token, user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      onLoginSuccess(token, user);
      showNotification('Registrasi berhasil! Selamat datang!', 'success');
      navigate('/products');
      
    } catch (error) {
      console.error('Registrasi gagal:', error.response?.data?.error || error.message);
      showNotification(error.response?.data?.error || 'Registrasi gagal. Coba lagi.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Daftar Akun Baru</h2>
        
        <form onSubmit={handleManualRegister} className="space-y-4">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="full_name">Nama Lengkap</label>
            <input type="text" id="full_name" value={full_name} onChange={(e) => setFullName(e.target.value)} required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="address">Alamat (Opsional)</label>
            <input type="text" id="address" value={address} onChange={(e) => setAddress(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="city">Kota (Opsional)</label>
            <input type="text" id="city" value={city} onChange={(e) => setCity(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="postal_code">Kode Pos (Opsional)</label>
            <input type="text" id="postal_code" value={postal_code} onChange={(e) => setPostalCode(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition" />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400"
            disabled={loading}
          >
            {loading ? 'Sedang memproses...' : 'Daftar'}
          </button>
        </form>

        <p className="mt-6 text-center text-gray-600">
          Sudah punya akun?{' '}
          <Link to="/login" className="text-green-600 font-medium hover:underline">
            Masuk
          </Link>
        </p>
      </div>
    </div>
  );
}

export default RegisterPage;