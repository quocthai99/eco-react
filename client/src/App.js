import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';

import {path} from './ultils/path'
import { Home, Login, Public, FinalRegister, ResetPassword, DetailProduct, Products } from './pages/public';
import { AdminLayout, CreateProduct, DashBoard, ManageOrther, ManageProducts, ManageUsers } from './pages/admin'
import { MemberLayout, Personal } from './pages/private'
import { getCategoriesError, getCategoriesStart, getCategoriesSuccess } from './redux/category/categorySlice';
import { apiGetCategories } from './services/category';

function App() {
  const dispatch = useDispatch()
  useEffect(() => {
    fetchCategories()
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const fetchCategories = async() => {
    dispatch(getCategoriesStart())
    try {
      const response = await apiGetCategories()
      dispatch(getCategoriesSuccess(response.categories))
      
    } catch (error) {
      dispatch(getCategoriesError())
    }
  }

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

        <Route path={path.ADMIN} element={<AdminLayout />}>
          <Route path={path.DASHBOARD} element={<DashBoard />} />
          <Route path={path.MANAGE_OTHER} element={<ManageOrther />} />
          <Route path={path.MANAGE_PRODUCTS} element={<ManageProducts />} />
          <Route path={path.MANAGE_USER} element={<ManageUsers />} />
          <Route path={path.CREATE_PRODUCTS} element={<CreateProduct />} />
        </Route>

        <Route path={path.MEMBER} element={<MemberLayout />}>
          <Route path={path.PERSONAL} element={<Personal />} />
        </Route>
      </Routes>

      <ToastContainer />
    </div>
  );
}

export default App;
