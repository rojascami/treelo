import '@/styles/modal.scss';
import orderConfirmed from '/public/images/icon-order-confirmed.svg'
import { useRef, useEffect } from "react";
import Image from 'next/image';

interface ModalProps {
    isOpen: boolean;
    closeModal: () => void;
    children: React.ReactNode;
}
const Modal: React.FC<ModalProps> = ({isOpen, closeModal, children}) => {
    
    const modalRef = useRef<HTMLDialogElement | null>(null)
    // if (!isOpen) return null;
    useEffect(() => {
        const modalElement = modalRef.current;

        if (modalElement){
            if (isOpen){
                modalElement.showModal();
            } else {
                modalElement.close();
            }
        }
    }, [isOpen])

    
    
    return (
        <div className="backdrop" >
            <div className="modal" onClick={(e) => e.stopPropagation()}>
            <Image src={orderConfirmed} alt="Empty Cart" width={30} height={30} />
            <h2>Order Confirmed</h2>
            <p>We hope you enjoy your food!</p>
               <div className="modal__products"> 
                {children}
               </div>
                <button className='modal__end' onClick={closeModal}>Start New Order</button>
            </div>
        </div>
     
    )
}

export default Modal;