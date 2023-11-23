import { useNavigate } from "react-router-dom";

const PanduanPembayaran = () => {
  const navigate = useNavigate();

  return (
    <div className="customcontainer mx-auto max-w-[716px] px-6 my-10">
      <h3 className="font-bold text-sm sm:text-2xl mb-4 sm:mb-10 text-center">
        Panduan pembayaran
      </h3>
      <div className="mb-4 sm:mb-6">
        <p className="font-bold text-xs sm:text-xl mb-2 sm:mb-4">
          Internet Banking BNI
        </p>
        <ul className="list-disc text-xs sm:text-base ml-4">
          <li>Login ke BNI Mobile Application</li>
          <li>
            Pilih Transaksi lalu pilih Transfer lalu pilih Virtual Account
            Billing
          </li>
          <li>Masukkan nomor virtual account BNI kamu</li>
          <li>
            Ikuti instruksi untuk menyelesaikan transaksi Internet Banking BNI
          </li>
        </ul>
      </div>

      <div className="mb-4 sm:mb-6">
        <p className="font-bold text-xs sm:text-xl mb-2 sm:mb-4">
          Mobile Banking BNI
        </p>
        <ul className="list-disc text-xs sm:text-base ml-4">
          <li>Login ke Internet Banking</li>
          <li>
            Pilih Transaksi lalu pilih Transfer lalu pilih Virtual Account
            Billing
          </li>
          <li>Masukkan nomor virtual account BNI kamu</li>
          <li>Masukkan nominal sesuai tagihan</li>
          <li>
            Ikuti instruksi untuk menyelesaikan transaksi Internet Banking BNI
          </li>
        </ul>
      </div>

      <div className="mb-4 sm:mb-6">
        <p className="font-bold text-xs sm:text-xl mb-2 sm:mb-4">
          SMS Banking BNI
        </p>
        <ul className="list-disc text-xs sm:text-base ml-4">
          <li>Masukkan angka 3346 pada bagian penerima SMS</li>
          <li>
            Format SMS: TRANSFER spasi_no_ virtual_account spasi nominal yang
            harus dibayarkan
          </li>
          <li>Contoh: TRANSFER_123456_200000</li>
          <li>Kirim</li>
          <li>Ikuti instruksi Selanjutnya untuk menyelesaikan transaksi</li>
        </ul>
      </div>

      <div className="mb-4 sm:mb-8">
        <p className="font-bold text-xs sm:text-xl mb-2 sm:mb-4">ATM BNI</p>
        <ul className="list-disc text-xs sm:text-base ml-4">
          <li>Masukkan kartu ATM dan PIN kamu</li>
          <li>Masuk ke pilihan Menu Lain lalu pilih Transfer</li>
          <li>Pilih rekening tujuan ke rekening BNI</li>
          <li>Masukkan nomor virtual account BNI kamu</li>
          <li>Masukkan nominal sesuai tagihan</li>
          <li>Ikuti instruksi untuk menyelesaikan transaksi</li>
        </ul>
      </div>

      <button
        className="bg-gogreen py-4 w-full rounded-lg text-white"
        onClick={() => navigate(-1)}
      >
        Kembali ke pembayaran
      </button>
    </div>
  );
};

export default PanduanPembayaran;
