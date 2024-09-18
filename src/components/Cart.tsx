import '@/styles/cart.scss';
import Image from 'next/image';
import emptyCart from '/public/images/illustration-empty-cart.svg';
import carbonNeutral from '/public/images/icon-carbon-neutral.svg'
import { useState } from 'react';
import Modal from './Modal';
import RemoveProduct from '@/components/RemoveProduct'

interface Product {
    image: { thumbnail: string; mobile: string; tablet: string; desktop: string; };
    name: string;
    price: number;
    quantity: number;
    category: string;
}

interface Cart {
    products: Product[],
    totalQuantity: number,
    totalPrice: number
}
interface CartProps {
    cart: Cart;
    setCart: React.Dispatch<React.SetStateAction<Cart>>;
    setProducts: React.Dispatch<React.SetStateAction<Product[]>>;

}


const Cart: React.FC<CartProps> = ({ cart, setCart, setProducts }) => {
    const [openModal, setOpenModal] = useState(false)

    const removeItem = (product: Product) => {
        
        setCart((prevCart) => {
            
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

    const onOrderClick = () => {
        setOpenModal(true)
    }

    const closeModal = () => {
        setOpenModal(false)
        setCart((prevCart) => {
            return { ...prevCart, totalQuantity: 0, products: [], totalPrice: 0 }
        })
        setProducts((prevProducts) => {
            return prevProducts.map((item) => {
                return { ...item, quantity: item.quantity = 0 }
            })
        });
    }

    return (
        <div className="cart">
            <h2 className="cart__heading">Your Cart ({cart.totalQuantity})</h2>
            <div className="cart__details">
                {cart.totalQuantity == 0 ?
                    <>
                        <Image src={emptyCart} alt="Empty Cart" width={150} height={150} />
                        <p>Your added items will appear here</p></> :
                    <div>
                        {
                            cart.products.map((product, index) => (
                                <div key={index} className="cart__product">
                                    <div className="cart__product--info">
                                        <h3 className='cart__product--name'>{product.name}</h3>
                                        <p><span className='cart__product--qty'>{product.quantity}x </span> @ ${product.price} <span>${(product.price * product.quantity).toFixed(2)}</span> </p>
                                    </div>
                                    <button onClick={() => removeItem(product)}>
                                        <div className="cart__product--button">
                                            <RemoveProduct />
                                        </div>
                                    </button>
                                </div>
                            ))
                        }

                        <div className="cart__order">
                            <p className="cart__order--total">Order total: <span>${cart.totalPrice.toFixed(2)}</span></p>
                            <p><Image src={carbonNeutral} alt="Empty Cart" width={20} height={20} /> This is a <span>carbon-neutral</span> delivery</p>
                            <button className='cart__order__confirm' onClick={onOrderClick}>Confirm Order</button>
                        </div>
                    </div>
                }

            </div>

            {openModal && <Modal isOpen={openModal} closeModal={closeModal}><div>
                {
                    cart.products.map((product, index) => (
                        <div key={index} className="cart__product">
                            <div className="cart__product--info">
                                <h3 className='cart__product--name'>{product.name}</h3>
                                <p><span className='cart__product--qty'>{product.quantity}x </span> @ ${product.price.toFixed(2)} </p>
                            </div>
                            <div className="cart__product--price"><span>${(product.price * product.quantity).toFixed(2)}</span> </div>
                        </div>
                    ))
                }
                <div className="cart__order">
                    <p className="cart__order--total">Order total: <span>${cart.totalPrice.toFixed(2)}</span></p>


                </div>
            </div>
            </Modal>}
        </div>

    )
}

export default Cart;