import { config } from '../config/config';

// Helper function to simulate API delay
export const simulateApiDelay = () => {
  return new Promise(resolve => setTimeout(resolve, config.MOCK_DELAY));
};

// Helper function to generate unique IDs
let idCounter = 1;
export const generateId = () => idCounter++;

// Mock authentication data
export const mockAuthData = {
  users: [
    {
      id: 1,
      username: 'admin',
      password: 'admin123', // In real app, this would be hashed
      email: 'admin@rehabcenter.com',
      fullName: 'Administrator',
      role: 'admin',
      permissions: ['read', 'write', 'delete', 'admin'],
      avatar: null,
      isActive: true,
      lastLogin: '2023-12-01T10:00:00Z',
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 2,
      username: 'user',
      password: 'user123',
      email: 'user@rehabcenter.com',
      fullName: 'Regular User',
      role: 'user',
      permissions: ['read', 'write'],
      avatar: null,
      isActive: true,
      lastLogin: '2023-12-01T09:30:00Z',
      createdAt: '2023-01-01T00:00:00Z'
    },
    {
      id: 3,
      username: 'manager',
      password: 'manager123',
      email: 'manager@rehabcenter.com',
      fullName: 'Manager User',
      role: 'manager',
      permissions: ['read', 'write', 'delete'],
      avatar: null,
      isActive: true,
      lastLogin: '2023-12-01T08:45:00Z',
      createdAt: '2023-01-01T00:00:00Z'
    }
  ],
  currentUser: null,
  token: null
};

// Mock data for BuongPhong
export const mockBuongPhongData = [
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
  },
  {
    id: 2,
    tenBuong: 'Buồng B201',
    loaiBuong: 'Buồng đơn',
    sucChua: 1,
    trangThai: 'Trống',
    tang: 2,
    moTa: 'Buồng đơn cho học viên đặc biệt',
    ngayTao: '2023-02-20',
    ngayCapNhat: '2023-11-15'
  },
  {
    id: 3,
    tenBuong: 'Buồng C301',
    loaiBuong: 'Buồng tập thể',
    sucChua: 6,
    trangThai: 'Đang sử dụng',
    tang: 3,
    moTa: 'Buồng tập thể cho học viên cũ',
    ngayTao: '2023-03-10',
    ngayCapNhat: '2023-12-05'
  }
];

// Mock data for LichSuLuuTru
export const mockLichSuLuuTruData = [
  {
    id: 1,
    hocVienId: 1,
    buongId: 1,
    ngayVao: '2023-01-15',
    ngayRa: '2023-06-15',
    lyDoVao: 'Bắt đầu cai nghiện',
    lyDoRa: 'Hoàn thành cai nghiện',
    trangThai: 'Đã hoàn thành',
    ghiChu: 'Học viên tuân thủ tốt'
  },
  {
    id: 2,
    hocVienId: 2,
    buongId: 2,
    ngayVao: '2023-02-01',
    ngayRa: null,
    lyDoVao: 'Cai nghiện bắt buộc',
    lyDoRa: null,
    trangThai: 'Đang cai nghiện',
    ghiChu: 'Cần theo dõi sát sao'
  }
];

// Mock data for Serial
export const mockSerialData = [
  {
    id: 1,
    maSerial: 'SER001',
    tenSanPham: 'Máy tính Dell',
    loaiSanPham: 'Máy tính',
    trangThai: 'Đang sử dụng',
    ngayMua: '2023-01-10',
    hanBaoHanh: '2026-01-10',
    nhaCungCap: 'Dell Vietnam',
    giaMua: 15000000,
    moTa: 'Máy tính văn phòng'
  },
  {
    id: 2,
    maSerial: 'SER002',
    tenSanPham: 'Máy in HP',
    loaiSanPham: 'Máy in',
    trangThai: 'Trống',
    ngayMua: '2023-02-15',
    hanBaoHanh: '2025-02-15',
    nhaCungCap: 'HP Vietnam',
    giaMua: 5000000,
    moTa: 'Máy in đa chức năng'
  }
];

// Mock data for DanhMucTaiSan
export const mockDanhMucTaiSanData = [
  {
    id: 1,
    tenDanhMuc: 'Máy tính',
    maDanhMuc: 'MT',
    moTa: 'Các loại máy tính và thiết bị điện tử',
    trangThai: 'Hoạt động',
    ngayTao: '2023-01-01'
  },
  {
    id: 2,
    tenDanhMuc: 'Nội thất',
    maDanhMuc: 'NT',
    moTa: 'Bàn ghế, tủ, giường',
    trangThai: 'Hoạt động',
    ngayTao: '2023-01-01'
  },
  {
    id: 3,
    tenDanhMuc: 'Thiết bị y tế',
    maDanhMuc: 'TYT',
    moTa: 'Máy móc và dụng cụ y tế',
    trangThai: 'Hoạt động',
    ngayTao: '2023-01-01'
  }
];

// Mock data for ThuocTinh
export const mockThuocTinhData = [
  {
    id: 1,
    tenThuocTinh: 'Màu sắc',
    loaiThuocTinh: 'Text',
    giaTriMacDinh: 'Trắng',
    trangThai: 'Hoạt động',
    moTa: 'Thuộc tính màu sắc của sản phẩm'
  },
  {
    id: 2,
    tenThuocTinh: 'Kích thước',
    loaiThuocTinh: 'Number',
    giaTriMacDinh: '0',
    trangThai: 'Hoạt động',
    moTa: 'Kích thước của sản phẩm'
  },
  {
    id: 3,
    tenThuocTinh: 'Trọng lượng',
    loaiThuocTinh: 'Number',
    giaTriMacDinh: '0',
    trangThai: 'Hoạt động',
    moTa: 'Trọng lượng của sản phẩm (kg)'
  }
];

// Mock data for HocVien (for HoSoCaiNghien module)
export const mockHocVienData = [
  {
    id: 1,
    hoTen: 'Nguyễn Văn A',
    ngaySinh: '1990-05-15',
    gioiTinh: 'Nam',
    cccd: '012345678901',
    diaChi: 'Hà Nội',
    soDienThoai: '0123456789',
    email: 'nguyenvana@email.com',
    trangThai: 'Đang cai nghiện',
    ngayVao: '2023-01-15',
    // SucKhoe fields
    tienSuBenhLy: 'Không',
    benhTamThan: 'Không',
    tienSuBenhGiaDinh: '',
    tinhTrangGiaDinh: 'Bình thường',
    chieuCao: '170',
    canNang: '65',
    nhipTim: '70',
    huyetAp: '120/80',
    benhManTinh: '',
    loaiMaTuy: 'Heroin',
    tuoiLanDauSD: '18',
    tuoiLanDauTiem: '',
    tongThoiGianSD: '5 năm',
    soTienSD: '500000',
    cachSD: 'Tiêm chích',
    lanXetNghiem: '1',
    thoiGianXetNghiem: '2023-01-01',
    ketQuaXetNghiem: 'Âm tính',
    thoiGianChanDoan: '2023-01-01',
    ketQuaChanDoan: 'Ổn định',
    bacSi: 'BS. Nguyễn Văn B',
    benhLyKem: '',
    tenThuoc: 'Methadone',
    soLuongThuoc: '30',
    // TaiHoaNhap fields
    thoiGianDanhGia: '2023-07-01',
    ketQuaYTe: 'Đạt',
    ketQuaPhucHoi: 'Tốt',
    ketQuaGiaoDuc: 'Khá',
    ketQuaLaoDong: 'Tốt',
    ketQuaChuanBi: 'Đạt',
    loaiXacNhan: 'Giấy xác nhận',
    soXacNhan: 'XN001',
    thoiGianCap: '2023-07-10',
    toChucQuanLy: 'Trung tâm A',
    thoiGianDeXuat: '2023-08-01',
    // ThamGap fields
    thoiGianThamGap: '2023-06-01',
    tenThanNhan: 'Nguyễn Thị C',
    cccdThanNhan: '012345678900',
    loaiThamGap: 'Thăm gặp trực tiếp',
    moiQuanHe: 'Mẹ',
    tenKhac: '',
    ngaySinhThanNhan: '1965-03-20',
    gioiTinhThanNhan: 'Nữ',
    queQuanThanNhan: 'Hà Nội',
    danTocThanNhan: 'Kinh',
    tonGiaoThanNhan: 'Không',
    quocTichThanNhan: 'Việt Nam',
    nhomMauThanNhan: 'O',
    ngayCapCCCDThanNhan: '2010-01-01',
    noiCapCCCDThanNhan: 'Hà Nội',
    ngayHetHanCCCDThanNhan: '2030-01-01',
    noiThuongTruThanNhan: 'Hà Nội',
    noiTamTruThanNhan: '',
    noiOHienTaiThanNhan: 'Hà Nội',
    honNhanThanNhan: 'Đã kết hôn',
    quanHeVoiNguoiCaiNghien: 'Con',
    // GiaoDuc fields
    soChuongTrinhGiaoDuc: '2',
    soChuongTrinhTuVan: '1',
    tenChuongTrinhGiaoDuc: 'GDPL',
    thoiGianBatDauGD: '2023-01-01',
    thoiGianKetThucGD: '2023-03-01',
    diemTB: '8.5',
    xepLoai: 'Giỏi',
    giaoVien: 'GV A',
    tenChuongTrinhTuVan: 'Tư vấn tâm lý',
    thoiGianBatDauTV: '2023-02-01',
    thoiGianKetThucTV: '2023-02-15',
    diemTBTuVan: '8.0',
    xepLoaiTuVan: 'Khá',
    giaoVienTuVan: 'GV B',
    tongSoChuongTrinhNghe: '1',
    tongSoChungChi: '1',
    maLopHoc: 'L01',
    tenKhoaHoc: 'Tin học',
    loaiNganhNghe: 'CNTT',
    tenLopHoc: 'Lớp A',
    thoiGianBatDauNghe: '2023-04-01',
    thoiGianKetThucNghe: '2023-06-01',
    diemTBNghe: '8.2',
    xepLoaiNghe: 'Giỏi',
    tinhTrangChungChi: 'Đã cấp',
    maChungChi: 'CC01',
    tongSoLanLaoDong: '2',
    tenNoiLaoDong: 'Xưởng may',
    tongSoNgayCong: '30',
    tenChungChiLaoDong: 'Chứng chỉ A',
    thoiGianCapChungChi: '2023-07-01',
    // QuaTrinhCai fields
    loaiCaiNghien: 'Bắt buộc',
    tenCoSo: 'Trung tâm 1',
    to: 'A',
    doi: '1',
    buong: '101',
    phuongPhap: 'Methadone',
    thoiGianCai: '2022-01-01',
    thoiGianBatDau: '2022-01-01',
    thoiGianKetThuc: '2022-06-01',
    xepLoai: 'Tốt'
  },
  {
    id: 2,
    hoTen: 'Trần Thị B',
    ngaySinh: '1992-08-20',
    gioiTinh: 'Nữ',
    cccd: '012345678902',
    diaChi: 'TP.HCM',
    soDienThoai: '0123456790',
    email: 'tranthib@email.com',
    trangThai: 'Đã hoàn thành',
    ngayVao: '2023-02-01',
    // Add similar fields for other modules...
    tienSuBenhLy: 'Có',
    benhTamThan: 'Không',
    loaiMaTuy: 'Ma túy đá',
    ketQuaYTe: 'Đạt',
    loaiXacNhan: 'Giấy chứng nhận',
    tenThanNhan: 'Trần Văn D',
    moiQuanHe: 'Bố',
    tenChuongTrinhGiaoDuc: 'GDPL và kỹ năng sống',
    giaoVien: 'GV C',
    loaiCaiNghien: 'Tự nguyện',
    tenCoSo: 'Trung tâm 2'
  }
];

// Mock data for CanBo
export const mockCanBoData = [
  {
    id: 1,
    hoTen: 'Nguyễn Văn Cán Bộ',
    ngaySinh: '1985-03-15',
    gioiTinh: 'Nam',
    cccd: '012345678903',
    diaChi: 'Hà Nội',
    soDienThoai: '0123456791',
    email: 'nguyencanbo@email.com',
    chucVu: 'Cán bộ quản lý',
    phongBanId: 1,
    trangThai: 'Đang làm việc',
    ngayVaoLam: '2020-01-01',
    luong: 15000000,
    trinhDo: 'Đại học',
    chuyenNganh: 'Quản lý xã hội'
  },
  {
    id: 2,
    hoTen: 'Trần Thị Cán Bộ',
    ngaySinh: '1988-07-22',
    gioiTinh: 'Nữ',
    cccd: '012345678904',
    diaChi: 'TP.HCM',
    soDienThoai: '0123456792',
    email: 'trancanbo@email.com',
    chucVu: 'Nhân viên y tế',
    phongBanId: 2,
    trangThai: 'Đang làm việc',
    ngayVaoLam: '2021-03-01',
    luong: 12000000,
    trinhDo: 'Cao đẳng',
    chuyenNganh: 'Điều dưỡng'
  }
];

// Mock data for PhongBan
export const mockPhongBanData = [
  {
    id: 1,
    tenPhongBan: 'Phòng Quản lý',
    maPhongBan: 'QL',
    truongPhong: 'Nguyễn Văn Cán Bộ',
    soNhanVien: 5,
    moTa: 'Phòng quản lý chung của trung tâm',
    trangThai: 'Hoạt động',
    ngayThanhLap: '2020-01-01'
  },
  {
    id: 2,
    tenPhongBan: 'Phòng Y tế',
    maPhongBan: 'YT',
    truongPhong: 'Trần Thị Cán Bộ',
    soNhanVien: 3,
    moTa: 'Phòng chăm sóc sức khỏe học viên',
    trangThai: 'Hoạt động',
    ngayThanhLap: '2020-01-01'
  }
];

// Mock data for ThuocVatTu
export const mockThuocVatTuData = [
  {
    id: 1,
    tenThuoc: 'Paracetamol',
    maThuoc: 'T001',
    donViTinh: 'Viên',
    soLuong: 1000,
    giaNhap: 500,
    giaBan: 800,
    hanSuDung: '2025-12-31',
    nhaCungCap: 'Công ty Dược A',
    trangThai: 'Có sẵn',
    moTa: 'Thuốc giảm đau, hạ sốt'
  },
  {
    id: 2,
    tenThuoc: 'Methadone',
    maThuoc: 'T002',
    donViTinh: 'Lọ',
    soLuong: 50,
    giaNhap: 50000,
    giaBan: 0,
    hanSuDung: '2024-06-30',
    nhaCungCap: 'Công ty Dược B',
    trangThai: 'Có sẵn',
    moTa: 'Thuốc điều trị cai nghiện'
  }
];

// Mock data for NhaCungCap
export const mockNhaCungCapData = [
  {
    id: 1,
    tenNhaCungCap: 'Công ty Dược A',
    maNhaCungCap: 'NCC001',
    diaChi: 'Hà Nội',
    soDienThoai: '02412345678',
    email: 'info@duoca.com',
    nguoiDaiDien: 'Nguyễn Văn A',
    trangThai: 'Hoạt động',
    moTa: 'Cung cấp thuốc và vật tư y tế'
  },
  {
    id: 2,
    tenNhaCungCap: 'Công ty Dược B',
    maNhaCungCap: 'NCC002',
    diaChi: 'TP.HCM',
    soDienThoai: '02812345678',
    email: 'info@duocb.com',
    nguoiDaiDien: 'Trần Thị B',
    trangThai: 'Hoạt động',
    moTa: 'Chuyên cung cấp thuốc cai nghiện'
  }
];

// Mock data for DonViTinh
export const mockDonViTinhData = [
  {
    id: 1,
    tenDonVi: 'Viên',
    maDonVi: 'VIEN',
    moTa: 'Đơn vị đếm cho thuốc viên',
    trangThai: 'Hoạt động'
  },
  {
    id: 2,
    tenDonVi: 'Lọ',
    maDonVi: 'LO',
    moTa: 'Đơn vị đếm cho thuốc lỏng',
    trangThai: 'Hoạt động'
  },
  {
    id: 3,
    tenDonVi: 'Gói',
    maDonVi: 'GOI',
    moTa: 'Đơn vị đếm cho thuốc bột',
    trangThai: 'Hoạt động'
  }
];

// Mock data for TaiSan
export const mockTaiSanData = [
  {
    id: 1,
    tenTaiSan: 'Máy tính Dell',
    maTaiSan: 'TS001',
    danhMucId: 1,
    serial: 'SER001',
    trangThai: 'Đang sử dụng',
    ngayMua: '2023-01-10',
    giaMua: 15000000,
    nhaCungCap: 'Dell Vietnam',
    viTri: 'Phòng Quản lý',
    nguoiSuDung: 'Nguyễn Văn Cán Bộ',
    moTa: 'Máy tính văn phòng Dell OptiPlex'
  },
  {
    id: 2,
    tenTaiSan: 'Bàn làm việc',
    maTaiSan: 'TS002',
    danhMucId: 2,
    serial: '',
    trangThai: 'Đang sử dụng',
    ngayMua: '2023-02-15',
    giaMua: 2000000,
    nhaCungCap: 'Công ty Nội thất A',
    viTri: 'Phòng Y tế',
    nguoiSuDung: 'Trần Thị Cán Bộ',
    moTa: 'Bàn làm việc gỗ công nghiệp'
  }
];

// Mock data for Kho
export const mockKhoData = [
  {
    id: 1,
    tenKho: 'Kho chính',
    maKho: 'K001',
    diaChi: 'Tầng 1, Tòa nhà A',
    quanLy: 'Nguyễn Văn Cán Bộ',
    trangThai: 'Hoạt động',
    moTa: 'Kho chính của trung tâm',
    dienTich: 100,
    sucChua: 1000
  },
  {
    id: 2,
    tenKho: 'Kho thuốc',
    maKho: 'K002',
    diaChi: 'Tầng 2, Tòa nhà B',
    quanLy: 'Trần Thị Cán Bộ',
    trangThai: 'Hoạt động',
    moTa: 'Kho chứa thuốc và vật tư y tế',
    dienTich: 50,
    sucChua: 500
  }
];

// Mock data for BanGiao
export const mockBanGiaoData = [
  {
    id: 1,
    taiSanId: 1,
    nguoiBanGiao: 'Nguyễn Văn Cán Bộ',
    nguoiNhan: 'Trần Thị Cán Bộ',
    ngayBanGiao: '2023-03-01',
    lyDo: 'Chuyển công tác',
    trangThai: 'Đã bàn giao',
    ghiChu: 'Bàn giao đầy đủ phụ kiện'
  },
  {
    id: 2,
    taiSanId: 2,
    nguoiBanGiao: 'Trần Thị Cán Bộ',
    nguoiNhan: 'Nguyễn Văn Cán Bộ',
    ngayBanGiao: '2023-04-15',
    lyDo: 'Thay đổi vị trí làm việc',
    trangThai: 'Đã bàn giao',
    ghiChu: 'Bàn giao trong tình trạng tốt'
  }
];

// Mock data for DaoTaoNghe
export const mockDaoTaoNgheData = [
  {
    id: 1,
    tenKhoaHoc: 'Tin học văn phòng',
    maKhoaHoc: 'KH001',
    thoiGianDaoTao: '3 tháng',
    soHocVien: 20,
    giaoVien: 'GV A',
    trangThai: 'Đang diễn ra',
    moTa: 'Khóa học tin học cơ bản',
    ngayBatDau: '2023-01-01',
    ngayKetThuc: '2023-04-01'
  },
  {
    id: 2,
    tenKhoaHoc: 'May công nghiệp',
    maKhoaHoc: 'KH002',
    thoiGianDaoTao: '6 tháng',
    soHocVien: 15,
    giaoVien: 'GV B',
    trangThai: 'Đã hoàn thành',
    moTa: 'Khóa học may công nghiệp',
    ngayBatDau: '2023-02-01',
    ngayKetThuc: '2023-08-01'
  }
];

// Mock data for GiaoDucTuVan
export const mockGiaoDucTuVanData = [
  {
    id: 1,
    tenChuongTrinh: 'Tư vấn tâm lý',
    maChuongTrinh: 'TV001',
    thoiGianThucHien: '2 tuần',
    soHocVien: 10,
    tuVanVien: 'TV A',
    trangThai: 'Đang diễn ra',
    moTa: 'Chương trình tư vấn tâm lý cho học viên',
    ngayBatDau: '2023-01-15',
    ngayKetThuc: '2023-01-29'
  },
  {
    id: 2,
    tenChuongTrinh: 'Giáo dục pháp luật',
    maChuongTrinh: 'TV002',
    thoiGianThucHien: '1 tháng',
    soHocVien: 25,
    tuVanVien: 'TV B',
    trangThai: 'Đã hoàn thành',
    moTa: 'Chương trình giáo dục pháp luật',
    ngayBatDau: '2023-01-01',
    ngayKetThuc: '2023-02-01'
  }
];

// Mock data for LaoDongTriLieu
export const mockLaoDongTriLieuData = [
  {
    id: 1,
    tenCongViec: 'Làm vườn',
    maCongViec: 'CV001',
    thoiGianThucHien: '2 giờ/ngày',
    soHocVien: 8,
    nguoiHuongDan: 'HD A',
    trangThai: 'Đang thực hiện',
    moTa: 'Công việc làm vườn trị liệu',
    ngayBatDau: '2023-01-01',
    ngayKetThuc: '2023-12-31'
  },
  {
    id: 2,
    tenCongViec: 'May công nghiệp',
    maCongViec: 'CV002',
    thoiGianThucHien: '4 giờ/ngày',
    soHocVien: 12,
    nguoiHuongDan: 'HD B',
    trangThai: 'Đã hoàn thành',
    moTa: 'Công việc may công nghiệp',
    ngayBatDau: '2023-02-01',
    ngayKetThuc: '2023-08-01'
  }
];

// Export all mock data
export const mockData = {
  auth: mockAuthData,
  buongPhong: mockBuongPhongData,
  lichSuLuuTru: mockLichSuLuuTruData,
  serial: mockSerialData,
  danhMucTaiSan: mockDanhMucTaiSanData,
  thuocTinh: mockThuocTinhData,
  hocVien: mockHocVienData,
  canBo: mockCanBoData,
  phongBan: mockPhongBanData,
  thuocVatTu: mockThuocVatTuData,
  nhaCungCap: mockNhaCungCapData,
  donViTinh: mockDonViTinhData,
  taiSan: mockTaiSanData,
  kho: mockKhoData,
  banGiao: mockBanGiaoData,
  daoTaoNghe: mockDaoTaoNgheData,
  giaoDucTuVan: mockGiaoDucTuVanData,
  laoDongTriLieu: mockLaoDongTriLieuData
};

export default mockData;

