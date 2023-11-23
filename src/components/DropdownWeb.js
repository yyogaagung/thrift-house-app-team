import { Link } from "react-router-dom";

const DropdownWeb = ({ isDropdownOpen }) => {
  return (
    <>
      <div className="relative customcontainer mx-auto">
        {/* dropdown web */}
        <div
          className={`dropdownContent customcontainer mx-auto py-7 px-6 space-x-16 absolute z-20 bg-white w-full ${
            isDropdownOpen === "Pria" ? "flex" : "hidden"
          }`}
        >
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Atasan</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kaos Lengan pendek
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kaos Lengan panjang
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kemeja
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Polo
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Bawahan</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Celana pendek
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Celana panjang
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Casual
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jeans
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Luaran</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Crewneck
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Hoodie
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jaket
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jas
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Mantel
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sweater
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Sepatu</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Boots
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Formal
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sendal
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Slip on
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sneakers
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Olahraga
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Aksesoris</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Ikat Pinggang
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jam
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kacamata
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Topi
              </Link>
            </span>
          </div>
          <div>
            <img src="/images/navbar-pria.png" alt="navbar-pria" />
          </div>
        </div>
      </div>

      <div className="relative customcontainer mx-auto">
        {/* wanita */}
        <div
          className={`dropdownContent customcontainer mx-auto py-7 px-6 space-x-16 absolute z-20 bg-white w-full ${
            isDropdownOpen === "Wanita" ? "flex" : "hidden"
          }`}
        >
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Atasan</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kaos Lengan pendek & 3/4
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kaos Lengan panjang
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kemeja & Blus
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Gaun
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Bawahan</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Celana pendek
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Celana panjang
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Rok pendek & 3/4
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Rok panjang
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Luaran</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Cardigan
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Crewneck
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Hoodie
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jaket
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jas
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Mantel
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sweater
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Sepatu</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Boots
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Heels & Wedges
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sendal
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Slip on
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sneakers
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Olahraga
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Aksesoris</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Ikat Pinggang
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jam
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kacamata
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Topi
              </Link>
            </span>
          </div>
          <div>
            <img src="/images/navbar-wanita.png" alt="navbar-pria" />
          </div>
        </div>
      </div>

      <div className="relative customcontainer mx-auto">
        {/* anak */}
        <div
          className={`dropdownContent customcontainer mx-auto py-7 px-6 space-x-16 absolute z-20 bg-white w-full ${
            isDropdownOpen === "Anak-anak" ? "flex" : "hidden"
          }`}
        >
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Atasan</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kaos Lengan pendek
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kaos Lengan panjang
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kemeja & Blus
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Gaun
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Polo
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Bawahan</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Celana pendek
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Celana panjang
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Rok pendek & 3/4
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Rok panjang
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Luaran</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Cardigan
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Crewneck
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Hoodie
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jaket
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Jas
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Mantel
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sweater
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Sepatu</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Boots
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Formal
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Heels & Wedges
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sendal
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Slip on
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Sneakers
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Olahraga
              </Link>
            </span>
          </div>
          <div className="flex flex-col">
            <h4 className="font-semibold text-xl mb-2">Aksesoris</h4>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Kacamata
              </Link>
            </span>
            <span>
              <Link to="/" className="hover:text-gogreen">
                Topi
              </Link>
            </span>
          </div>
          <div>
            <img src="/images/navbar-anak.png" alt="navbar-pria" />
          </div>
        </div>
      </div>
    </>
  );
};

export default DropdownWeb;
