'use client'
import "@/styles/page.scss";
import Products from "@/components/Products";
import Cart from "@/components/Cart";
import { useState } from "react";

export default function Main() {

    const [ products, setProducts ] = useState([]);
    
    return (
    <>
        <Cart />
        <Products />
    </>
    );
}
