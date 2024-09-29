import React from "react";
import styles from './ModalStyle.module.css'; // Jangan lupa tambahkan style untuk modal

interface IModalProps {
    isOpen: boolean;
    onClose: () => void;
    children: React.ReactNode; // Konten di dalam modal akan dinamis
}

const Modal = ({ isOpen, onClose, children }: IModalProps) => {
    if (!isOpen) {
        return null; 
    }

    return (
        <div className={styles.modal}>
            <div className={styles.modalContent}>
                <span className={styles.close} onClick={onClose}>&times;</span>
                {children}
            </div>
        </div>
    );
};

export default Modal;
