import React from "react";
export default function TentangToko(props){
    return(
        <section className="customcontainer mx-auto px-6 mb-16 ">
                <p className="text-sm font-semibold p-2 md:px-7 lg:text-base">Deskripsi Toko</p>
                <p className="text-sm p-2 md:p-7 lg:text-base">
                {props.tentang}
                </p> 
            </section> 
    )
}