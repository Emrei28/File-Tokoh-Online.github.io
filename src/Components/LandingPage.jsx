import React from 'react';

function LandingPage({ navigateTo }) {
  return (
    <div className="relative w-full min-h-screen flex flex-col items-center justify-center text-white overflow-hidden pt-16 sm:pt-20">
      {/* Gambar Latar Belakang */}
      <div
        className="absolute inset-0 bg-cover bg-center filter brightness-75 supports-[background-attachment:fixed]:bg-fixed"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1531859131176-08f6473bf857?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MzA4fHxmbG93ZXJzfGVufDB8fDB8fHww')",
          backgroundAttachment: 'fixed', // Efek parallax hanya di desktop
        }}
      ></div>

      {/* Konten Hero Section */}
      <div className="relative z-10 text-center p-4 sm:p-6 md:p-8 bg-black bg-opacity-40 rounded-lg shadow-xl max-w-3xl mx-auto mb-8">
        <h1 className="text-3xl sm:text-4xl md:text-6xl font-extrabold mb-4 animate-fade-in-down">
          Toko Tanaman Hias Lokal
        </h1>
        <p className="text-lg sm:text-xl md:text-2xl mb-6 md:mb-8 animate-fade-in-up">
          Keindahan Hijau Langsung ke Rumah Anda.
        </p>
        <button
          onClick={() => navigateTo('products')}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 sm:py-3 sm:px-8 md:py-3 md:px-8 rounded-full text-base sm:text-lg md:text-xl transition duration-300 transform hover:scale-105 animate-pop-in"
        >
          Jelajahi Koleksi Kami
        </button>
      </div>

      {/* Bagian Keunggulan */}
      <div className="relative z-10 w-full bg-white bg-opacity-90 text-gray-800 p-4 sm:p-6 md:p-8 mt-8 sm:mt-12 md:mt-20 shadow-lg">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 text-center">
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
              alt="Kualitas Terbaik"
              className="mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto rounded-full object-cover md:rounded-none md:object-contain"
            />
            <h3 className="text-lg sm:text-xl md:text-xl font-bold mb-2">Tanaman Segar Berkualitas</h3>
            <p className="text-sm sm:text-md md:text-md">Setiap tanaman dipilih dengan cermat untuk kualitas terbaik.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1632380211596-b96123618ca8?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
              alt="Pengiriman Aman"
              className="mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto rounded-full object-cover md:rounded-none md:object-contain"
            />
            <h3 className="text-lg sm:text-xl md:text-xl font-bold mb-2">Pengiriman Aman & Cepat</h3>
            <p className="text-sm sm:text-md md:text-md">Dikemas khusus agar sampai di tangan Anda dengan selamat.</p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="https://images.unsplash.com/photo-1614594975525-e45190c55d0b?ixlib=rb-4.1.0&auto=format&fit=crop&w=500&q=60"
              alt="Panduan Perawatan"
              className="mb-4 w-12 h-12 sm:w-16 sm:h-16 md:w-auto md:h-auto rounded-full object-cover md:rounded-none md:object-contain"
            />
            <h3 className="text-lg sm:text-xl md:text-xl font-bold mb-2">Panduan Perawatan Lengkap</h3>
            <p className="text-sm sm:text-md md:text-md">Dapatkan tips dan trik agar tanaman Anda tumbuh subur.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;