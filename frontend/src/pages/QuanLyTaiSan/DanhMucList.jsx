import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maDanhMuc: 'DM01', tenDanhMuc: 'Thiết bị điện', trangThai: 'Hoạt động', donViTinh: 'Bộ' },
    { id: '2', maDanhMuc: 'DM02', tenDanhMuc: 'Văn phòng phẩm', trangThai: 'Hoạt động', donViTinh: 'Cái' },
];

export default function DanhMucList() {
    const [filter, setFilter] = useState({ maDanhMuc: '', tenDanhMuc: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maDanhMuc || row.maDanhMuc.toLowerCase().includes(filter.maDanhMuc.toLowerCase())) &&
        (!filter.tenDanhMuc || row.tenDanhMuc.toLowerCase().includes(filter.tenDanhMuc.toLowerCase()))
    );
    const paged = data.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã danh mục" value={filter.maDanhMuc} onChange={e => setFilter(f => ({ ...f, maDanhMuc: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên danh mục" value={filter.tenDanhMuc} onChange={e => setFilter(f => ({ ...f, tenDanhMuc: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã danh mục</th>
                            <th>Tên danh mục</th>
                            <th>Trạng thái</th>
                            <th>Đơn vị tính</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.length === 0 ? (
                            <tr><td colSpan={6} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            paged.map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.maDanhMuc}</td>
                                    <td>{row.tenDanhMuc}</td>
                                    <td>{row.trangThai}</td>
                                    <td>{row.donViTinh}</td>
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