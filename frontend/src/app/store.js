import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import hocVienReducer from '../features/hocVien/hocVienSlice';
import canBoReducer from '../features/canBo/canBoSlice';
import phongBanReducer from '../features/phongBan/phongBanSlice';
import daoTaoNgheReducer from '../features/daoTaoNghe/daoTaoNgheSlice';
import giaoDucTuVanReducer from '../features/giaoDucTuVan/giaoDucTuVanSlice';
import laoDongTriLieuReducer from '../features/laoDongTriLieu/laoDongTriLieuSlice';
import taiSanReducer from '../features/taiSan/taiSanSlice';
import thuocVatTuReducer from '../features/thuocVatTu/thuocVatTuSlice';
import taiSanKhoReducer from '../features/taiSanKho/taiSanKhoSlice';
import taiSanKiemKeReducer from '../features/taiSanKiemKe/taiSanKiemKeSlice';
import thuocDonViTinhReducer from '../features/thuocDonViTinh/thuocDonViTinhSlice';
import nhaCungCapReducer from '../features/thuocNhaCungCap/thuocNhaCungCapSlice';
import taiSanBanGiaoReducer from '../features/taiSanBanGiao/taiSanBanGiaoSlice';
import taiSanSuaChuaReducer from '../features/taiSanSuaChua/taiSanSuaChuaSlice';
import thuocKiemKeReducer from '../features/thuocKiemKe/thuocKiemKeSlice';
import thuocQuanLyKhoReducer from '../features/thuocQuanLyKho/thuocQuanLyKhoSlice';
import accountsReducer from '../features/accounts/accountsSlice';
import studentsReducer from '../features/students/studentsSlice';
import classesReducer from '../features/classes/classesSlice';
import teachersReducer from '../features/teachers/teachersSlice';
import medicinesReducer from '../features/medicines/medicinesSlice';
import buongPhongReducer from '../features/buongPhong/buongPhongSlice';
import lichSuLuuTruReducer from '../features/lichSuLuuTru/lichSuLuuTruSlice';
import serialReducer from '../features/serial/serialSlice';
import danhMucTaiSanReducer from '../features/danhMucTaiSan/danhMucTaiSanSlice';
import thuocTinhReducer from '../features/thuocTinh/thuocTinhSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    hocVien: hocVienReducer,
    canBo: canBoReducer,
    phongBan: phongBanReducer,
    daoTaoNghe: daoTaoNgheReducer,
    giaoDucTuVan: giaoDucTuVanReducer,
    laoDongTriLieu: laoDongTriLieuReducer,
    taiSan: taiSanReducer,
    thuocVatTu: thuocVatTuReducer,
    taiSanKho: taiSanKhoReducer,
    taiSanKiemKe: taiSanKiemKeReducer,
    thuocDonViTinh: thuocDonViTinhReducer,
    nhaCungCap: nhaCungCapReducer,
    taiSanBanGiao: taiSanBanGiaoReducer,
    taiSanSuaChua: taiSanSuaChuaReducer,
    thuocKiemKe: thuocKiemKeReducer,
    thuocKho: thuocQuanLyKhoReducer,
    accounts: accountsReducer,
    students: studentsReducer,
    classes: classesReducer,
    teachers: teachersReducer,
    medicines: medicinesReducer,
    buongPhong: buongPhongReducer,
    lichSuLuuTru: lichSuLuuTruReducer,
    serial: serialReducer,
    danhMucTaiSan: danhMucTaiSanReducer,
    thuocTinh: thuocTinhReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export default store;

