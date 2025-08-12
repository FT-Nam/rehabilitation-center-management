# Hướng dẫn sử dụng Mock Data System

## 🎯 Tổng quan

Hệ thống Mock Data được thiết kế để cho phép frontend hoạt động độc lập khi backend chưa sẵn sàng. Khi backend hoàn thiện, chỉ cần thay đổi một flag để chuyển sang sử dụng API thật.

## ⚙️ Cấu hình

### File cấu hình: `src/config/config.js`

```javascript
export const config = {
  // Set to true to use mock data, false to use real API
  USE_MOCK_DATA: true,
  
  // API base URL
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  
  // Mock data delay simulation (ms)
  MOCK_DELAY: 500,
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};
```

### Chuyển đổi giữa Mock và Real API

**Để sử dụng Mock Data:**
```javascript
USE_MOCK_DATA: true
```

**Để sử dụng Real API:**
```javascript
USE_MOCK_DATA: false
```

## 📁 Cấu trúc Mock Data

### 1. Mock Data Files: `src/utils/mockData.js`

Chứa tất cả dữ liệu mẫu cho các modules:

- **BuongPhong**: Dữ liệu buồng phòng
- **LichSuLuuTru**: Lịch sử lưu trú
- **Serial**: Serial sản phẩm
- **DanhMucTaiSan**: Danh mục tài sản
- **ThuocTinh**: Thuộc tính sản phẩm
- **HocVien**: Thông tin học viên
- **CanBo**: Thông tin cán bộ
- **PhongBan**: Thông tin phòng ban
- **ThuocVatTu**: Thuốc và vật tư
- **NhaCungCap**: Nhà cung cấp
- **DonViTinh**: Đơn vị tính
- **TaiSan**: Tài sản
- **Kho**: Kho hàng
- **BanGiao**: Bàn giao
- **DaoTaoNghe**: Đào tạo nghề
- **GiaoDucTuVan**: Giáo dục tư vấn
- **LaoDongTriLieu**: Lao động trị liệu

### 2. API Service: `src/api/apiService.js`

Wrapper service xử lý cả mock data và real API:

```javascript
export class ApiService {
  constructor(endpoint, mockDataKey) {
    this.endpoint = endpoint;
    this.mockDataKey = mockDataKey;
    this.mockData = mockData[mockDataKey] || [];
  }

  // Các methods: fetchAll, fetchById, create, update, delete
}
```

## 🔧 Cách sử dụng

### 1. Trong Redux Slices

```javascript
import { buongPhongService } from '../../api/apiService';

export const fetchBuongPhong = createAsyncThunk(
  'buongPhong/fetchBuongPhong',
  async (params, { rejectWithValue }) => {
    try {
      const response = await buongPhongService.fetchAll(params);
      return response.data || response;
    } catch (error) {
      return rejectWithValue(error.message || 'Failed to fetch buong phong');
    }
  }
);
```

### 2. Trong Components

```javascript
import { useDispatch, useSelector } from 'react-redux';
import { fetchBuongPhong } from '../features/buongPhong/buongPhongSlice';

const MyComponent = () => {
  const dispatch = useDispatch();
  const { list, loading, error } = useSelector(state => state.buongPhong);

  useEffect(() => {
    dispatch(fetchBuongPhong({ page: 1, limit: 10 }));
  }, [dispatch]);

  // Component logic...
};
```

## 📊 Tính năng Mock Data

### 1. Pagination
```javascript
// Mock data hỗ trợ pagination
const response = await buongPhongService.fetchAll({
  page: 1,
  limit: 10
});

// Response format:
{
  data: [...], // Dữ liệu đã phân trang
  total: 25,   // Tổng số records
  page: 1,     // Trang hiện tại
  limit: 10,   // Số records mỗi trang
  totalPages: 3 // Tổng số trang
}
```

### 2. Search/Filter
```javascript
// Mock data hỗ trợ tìm kiếm
const response = await buongPhongService.fetchAll({
  search: 'Buồng A101'
});
```

### 3. CRUD Operations
```javascript
// Create
const newItem = await buongPhongService.create(data);

// Read
const item = await buongPhongService.fetchById(1);

// Update
const updatedItem = await buongPhongService.update(1, data);

// Delete
await buongPhongService.delete(1);
```

### 4. Bulk Operations
```javascript
// Bulk delete
await buongPhongService.bulkDelete([1, 2, 3]);

// Export
const exportData = await buongPhongService.export();
```

## 🎨 Dữ liệu mẫu chi tiết

### BuongPhong
```javascript
{
  id: 1,
  tenBuong: 'Buồng A101',
  loaiBuong: 'Buồng tập thể',
  sucChua: 8,
  trangThai: 'Đang sử dụng',
  tang: 1,
  moTa: 'Buồng tập thể cho học viên mới',
  ngayTao: '2023-01-15',
  ngayCapNhat: '2023-12-01'
}
```

### HocVien (với đầy đủ thông tin các modules)
```javascript
{
  id: 1,
  hoTen: 'Nguyễn Văn A',
  ngaySinh: '1990-05-15',
  gioiTinh: 'Nam',
  cccd: '012345678901',
  // ... thông tin cơ bản
  
  // SucKhoe fields
  tienSuBenhLy: 'Không',
  loaiMaTuy: 'Heroin',
  // ... thông tin sức khỏe
  
  // TaiHoaNhap fields
  ketQuaYTe: 'Đạt',
  loaiXacNhan: 'Giấy xác nhận',
  // ... thông tin tái hòa nhập
  
  // ThamGap fields
  tenThanNhan: 'Nguyễn Thị C',
  moiQuanHe: 'Mẹ',
  // ... thông tin thăm gặp
  
  // GiaoDuc fields
  tenChuongTrinhGiaoDuc: 'GDPL',
  giaoVien: 'GV A',
  // ... thông tin giáo dục
  
  // QuaTrinhCai fields
  loaiCaiNghien: 'Bắt buộc',
  tenCoSo: 'Trung tâm 1',
  // ... thông tin quá trình cai
}
```

## 🚀 Chuyển đổi sang Production

### Bước 1: Cập nhật config
```javascript
// src/config/config.js
export const config = {
  USE_MOCK_DATA: false, // Chuyển sang false
  API_BASE_URL: 'https://your-production-api.com/api',
  // ...
};
```

### Bước 2: Đảm bảo API endpoints đúng
Kiểm tra các endpoints trong `src/api/apiService.js` khớp với backend:

```javascript
export const buongPhongService = new ApiService('/buong-phong', 'buongPhong');
export const hocVienService = new ApiService('/hoc-vien', 'hocVien');
// ...
```

### Bước 3: Test và deploy
- Test tất cả chức năng với real API
- Deploy lên production
- Xóa mock data nếu không cần thiết

## 🔍 Debug và Troubleshooting

### 1. Kiểm tra config
```javascript
import { config } from '../config/config';
console.log('USE_MOCK_DATA:', config.USE_MOCK_DATA);
```

### 2. Kiểm tra API response
```javascript
// Trong Redux slice
.addCase(fetchBuongPhong.fulfilled, (state, action) => {
  console.log('API Response:', action.payload);
  // ...
})
```

### 3. Kiểm tra mock data
```javascript
import { mockData } from '../utils/mockData';
console.log('Mock BuongPhong:', mockData.buongPhong);
```

## 📝 Lưu ý quan trọng

1. **Mock data chỉ dành cho development**: Không sử dụng trong production
2. **Dữ liệu sẽ reset**: Mock data sẽ reset khi refresh page
3. **ID tự động generate**: Sử dụng `generateId()` để tạo ID mới
4. **Delay simulation**: Có delay 500ms để mô phỏng network latency
5. **Error handling**: Mock data có thể throw error để test error handling

## 🎉 Kết luận

Hệ thống Mock Data cho phép:
- ✅ Frontend hoạt động độc lập
- ✅ Test UI/UX trước khi có backend
- ✅ Dễ dàng chuyển đổi sang real API
- ✅ Consistent API interface
- ✅ Đầy đủ CRUD operations
- ✅ Pagination và search support

**Khi backend sẵn sàng, chỉ cần thay đổi `USE_MOCK_DATA: false` là có thể sử dụng real API ngay lập tức!**

