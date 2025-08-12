import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: 1, maThuocTinh: 'TT001', tenThuocTinh: 'Hoạt chất', moTaThuocTinh: 'Thành phần chính', maGiaTri: 'GT001', tenGiaTri: 'Paracetamol', moTaGiaTri: 'Giảm đau, hạ sốt', trangThai: 'Đang sử dụng' },
    { id: 2, maThuocTinh: 'TT002', tenThuocTinh: 'Dạng bào chế', moTaThuocTinh: 'Dạng viên', maGiaTri: 'GT002', tenGiaTri: 'Viên nén', moTaGiaTri: 'Dễ sử dụng', trangThai: 'Đang sử dụng' },
    // ... thêm dữ liệu mẫu
];

export default function ThuocTinhList() {
    const [filter, setFilter] = useState({ maThuocTinh: '', tenThuocTinh: '', tenGiaTri: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const filtered = mockData.filter(d =>
        (!filter.maThuocTinh || d.maThuocTinh.toLowerCase().includes(filter.maThuocTinh.toLowerCase())) &&
        (!filter.tenThuocTinh || d.tenThuocTinh.toLowerCase().includes(filter.tenThuocTinh.toLowerCase())) &&
        (!filter.tenGiaTri || d.tenGiaTri.toLowerCase().includes(filter.tenGiaTri.toLowerCase()))
    );
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã thuộc tính" value={filter.maThuocTinh} onChange={e => setFilter(f => ({ ...f, maThuocTinh: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên thuộc tính" value={filter.tenThuocTinh} onChange={e => setFilter(f => ({ ...f, tenThuocTinh: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên giá trị" value={filter.tenGiaTri} onChange={e => setFilter(f => ({ ...f, tenGiaTri: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã thuộc tính</th>
                            <th>Tên thuộc tính</th>
                            <th>Mô tả thuộc tính</th>
                            <th>Mã giá trị</th>
                            <th>Tên giá trị</th>
                            <th>Mô tả giá trị</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.length === 0 ? (
                            <tr><td colSpan={9} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            paged.map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.maThuocTinh}</td>
                                    <td>{row.tenThuocTinh}</td>
                                    <td>{row.moTaThuocTinh}</td>
                                    <td>{row.maGiaTri}</td>
                                    <td>{row.tenGiaTri}</td>
                                    <td>{row.moTaGiaTri}</td>
                                    <td>{row.trangThai}</td>
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
                    total={filtered.length}
                    currentPage={page}
                    pageSize={pageSize}
                    onChangePage={setPage}
                    onChangePageSize={setPageSize}
                />
            </div>
        </div>
    );
} 