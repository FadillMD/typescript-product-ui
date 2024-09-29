import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getProductListAction } from "./ProductSlice";
import { ApiStatus, IProduct } from "./Product.type";
import Modal from "../../components/modal/Modal";

const ProductList = () => {
  const { list, listStatus } = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch()

  // State untuk menyimpan produk yang ingin dilihat detailnya dan state untuk mengontrol modal
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    dispatch(getProductListAction())
  }, []);

  // Function untuk membuka modal dengan detail produk
  const handleViewProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setIsModalOpen(true); // Buka modal
  };

  // Function untuk menutup modal
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null); // Kosongkan produk yang dipilih
  };
  return (
    <div>
    <table>
      <thead>
        <tr>
          <th>No.</th>
          <th>Nama Product</th>
          <th>Kategori</th>
          <th>Harga</th>
          <th>Diskon</th>
          <th>Aksi</th>
        </tr>
      </thead>

      {listStatus === ApiStatus.loading && <tbody>List is Loading....</tbody>}
      {listStatus === ApiStatus.error && <tbody>Error while Loading list</tbody>}

      {listStatus === ApiStatus.idle && list.map((product, index) => (
        <tr key={product.id}>
          <td>{index + 1}</td>
          <td>{product.productName}</td>
          <td>{product.category}</td>
          <td>{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td> {/* Format harga dalam Rupiah */}
    <td>{product.discount ?? 0}%</td>
          <td>
            {/* Tambahkan tombol aksi di sini jika perlu */}
            <button onClick={() => handleViewProduct(product)}>View</button>
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      ))}
    </table>
    {/* Modal untuk menampilkan detail produk */}
    <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
    {selectedProduct && (
      <div>
        <h3>Detail Produk</h3>
        <p>Nama Produk: {selectedProduct.productName}</p>
        <p>Kategori: {selectedProduct.category}</p>
        <p>Harga: {selectedProduct.price}</p>
        <p>Diskon: {selectedProduct.discount ? selectedProduct.discount + "%": "Tidak ada diskon"}</p>
      </div>
    )}
  </Modal>
</div>
  );
};

export default ProductList;
