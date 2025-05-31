// src/components/Notification.jsx
import React, { useEffect, useState } from 'react';

// ❤️ BARIS BARU: Komponen Notifikasi
function Notification({ message = '', type = 'info', isVisible, onClose }) {
  const [animationClass, setAnimationClass] = useState('');

  useEffect(() => {
    if (isVisible) {
      setAnimationClass('animate-slide-down'); // Animasi muncul
      const timer = setTimeout(() => {
        setAnimationClass('animate-slide-up'); // Animasi menghilang
        // Beri sedikit waktu untuk animasi sebelum benar-benar menutup
        const closeTimer = setTimeout(() => {
          onClose();
        }, 300); // Sesuaikan dengan durasi animasi slide-up
        return () => clearTimeout(closeTimer);
      }, 3000); // Notifikasi akan hilang setelah 3 detik

      return () => clearTimeout(timer);
    } else {
      setAnimationClass(''); // Reset animasi saat tidak terlihat
    }
  }, [isVisible, onClose]);

  if (!isVisible && animationClass === '') return null; // Jangan render jika tidak terlihat dan tidak ada animasi

  // Menentukan warna background berdasarkan type notifikasi
  let bgColor = 'bg-blue-500'; // Default
  switch (type) {
    case 'success':
      bgColor = 'bg-green-500';
      break;
    case 'error':
      bgColor = 'bg-red-500';
      break;
    case 'warning':
      bgColor = 'bg-yellow-500';
      break;
    case 'info':
      bgColor = 'bg-blue-500';
      break;
    default:
      bgColor = 'bg-gray-700'; // Untuk tipe tidak dikenal
  }

  return (
    <div className={`fixed top-0 left-0 w-full p-4 text-white text-center shadow-lg z-50 transform
                    ${bgColor} ${animationClass}
                    ${isVisible ? 'block' : 'hidden'}`}> {/* Pastikan ini selalu terlihat saat isVisible true */}
      {message}
      {/* Opsional: Tombol tutup */}
      <button
        onClick={onClose}
        className="absolute top-1 right-3 text-2xl font-bold hover:text-gray-200"
        aria-label="Tutup notifikasi"
      >
        &times;
      </button>
    </div>
  );
}

export default Notification;