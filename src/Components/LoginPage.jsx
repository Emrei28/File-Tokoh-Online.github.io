// src/components/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

function LoginPage({ onLoginSuccess, showNotification }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await axios.post(
        'https://tokoh-online-server.vercel.app/api/auth/login',
        { email, password }
      );

      const { token, user } = response.data;

      // Simpan token dan data user ke localStorage
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      // Panggil fungsi dari App.jsx untuk memperbarui state
      onLoginSuccess(token, user);
      
      // Tampilkan notifikasi dan arahkan ke halaman utama
      if (showNotification) {
        showNotification('Login berhasil! Selamat datang kembali.', 'success');
      }
      navigate('/products');

    } catch (error) {
      console.error('Login error:', error.response?.data?.error || error.message);
      if (showNotification) {
        showNotification(
          error.response?.data?.error || 'Login gagal. Coba lagi.',
          'error'
        );
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Masuk ke Akun Anda</h2>
        <form onSubmit={handleLogin} className="space-y-6">
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2" htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500 focus:border-transparent transition"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white font-bold py-3 px-4 rounded-md hover:bg-green-700 transition duration-300 disabled:bg-green-400"
            disabled={loading}
          >
            {loading ? 'Sedang memproses...' : 'Masuk'}
          </button>
        </form>
        <p className="mt-6 text-center text-gray-600">
          Belum punya akun?{' '}
          <Link to="/register" className="text-green-600 font-medium hover:underline">
            Daftar sekarang
          </Link>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;