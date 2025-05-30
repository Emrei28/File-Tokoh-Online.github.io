// src/components/AboutPage.jsx
import React from 'react';

function AboutPage() {
  return (
    <section className="container mx-auto p-4 md:p-8 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Tentang Kami</h2>
      <div className="text-lg text-gray-700 leading-relaxed">
        <p className="mb-4">
          Selamat datang di Toko Tanaman Hias Lokal, sumber utama Anda untuk semua kebutuhan tanaman hias. Kami berdedikasi untuk memberikan Anda tanaman hias terbaik, dengan fokus pada kualitas, keunikan, dan pelayanan pelanggan yang tak tertandingi.
        </p>
        <p className="mb-4">
          Didirikan pada tahun 2023, Toko Tanaman Hias Lokal telah berkembang pesat dari sekadar hobi menjadi bisnis yang melayani pecinta tanaman di seluruh Indonesia. Kami sangat antusias untuk berbagi kecintaan kami pada tanaman hias dengan Anda.
        </p>
        <p className="mb-4">
          Kami percaya bahwa setiap rumah dan kantor akan lebih indah dan sehat dengan sentuhan hijau. Oleh karena itu, kami dengan cermat memilih setiap tanaman dalam koleksi kami, memastikan mereka tumbuh dalam kondisi terbaik dan siap untuk mempercantik ruangan Anda.
        </p>
        <p className="mb-4">
          Selain menjual tanaman, kami juga berkomitmen untuk memberikan panduan perawatan yang mudah dipahami agar tanaman Anda tumbuh subur dan bahagia. Kami juga menyediakan berbagai aksesoris pendukung seperti pot, pupuk, dan media tanam.
        </p>
        <p>
          Kami harap Anda menikmati produk kami sebanyak kami menikmati menawarkannya kepada Anda. Jika Anda memiliki pertanyaan atau komentar, jangan ragu untuk menghubungi kami.
        </p>
        <p className="mt-6 text-center font-semibold text-green-700">
          Salam Hangat,<br/>Tim Toko Tanaman Hias Lokal
        </p>
      </div>
    </section>
  );
}

export default AboutPage;