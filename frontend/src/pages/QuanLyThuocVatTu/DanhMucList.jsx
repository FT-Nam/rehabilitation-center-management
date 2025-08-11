import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: 1, maDanhMuc: 'DM001', tenDanhMuc: 'Thuốc giảm đau', trangThai: 'Đang sử dụng', donViTinh: 'Hộp' },
    { id: 2, maDanhMuc: 'DM002', tenDanhMuc: 'Vật tư y tế', trangThai: 'Ngừng sử dụng', donViTinh: 'Cái' },
    // ... thêm dữ liệu mẫu
];

export default function DanhMucList() {
    const [filter, setFilter] = useState({ maDanhMuc: '', tenDanhMuc: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const filtered = mockData.filter(d =>
        (!filter.maDanhMuc || d.maDanhMuc.toLowerCase().includes(filter.maDanhMuc.toLowerCase())) &&
        (!filter.tenDanhMuc || d.tenDanhMuc.toLowerCase().includes(filter.tenDanhMuc.toLowerCase()))
    );
    const paged = filtered.slice((page - 1) * pageSize, page * pageSize);
    return (
        <div>
            <div style={{ display: 'flex', gap: 16, marginBottom: 12, alignItems: 'center', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', gap: 16 }}>
                    <input placeholder="Tìm mã danh mục" value={filter.maDanhMuc} onChange={e => setFilter(f => ({ ...f, maDanhMuc: e.target.value }))} />
                    <input placeholder="Tìm tên danh mục" value={filter.tenDanhMuc} onChange={e => setFilter(f => ({ ...f, tenDanhMuc: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600 }}>+ Thêm mới</button>
            </div>
            <table className="table-hocvien">
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
                        <tr><td colSpan={6} style={{ textAlign: 'center', color: '#888' }}>Chưa có dữ liệu</td></tr>
                    ) : paged.map((row, idx) => (
                        <tr key={row.id}>
                            <td>{(page - 1) * pageSize + idx + 1}</td>
                            <td>{row.maDanhMuc}</td>
                            <td>{row.tenDanhMuc}</td>
                            <td>{row.trangThai}</td>
                            <td>{row.donViTinh}</td>
                            <td>
                                <button title="Xem chi tiết" onClick={() => nav(`${row.id}`)} style={{ background: 'none', border: 'none', color: '#2980b9', fontSize: 18, cursor: 'pointer', marginRight: 6 }}>👁️</button>
                                <button title="Sửa" onClick={() => nav(`${row.id}/edit`)} style={{ background: 'none', border: 'none', color: '#f39c12', fontSize: 18, cursor: 'pointer' }}>✏️</button>
                                <button title="Xóa" style={{ background: 'none', border: 'none', color: '#e74c3c', fontSize: 18, cursor: 'pointer' }}>🗑️</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div style={{ marginTop: 16 }}>
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