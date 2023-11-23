import FooterAccordion from "./FooterAccordion";
import { InlineIcon } from "@iconify/react";

function Footer() {
  return (
    <>
      <footer className="bg-[#F2F2F2] p-6 flex flex-col items-center lg:items-stretch xl:items-center lg:py-11 lg:px-16">
        <div className="flex flex-col lg:grid grid-rows-2 grid-cols-3 xl:grid-cols-4 xl:gap-12">
          <div className="flex flex-col items-center self-center w-fit col-span-1 lg:items-start lg:self-start">
            <img className="max-w-fit" src="/images/thrifthouse.png" alt="logo" />
            <h3 className="mt-4 w-56 text-sm text-center lg:text-left lg:text-base">Tempat jual-beli pakaian bekas dengan mutu berkualitas.</h3>
            <div className="flex gap-6 mt-4">
              <InlineIcon icon="bi:facebook" height="23px" />
              <InlineIcon icon="bi:instagram" height="23px" />
              <InlineIcon icon="bi:twitter" height="23px" />
            </div>
          </div>

          <FooterAccordion
            title="Dapatkan Aplikasi"
            className="mt-7 col-start-2 row-start-2 col-span-2 lg:mt-0 xl:col-start-1"
            content={
              <div className="mt-2 ml-0 flex flex-col gap-2 items-center lg:flex-row lg:mt-5">
                <a className="border-b-2 lg:border-0" href="/">
                  <img src="/images/appstore.png" alt="appstore" />
                </a>
                <a className="border-b-2 lg:border-0" href="/">
                  <img src="/images/playstore.png" alt="playstore" />
                </a>
              </div>
            }
          />
          <FooterAccordion
            title="Company Info"
            content={
              <>
                <ul className="divide-y-2 lg:divide-y-0 lg:mt-4">
                  <li className="py-2 lg:py-0 lg:mb-2">
                    <a href="/">Tentang Kami</a>
                  </li>
                  <li className="py-2 lg:py-0 lg:mb-2">
                    <a href="/">FAQ</a>
                  </li>
                  <li className="py-2 lg:py-0">
                    <a href="/">Thrifthouse care</a>
                  </li>
                </ul>
              </>
            }
          />
          <FooterAccordion
            title="Kategori"
            content={
              <>
                <ul className="divide-y-2 lg:divide-y-0 lg:mt-4">
                  <li className="py-2 lg:py-0 lg:mb-2">
                    <a href="/">Pria</a>
                  </li>
                  <li className="py-2 lg:py-0 lg:mb-2">
                    <a href="/">Wanita</a>
                  </li>
                  <li className="py-2 lg:py-0">
                    <a href="/">Anak-anak</a>
                  </li>
                </ul>
              </>
            }
          />
          <FooterAccordion
            title="Get In Touch"
            content={
              <>
                <ul className="divide-y-2 lg:divide-y-0 lg:mt-4">
                  <li className="py-2 lg:py-0 lg:mb-2">082193212345</li>
                  <li className="py-2 lg:py-0 lg:mb-2">Customer@thrifthouse.com</li>
                  <li className="py-2 lg:py-0">Jl. Prof. DR. Satrio No.3, Karet Semanggi, Kecamatan Setiabudi, Kota Jakarta Selatan, Daerah Khusus Ibukota Jakarta 12950</li>
                </ul>
              </>
            }
          />
        </div>
        <h4 className="mt-36 mb-1 text-xs text-[#8F8F8F] text-center font-medium lg:text-lg lg:font-bold lg:mt-10">Made With Love By Team A Synrgy Batch 4</h4>
      </footer>
    </>
  );
}

export default Footer;
