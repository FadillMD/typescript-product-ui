import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getProductListAction, updateProductAction, deleteProductAction } from "./ProductSlice";
import { ApiStatus, IProduct } from "./Product.type";
import Modal from "../../components/modal/Modal";
import { Input } from "../../components/input";
import Style from "./ProductListStyle.module.css";

const ITEMS_PER_PAGE = 20;

const ProductList = () => {
  const { list, listStatus } = useAppSelector((state: RootState) => state.product);
  const dispatch = useAppDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<IProduct | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const [productName, setProductName] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  const [discount, setDiscount] = useState(0);

  useEffect(() => {
    dispatch(getProductListAction());
  }, [dispatch]);

  const totalPages = Math.ceil(list.length / ITEMS_PER_PAGE);

  const handleEditProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setProductName(product.productName);
    setCategory(product.category);
    setPrice(product.price);
    setDiscount(product.discount || 0);
    setIsModalOpen(true);
  };

  const handleViewProduct = (product: IProduct) => {
    setSelectedProduct(product);
    setIsViewModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleCloseViewModal = () => {
    setIsViewModalOpen(false);
    setSelectedProduct(null);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const productData = {
      product_name: productName,
      category,
      price,
      discount,
    };

    if (selectedProduct) {
      dispatch(updateProductAction({ id: selectedProduct.id, data: productData })).then(() => {
        dispatch(getProductListAction()); // Memuat ulang daftar produk
      });
    }

    handleCloseModal();
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  const handleDeleteProduct = (id: number) => {
    setProductToDelete(id);
    setIsDeleteConfirmOpen(true); // Buka modal konfirmasi
  };
  const confirmDeleteProduct = () => {
    if (productToDelete !== null) {
      dispatch(deleteProductAction(productToDelete));
      setProductToDelete(null);
      setIsDeleteConfirmOpen(false); // Tutup modal setelah menghapus
    }
  };
  // Data untuk ditampilkan pada halaman saat ini
  const displayedProducts = list.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

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

        {listStatus === ApiStatus.idle && displayedProducts.map((product, index) => (
          <tr key={product.id}>
            <td>{(currentPage - 1) * ITEMS_PER_PAGE + index + 1}</td>
            <td>{product.productName}</td>
            <td>{product.category}</td>
            <td>{product.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</td>
            <td>{product.discount ?? 0}%</td>
            <td>
              <button className={Style.button} onClick={() => handleViewProduct(product)}>View</button>
              <button className={Style.button} onClick={() => handleEditProduct(product)}>Edit</button>
              <button className={`${Style.button} ${Style.delete}`} onClick={() => handleDeleteProduct(product.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </table>

      {/* Modal untuk mengedit produk */}
      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <form onSubmit={handleEditSubmit}>
          <Input
            label="Nama Produk:"
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
          />
          <Input
            label="Kategori:"
            type="text"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          />
          <Input
            label="Harga:"
            type="number"
            value={price.toString()}
            onChange={(e) => setPrice(Number(e.target.value))}
          />
          <Input
            label="Diskon:"
            type="number"
            value={discount.toString()}
            onChange={(e) => setDiscount(Number(e.target.value))}
          />
          <button type="submit">Update Product</button>
        </form>
      </Modal>

      {/* Modal untuk melihat detail produk */}
      <Modal isOpen={isViewModalOpen} onClose={handleCloseViewModal}>
        {selectedProduct && (
          <div>
            <h3>Detail Produk</h3>
            <p>Nama Produk: {selectedProduct.productName}</p>
            <p>Kategori: {selectedProduct.category}</p>
            <p>Harga: {selectedProduct.price.toLocaleString('id-ID', { style: 'currency', currency: 'IDR' })}</p>
            <p>Diskon: {selectedProduct.discount ? selectedProduct.discount + "%" : "Tidak ada diskon"}</p>
            <button onClick={handleCloseViewModal}>Tutup</button>
          </div>
        )}
      </Modal>
      {/* Modal konfirmasi hapus produk */}
      <Modal isOpen={isDeleteConfirmOpen} onClose={() => setIsDeleteConfirmOpen(false)}>
        <div>
          <h3>Konfirmasi Hapus</h3>
          <p>Apakah Anda yakin ingin menghapus produk ini?</p>
          <button onClick={confirmDeleteProduct}>Ya, Hapus</button>
          <button onClick={() => setIsDeleteConfirmOpen(false)}>Batal</button>
        </div>
      </Modal>

      <div className={Style.pagination}>
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>

    </div>
  );
};

export default ProductList;
