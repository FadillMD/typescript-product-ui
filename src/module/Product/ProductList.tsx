import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import { getProductListAction } from "./ProductSlice";
import { ApiStatus } from "./Product.type";

const ProductList = () => {
  const { list, listStatus } = useAppSelector((state: RootState) => state.product);

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProductListAction())
  }, [])

  return (
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
          <td>{product.price}</td>
          <td>{product.discount}%</td>
          <td>
            {/* Tambahkan tombol aksi di sini jika perlu */}
            <button>Edit</button>
            <button>Delete</button>
          </td>
        </tr>
      ))}


    </table>
  );
};

export default ProductList;
