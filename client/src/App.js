import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import {path} from './ultils/path'
import { Home, Login, Public, FinalRegister, ResetPassword, DetailProduct, Products } from './pages/public';
 
function App() {

  return (
    <div className='relative'>
      <Routes>
        <Route path={path.PUBLIC} element={<Public />}>
          <Route path={path.HOME} element={<Home />} />
          <Route path={path.DETAIL_PRODUCT__CATE__ID} element={<DetailProduct />} />
          <Route path={path.PRODUCTS__CATE} element={<Products />} />
          <Route path={path.PRODUCTS} element={<Products />} />
        </Route>
        <Route path={path.LOGIN} element={<Login />} />
        <Route path={path.FINAL_REGISTER} element={<FinalRegister />} />
        <Route path={path.RESET_PASSWORD} element={<ResetPassword />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
