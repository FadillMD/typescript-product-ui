
import { BrowserRouter, Routes, Route, Link, NavLink } from 'react-router-dom';
import './App.css';
import Layout from './module/Layout';
import ProductList from './module/Product/ProductList';
import ProductForm from './module/Product/ProductForm';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<ProductList />}></Route>
          <Route path='/add' element={<ProductForm />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
