import React from "react";
import { useDispatch} from "react-redux";
import { isDisplayModalFunc } from "../../../action";

export default function ModalDetailProduct(){
    const dispatch = useDispatch();
    
    return(
        <div className="w-full h-full bg-black-rgba fixed z-50 left-0 right-0  top-0 bottom-0">
            <div className="w-72 md:w-100 h-auto rounded-lg p-5 mx-auto shadow-lg bg-slate-50 mt-36">
                <button className="w-full flex justify-end" onClick={()=>dispatch(isDisplayModalFunc(false))}>X</button>
                <p className="font-bold text-sm mb-2">Peringkat kondisi untuk produk</p>
                <p className="font-light text-sm mb-2 leading-5">Tim dari ThriftHouse selalu mengevaluasi setiap produk yang dikirim untuk kondisi dan kualitas. Setiap produk yang tidak memenuhi kriteria penerimaan perusahaan kami ditolak. Peringkat kategori kondisi terdaftar dalam urutan sebagai berikut:</p>
                <ul className="px-4 ">
                    <li className="list-disc font-light text-sm leading-5"><span className="font-semibold text-sm">Baru dengan Tag :</span><br/> Barang yang terlihat baru dan masih memiliki tag.</li>
                    <li className="list-disc font-light text-sm leading-5"><span className="font-semibold text-sm">Seperti Baru : </span><br/>Barang kondisi sangat baik, tetapi tanpa tag.</li>
                    <li className="list-disc font-light text-sm leading-5"><span className="font-semibold text-sm">Baik : </span><br/>Barang bekas dalam kondisi sangat baik! Tidak ada noda atau cacat.</li>
                    <li className="list-disc font-light text-sm leading-5"><span className="font-semibold text-sm">Cukup :</span><br/> Barang bekas layak pakai dengan tanda pemakaian sehari-hari.</li>
                </ul>
            </div>
        </div>
    )

}