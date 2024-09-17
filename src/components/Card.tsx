'use client'

import '@/styles/card.scss';
import Image from 'next/image';
import addtoCartIcon from '/public/images/icon-add-to-cart.svg';
import DecrementIcon from '@/components/DecrementIcon';
import IncrementIcon from '@/components/IncrementIcon';

interface Product {
    image: { thumbnail: string; mobile: string; tablet: string; desktop: string; };
    name: string;
    price: number;
    quantity: number;
    category: string;
}

interface cartState {
    products: Product[];
    totalQuantity: number;
    totalPrice: number;
}
interface Cart {
    products: Product[],
    totalQuantity: number,
    totalPrice: number
}
interface CardProps {
    product: Product;
    setCart: React.Dispatch<React.SetStateAction<cartState>>;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
    index: number;
}

const Card: React.FC<CardProps> = ({ product, setProducts, setCart, index }) => {

    const addQuantity = () => {
        setProducts((prevProducts) => {

            return prevProducts.map((item, i) => {

                return index === i ? { ...item, quantity: item.quantity + 1 } : item;

            })

        });


        setCart((prevItems) => {
            const existingProduct = prevItems.products.find((item) => item.name === product.name);

            if (existingProduct) {
                const updatedProducts = prevItems.products.map((cartItem) => {
                    return product.name === cartItem.name ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
                });
                return {
                    products: updatedProducts,
                    totalQuantity: prevItems.totalQuantity + 1,
                    totalPrice: prevItems.totalPrice + product.price
                }
            } else {
                return {
                    products: [...prevItems.products, { ...product, quantity: 1 }],
                    totalQuantity: prevItems.totalQuantity + 1,
                    totalPrice: prevItems.totalPrice + product.price
                }
            }

        })

    }

    const subQuantity = () => {
    
        setProducts((prevProducts) => {

            return prevProducts.map((item, i) => {

                return index === i ? { ...item, quantity: item.quantity - 1 } : item;

            })

           
        });


        setCart((prevItems) => {
            // const existingProduct = prevItems.products.find((item) => item.name === product.name);

            if (product.quantity > 1) {
                const updatedProducts = prevItems.products.map((cartItem) => {
                    return product.name === cartItem.name ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
                });
                return {
                    products: updatedProducts,
                    totalQuantity: prevItems.totalQuantity - 1,
                    totalPrice: prevItems.totalPrice - product.price
                }
            } else {
                const updatedCart = prevItems.products.filter((cartProduct) => cartProduct.name !== product.name)
                return {
                    products:updatedCart,
                    totalQuantity: prevItems.totalQuantity - 1,
                    totalPrice: prevItems.totalPrice - product.price
                }
            }

        })

    }
    return (
        <div className='card' >
            <Image width={300} height={300} src={product.image.tablet} alt={product.name} className={`${product.quantity <= 0 ? 'card__img' : 'card__img--active'}`}/>


            {product.quantity <= 0 ?
                <div className="card__buttons">
                    <Image src={addtoCartIcon} width={20} height={20} alt='Add to Cart Button' className='card__imgBtn' />
                    <button onClick={addQuantity}>Add to cart </button>
                </div>
                :
                <div className='card__buttons--active'>
                    <button onClick={subQuantity}>
                    <div className='card__imgBtn'><DecrementIcon /></div>

                    </button>
                    {product.quantity}
                    <button onClick={addQuantity} >
                        <div className='card__imgBtn'><IncrementIcon /></div>
                    </button>
                </div>

            }

            <div className="card__info">
                <p>{product.category}</p>
                <h3>{product.name}</h3>
                <p>${product.price}</p>
            </div>

        </div>
    )
}

export default Card;