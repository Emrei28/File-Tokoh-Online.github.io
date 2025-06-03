// src/components/Footer.jsx
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

function Footer() {
  const year = new Date().getFullYear(); // Ambil tahun saat ini

  return (
    <footer className="bg-green-800 text-white p-6 mt-12">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center text-center md:text-left max-sm:pt-20 ">
        <div className="mb-4 md:mb-0">
          <h3 className="text-2xl font-bold mb-2">Toko Tanaman Hias Lokal</h3>
          <p className="text-sm text-green-200">Menyediakan keindahan hijau untuk rumah Anda.</p>
        </div>
        <div className="mb-4 md:mb-0">
          <h4 className="font-semibold text-lg mb-2">Navigasi Cepat</h4>
          <ul className="space-y-1">
            <li><a href="#" className="text-green-200 hover:text-white transition duration-200">Beranda</a></li>
            <li><a href="#" className="text-green-200 hover:text-white transition duration-200">Produk</a></li>
            <li><a href="#" className="text-green-200 hover:text-white transition duration-200">Tentang Kami</a></li>
            <li><a href="#" className="text-green-200 hover:text-white transition duration-200">Kontak</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-2">Ikuti Kami</h4>
          <div className="flex justify-center md:justify-start space-x-4">
            <a href="#" className="text-green-200 hover:text-white"><FontAwesomeIcon icon={faFacebookF} /> Facebook</a>
            <a href="#" className="text-green-200 hover:text-white"><FontAwesomeIcon icon={faInstagram} /> Instagram</a>
            <a href="#" className="text-green-200 hover:text-white"><FontAwesomeIcon icon={faTwitter} /> Twitter</a>
          </div>
        </div>
      </div>
      <div className="border-t border-green-700 mt-6 pt-4 text-center text-sm text-green-300">
        &copy; {year}{<a href= 'https://www.instagram.com/_emreiii?igsh=MWpkMnNkZGI4azlvaA==' style={{color: 'black'}}> @MReihan</a>} Toko Tanaman Hias Lokal. Semua Hak Dilindungi.
      </div>
    </footer>
  );
}

export default Footer;