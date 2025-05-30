// src/components/ContactPage.jsx
import React from 'react';

function ContactPage() {
  return (
    <section className="container mx-auto p-4 md:p-8 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Hubungi Kami</h2>
      <div className="text-lg text-gray-700 leading-relaxed">
        <p className="mb-4">
          Kami selalu senang mendengar dari Anda! Jika Anda memiliki pertanyaan, saran, atau hanya ingin menyapa, jangan ragu untuk menghubungi kami melalui informasi di bawah ini.
        </p>

        <div className="bg-gray-50 p-6 rounded-lg mb-6 shadow-sm">
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Informasi Kontak</h3>
          <p className="mb-2">
            <span className="font-semibold">Email:</span> info.tanamanhiaslokal@email.com
          </p>
          <p className="mb-2">
            <span className="font-semibold">Telepon:</span> +62 812-3456-7890
          </p>
          <p className="mb-2">
            <span className="font-semibold">Alamat:</span> Jl. Flora Indah No. 123, Kebun Raya, Bogor, Jawa Barat, Indonesia
          </p>
        </div>

        <h3 className="text-xl font-semibold text-gray-800 mb-3">Jam Operasional</h3>
        <p className="mb-4">
          Senin - Jumat: 09.00 - 17.00 WIB<br/>
          Sabtu: 10.00 - 14.00 WIB<br/>
          Minggu & Hari Libur Nasional: Tutup
        </p>

        <p className="mt-6 text-center font-semibold text-green-700">
          Kami akan berusaha membalas pesan Anda sesegera mungkin.
        </p>
      </div>
    </section>
  );
}

export default ContactPage;