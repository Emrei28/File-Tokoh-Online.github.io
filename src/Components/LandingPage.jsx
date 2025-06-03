// src/components/LandingPage.jsx
import React from 'react';

function LandingPage({ navigateTo }) {
  return (
    <div className="relative w-full h-screen flex flex-col items-center justify-center text-white overflow-hidden pt-16 sm:pt-20"> 
      <div
        className="absolute inset-0 bg-cover bg-center brightness-75 transition-all duration-700 ease-in-out supports-[background-attachment:fixed]:bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1530209925954-8aecf4eb1e43?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fGZsb3dlcnN8ZW58MHx8MHx8fDA%3D')", // ❤️ URL Gambar Baru!
          backgroundAttachment: 'fixed', 
        }}
      ></div>

      <div className="relative z-10 text-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-50 rounded-lg shadow-2xl max-w-4xl mx-auto mb-8"> 
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
          Temukan Keindahan Hijau untuk Ruangan Anda
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up">
          Koleksi tanaman hias pilihan, siap membawa kesegaran dan inspirasi ke setiap sudut rumah Anda.
        </p>
        
        <button
          onClick={() => navigateTo('products')}
          className="bg-green-600 text-white text-xl sm:text-2xl font-bold py-3 px-8 rounded-full shadow-lg 
                     hover:bg-green-700 transform hover:scale-105 transition duration-300 ease-in-out 
                     animate-bounce-slow"
        >
          Jelajahi Koleksi Kami Sekarang!
        </button>
      </div>

      <section className="relative z-10 w-full bg-white p-8 sm:p-12 md:p-16 text-gray-800 shadow-inner mt-auto">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 text-center">
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM2fHxwYW5kYSUyMHBsYW50fGVufDB8fDB8fHww" // ❤️ URL Gambar Baru
              alt="Kualitas Terjamin"
              className="mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover shadow-md" // ❤️ Ukuran dan shadow baru
            />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Kualitas Terjamin</h3> {/* ❤️ Ukuran teks baru */}
            <p className="text-md sm:text-lg">Setiap tanaman dipilih dengan cermat untuk kualitas terbaik.</p> {/* ❤️ Ukuran teks baru */}
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1632380211596-b96123618ca8?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHxhbG9lJTIwdmVyYXxlbnwwfHwwfHx8MA%3D%3D" // ❤️ URL Gambar Baru
              alt="Pengiriman Aman"
              className="mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover shadow-md" // ❤️ Ukuran dan shadow baru
            />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Pengiriman Aman & Cepat</h3> {/* ❤️ Ukuran teks baru */}
            <p className="text-md sm:text-lg">Dikemas khusus agar sampai di tangan Anda dengan selamat.</p> {/* ❤️ Ukuran teks baru */}
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?q=80&w=500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjM2fHxwYW5kYSUyMHBsYW50fGVufDB8fDB8fHww" // ❤️ URL Gambar Baru
              alt="Panduan Perawatan"
              className="mb-4 w-20 h-20 sm:w-24 sm:h-24 md:w-28 md:h-28 rounded-full object-cover shadow-md" // ❤️ Ukuran dan shadow baru
            />
            <h3 className="text-xl sm:text-2xl font-bold mb-2">Panduan Perawatan</h3> {/* ❤️ Ukuran teks baru */}
            <p className="text-md sm:text-lg">Dapatkan tips dan panduan lengkap untuk menjaga tanaman Anda.</p> {/* ❤️ Ukuran teks baru */}
          </div>
        </div>
      </section>
    </div>
  );
}

export default LandingPage;