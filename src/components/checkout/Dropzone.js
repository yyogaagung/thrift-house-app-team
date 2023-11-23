import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Icon } from "@iconify/react";

const Dropzone = ({ image, setImage }) => {
  // handle dropzone
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();

        reader.onabort = () => console.log("file reading was aborted");
        reader.onerror = () => console.log("file reading has failed");
        reader.onload = () => {
          setImage([
            {
              src: reader.result,
              name: file.path,
              size: file.size,
              file: file,
            },
          ]);
        };
        reader.readAsDataURL(file);
      });
    },
    [setImage]
  );

  // dropzone hooks
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
    accept: {
      "image/jpeg": [".jpeg", ".png"],
    },
    disabled: image.length > 0,
  });

  return (
    <div className="thisisdragndrop text-[#B4B4B4]">
      <div
        {...getRootProps()}
        className={`border border-[#B4B4B4] border-dashed ${
          image.length === 0
            ? "cursor-pointer py-6 sm:py-[70px] px-12"
            : "p-3 sm:p-8"
        } rounded-lg`}
      >
        <input {...getInputProps()} />
        {image.length === 0 ? (
          <>
            {isDragActive ? (
              <div>
                <Icon
                  icon="bi:cloud-arrow-up-fill"
                  height="100%"
                  color="#4DB680"
                  className="mx-auto mb-7 w-8 h-8 sm:w-14 sm:h-14"
                />
                <p className="text-center text-sm sm:text-base mb-6 font-bold text-gogreen">
                  Drop file here...
                </p>
                <ul className="list-disc flex flex-col sm:flex-row text-xs sm:text-base">
                  <div className="basis-1/2">
                    <li className="mb-3">
                      Pastikan gambar bukti pembayaranmu jelas
                    </li>
                    <li className="mb-3">Format gambar .jpeg atau .png</li>
                  </div>
                  <div className="basis-1/2">
                    <li className="mb-3">
                      Pastikan nominal sesuai dengan tagihan
                    </li>
                    <li className="mb-3">Maksimal ukuran file 2mb</li>
                  </div>
                </ul>
              </div>
            ) : (
              <div>
                <Icon
                  icon="bi:cloud-arrow-up-fill"
                  height="100%"
                  color="#B4B4B4"
                  className="mx-auto mb-7 w-8 h-8 sm:w-14 sm:h-14"
                />
                <p className="text-center text-sm sm:text-base mb-6">
                  Seret dan lepas gambar, atau{" "}
                  <span className="font-bold text-gogreen">Jelajahi</span>
                </p>
                <ul className="list-disc flex flex-col sm:flex-row text-xs sm:text-base">
                  <div className="basis-1/2">
                    <li className="mb-3">
                      Pastikan gambar bukti pembayaranmu jelas
                    </li>
                    <li className="mb-3">Format gambar .jpeg atau .png</li>
                  </div>
                  <div className="basis-1/2">
                    <li className="mb-3">
                      Pastikan nominal sesuai dengan tagihan
                    </li>
                    <li className="mb-3">Maksimal ukuran file 2mb</li>
                  </div>
                </ul>
              </div>
            )}
          </>
        ) : (
          <div className="relative flex flex-col sm:flex-row items-center">
            <Icon
              icon="ph:x-circle-fill"
              height="40"
              className="absolute right-0 top-0 cursor-pointer text-[#0C0D36]"
              onClick={(e) => {
                e.stopPropagation();
                setImage([]);
              }}
            />
            <div className="w-[245px] mr-7 mb-3 sm:mb-0">
              <img
                src={image[0].src}
                alt={image[0].name}
                className="w-full h-auto object-contain"
              />
            </div>
            <div>
              <p className="text-sm sm:text-base text-[#0C0D36] mb-2 sm:mb-6 text-center sm:text-left">
                {image[0].name}
              </p>
              <p className="text-sm sm:text-base text-[#0C0D36] text-center sm:text-left">
                <Icon
                  icon="ep:success-filled"
                  height="24"
                  className="text-gogreen inline"
                />{" "}
                Upload berhasil ({(image[0].size / 1000000).toFixed(2)} Mb)
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dropzone;
