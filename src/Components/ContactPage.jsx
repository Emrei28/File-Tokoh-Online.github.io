// src/components/ContactPage.jsx
import { useState } from 'react'; // Import useState

function ContactPage() {
  // State untuk menyimpan nilai input formulir
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false); // State untuk konfirmasi pengiriman

  // Fungsi untuk menangani perubahan input
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleMessageChange = (e) => setMessage(e.target.value);

  // Fungsi untuk menangani pengiriman formulir
  const handleSubmit = (e) => {
    e.preventDefault(); // Mencegah refresh halaman default browser

    // Log data formulir ke konsol (simulasi pengiriman)
    console.log('Formulir Kontak Dikirim:', { name, email, message });

    // Untuk aplikasi nyata, di sini Anda akan mengirim data ke server
    // Contoh:
    // fetch('/api/contact', {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ name, email, message }),
    // })
    // .then(response => response.json())
    // .then(data => {
    //   console.log('Success:', data);
    //   alert('Pesan Anda berhasil dikirim!');
    //   setIsSubmitted(true);
    // })
    // .catch((error) => {
    //   console.error('Error:', error);
    //   alert('Terjadi kesalahan saat mengirim pesan.');
    // });

    // Tampilkan pesan sukses dan reset formulir
    setIsSubmitted(true);
    setName('');
    setEmail('');
    setMessage('');

    // Opsional: Atur ulang isSubmitted setelah beberapa detik
    setTimeout(() => {
        setIsSubmitted(false);
    }, 5000);
  };

  return (
    <section className="container mx-auto p-4 md:p-8 mt-8 bg-white shadow-md rounded-lg">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Hubungi Kami</h2>
      <div className="text-lg text-gray-700 leading-relaxed">
        <p className="mb-4">
          Kami selalu senang mendengar dari Anda! Jika Anda memiliki pertanyaan, saran, atau hanya ingin menyapa, jangan ragu untuk menghubungi kami melalui formulir di bawah ini atau informasi kontak yang tersedia.
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

        <h3 className="text-xl font-semibold text-gray-800 mb-3">Kirim Pesan kepada Kami</h3>
        {isSubmitted && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative mb-4" role="alert">
                <strong className="font-bold">Sukses!</strong>
                <span className="block sm:inline ml-2">Pesan Anda telah berhasil dikirim.</span>
            </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="name" className="block text-gray-700 text-sm font-bold mb-2">
              Nama Anda:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={handleNameChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-gray-700 text-sm font-bold mb-2">
              Email Anda:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={handleEmailChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-gray-700 text-sm font-bold mb-2">
              Pesan Anda:
            </label>
            <textarea
              id="message"
              name="message"
              rows="5"
              value={message}
              onChange={handleMessageChange}
              className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-green-500"
              required
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition duration-200"
            >
              Kirim Pesan
            </button>
          </div>
        </form>

        <h3 className="text-xl font-semibold text-gray-800 mb-3 mt-8">Jam Operasional</h3>
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