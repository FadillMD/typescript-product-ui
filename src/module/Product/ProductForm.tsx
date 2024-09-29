import React, { useState } from "react";
import { useAppDispatch } from "../../app/hooks";
import { createProductAction } from "./ProductSlice";
import styles from './ProductFormStyle.module.css';
import { Input } from "../../components/input";

const ProductForm = () => {
    const dispatch = useAppDispatch();

    // State untuk menyimpan data produk
    const [productName, setProductName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState(0);
    const [discount, setDiscount] = useState<number | undefined>(undefined);

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    // Handler untuk mengirim data
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        // Reset errors
        setErrors({});

        // Validasi input
        const newErrors: { [key: string]: string } = {};
        if (!productName) {
            newErrors.productName = "Nama Produk harus diisi";
        }
        if (!category) {
            newErrors.category = "Kategori harus diisi";
        }
        if (price <= 0) {
            newErrors.price = "Harga harus lebih besar dari 0";
        }
        if (discount !== undefined && discount < 0) {
            newErrors.discount = "Diskon tidak boleh kurang dari 0";
        }

        if (Object.keys(newErrors).length > 0) {
            setErrors(newErrors);
            return;
        }

        // Jika tidak ada error, kirim data
        const productData = {
            product_name: productName,
            category,
            price,
            discount,
        };
        dispatch(createProductAction(productData));
        
        // Reset input
        setProductName("");
        setCategory("");
        setPrice(0);
        setDiscount(undefined);
    };

    return (
        <div className={styles.container}>
            <form className={styles.form} onSubmit={handleSubmit}>
                <Input
                    label="Nama Produk:"
                    type="text"
                    value={productName}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setProductName(e.target.value);
                    }}
                />
                {errors.productName && <p style={{ color: 'red' }}>{errors.productName}</p>} 


                <Input
                    label="Kategori:"
                    type="text"
                    value={category}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCategory(e.target.value);
                    }}
                />
                {errors.category && <p style={{ color: 'red' }}>{errors.category}</p>} 

                <Input
                    label="Harga:"
                    type="number"
                    value={price.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPrice(Number(e.target.value));
                    }}
                />
                {errors.price && <p style={{ color: 'red' }}>{errors.price}</p>}

                <Input
                    label="Diskon:"
                    type="number"
                    value={discount ? discount.toString() : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDiscount(e.target.value ? Number(e.target.value) : undefined);
                    }}
                />
                {errors.discount && <p style={{ color: 'red' }}>{errors.discount}</p>}

                <div className={styles["btn-wrapper"]}>
                    <input type="submit" value="Add Product" />
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
