import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import Dashboard from '../pages/Dashboard';
import TaiKhoan from '../pages/TaiKhoan';
import InBieuMau from '../pages/InBieuMau';
import BaoCao from '../pages/BaoCao';
import GioiThieu from '../pages/GioiThieu';
import HuongDanSuDung from '../pages/HuongDanSuDung';
import FAQ from '../pages/FAQ';
import HoSoCaiNghienPage from '../pages/HoSoCaiNghien';
import QuanLyGiaoDucPage from '../pages/QuanLyGiaoDuc';
import QuanLyCanBoPage from '../pages/QuanLyCanBo';
import QuanLyTaiSanPage from '../pages/QuanLyTaiSan';
import QuanLyBuongPhongPage from '../pages/QuanLyBuongPhong';
import QuanLyThuocVatTu from '../pages/QuanLyThuocVatTu';
import LoginPage from '../pages/Login';

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<LoginPage />} />
    <Route element={<PrivateRoute />}> 
      <Route path="/" element={<Dashboard />} />
      <Route path="/tai-khoan" element={<TaiKhoan />} />
      <Route path="/in-bieu-mau" element={<InBieuMau />} />
      <Route path="/bao-cao" element={<BaoCao />} />
      <Route path="/gioi-thieu" element={<GioiThieu />} />
      <Route path="/huong-dan" element={<HuongDanSuDung />} />
      <Route path="/faq" element={<FAQ />} />
      <Route path="/ho-so-cai-nghien/*" element={<HoSoCaiNghienPage />} />
      <Route path="/quan-ly-giao-duc/*" element={<QuanLyGiaoDucPage />} />
      <Route path="/quan-ly-can-bo/*" element={<QuanLyCanBoPage />} />
      <Route path="/quan-ly-tai-san/*" element={<QuanLyTaiSanPage />} />
      <Route path="/quan-ly-buong-phong/*" element={<QuanLyBuongPhongPage />} />
      <Route path="/quan-ly-thuoc-vat-tu/*" element={<QuanLyThuocVatTu />} />
    </Route>
  </Routes>
);

export default AppRoutes;

