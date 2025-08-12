import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maPhong: 'P101', tenPhong: 'Phòng 101', loaiPhong: 'Ngủ', soLuong: 10, sucChua: 12, tinhTrang: 'Đang sử dụng', phuTrach: 'Nguyễn Văn A', soLuongHocVien: 10 },
    { id: '2', maPhong: 'P201', tenPhong: 'Phòng 201', loaiPhong: 'Học', soLuong: 8, sucChua: 10, tinhTrang: 'Trống', phuTrach: 'Trần Thị B', soLuongHocVien: 0 },
];

export default function BuongPhongList() {
    const [filter, setFilter] = useState({ maPhong: '', tenPhong: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maPhong || row.maPhong.toLowerCase().includes(filter.maPhong.toLowerCase())) &&
        (!filter.tenPhong || row.tenPhong.toLowerCase().includes(filter.tenPhong.toLowerCase()))
    );
    const paged = data.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã phòng" value={filter.maPhong} onChange={e => setFilter(f => ({ ...f, maPhong: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên phòng" value={filter.tenPhong} onChange={e => setFilter(f => ({ ...f, tenPhong: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã phòng</th>
                            <th>Tên phòng</th>
                            <th>Loại phòng</th>
                            <th>Số lượng</th>
                            <th>Sức chứa</th>
                            <th>Tình trạng</th>
                            <th>Phụ trách</th>
                            <th>SL học viên đang sử dụng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.length === 0 ? (
                            <tr><td colSpan={10} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            paged.map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.maPhong}</td>
                                    <td>{row.tenPhong}</td>
                                    <td>{row.loaiPhong}</td>
                                    <td>{row.soLuong}</td>
                                    <td>{row.sucChua}</td>
                                    <td>{row.tinhTrang}</td>
                                    <td>{row.phuTrach}</td>
                                    <td>{row.soLuongHocVien}</td>
                                    <td className="d-flex gap-2">
                                        <button title="Xem chi tiết" onClick={() => nav(`${row.id}`)} className="btn btn-link p-0">👁️</button>
                                        <button title="Sửa" onClick={() => nav(`${row.id}/edit`)} className="btn btn-link p-0 text-warning">✏️</button>
                                        <button title="Xóa" className="btn btn-link p-0 text-danger">🗑️</button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
            <div className="mt-3">
                <PaginationControl
                    total={data.length}
                    currentPage={page}
                    pageSize={pageSize}
                    onChangePage={setPage}
                    onChangePageSize={setPageSize}
                />
            </div>
        </div>
    );
} 