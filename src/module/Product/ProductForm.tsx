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

    // Handler untuk mengirim data
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const productData = {
            product_name: productName,
            category,
            price,
            discount,
        };
        dispatch(createProductAction(productData)); // Panggil aksi untuk menambahkan produk

        // Reset input form setelah submit
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
                <Input
                    label="Kategori:"
                    type="text"
                    value={category}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setCategory(e.target.value);
                    }}
                />
                <Input
                    label="Harga:"
                    type="number"
                    value={price.toString()}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setPrice(Number(e.target.value));
                    }}
                />
                <Input
                    label="Diskon:"
                    type="number"
                    value={discount ? discount.toString() : ''}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setDiscount(e.target.value ? Number(e.target.value) : undefined);
                    }}
                />
                <div className={styles["btn-wrapper"]}>
                    <input type="submit" value="Add Product"/>
                </div>
            </form>
        </div>
    );
};

export default ProductForm;
