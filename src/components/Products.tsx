'use client'

import '@/styles/products.scss'
import Card from './Card';
import data from '@/lib/data.json';
import { useState } from 'react';
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

    const removeItem = (product: Product) => {
        
        setCart((prevCart) => {
            console.log(prevCart)
            if (prevCart.totalQuantity === 1) {
                return { ...prevCart, products: [], totalPrice: 0, totalQuantity: 0 }

            } else {

                const updatedCartProducts = prevCart.products.map((cartProduct) => (
                    cartProduct.name === product.name ? { ...cartProduct, quantity: cartProduct.quantity - 1 } : cartProduct
                ))
                if (product.quantity > 1) {

                    return ({
                        ...prevCart,
                        products: updatedCartProducts,
                        totalPrice: prevCart.totalPrice - product.price,
                        totalQuantity: prevCart.totalQuantity - 1
                    })

                } else {
                    const updatedCart = prevCart.products.filter((cartProduct) => cartProduct.name !== product.name)
                    return ({
                        ...prevCart,
                        products: updatedCart,
                        totalPrice: prevCart.totalPrice - product.price,
                        totalQuantity: prevCart.totalQuantity - 1
                    })
                }
            }

        })
        setProducts((prevProducts) => {

            return prevProducts.map((item) => {

                return product.name === item.name ? { ...item, quantity: item.quantity - 1} : item;

            })

        });
    }


    return (
        <> <h2 className='heading'>
        Desserts
    </h2>
            <div className='products'>
               
                <div className="products__items">

                    {products.map((item, index) => {
                        return <Card product={item} setProducts={setProducts} index={index} key={index} setCart={setCart} removeItem={() => removeItem(item)}/>
                    })}
                </div>
            </div>
            <div className='cart__products'>
                <Cart cart={cart} setCart={setCart} setProducts={setProducts} removeItem={() => removeItem(item)}/>
            </div>
        </>
    )
}