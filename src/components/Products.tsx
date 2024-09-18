'use client'

import '@/styles/products.scss'
import data from '@/lib/data.json';
import { useState } from 'react';
import { useRouter } from 'next/router';
import Card from './Card';
import Cart from './Cart';

interface Product {
    image: { thumbnail: string; mobile: string; tablet: string; desktop: string; };
    category: string;
    name: string;
    price: number;
    quantity: number;
}

interface CartI {
    products: Product[];
    totalQuantity: number;
    totalPrice: number;
}

export default function Products() {

    const [products, setProducts] = useState<Product[]>(
        data.map(product => ({
            ...product,
            quantity: 0
        }))
    );

    const [cart, setCart] = useState<CartI>({
        products: [],
        totalQuantity: 0,
        totalPrice: 0
    });




    return (
        <div className="container">
            <div className='products__market'>
                <h2 className='heading'>
                    Desserts
                </h2>
                <div className="products__items">

                    {products.map((item, index) => {
                        return <Card product={item} setProducts={setProducts} index={index} key={index} setCart={setCart} />
                    })}
                </div>
            </div>
            {/* <div className='cart__products'> */}
                <Cart cart={cart} setCart={setCart} setProducts={setProducts} />
            {/* </div> */}
        </div>
    )
}