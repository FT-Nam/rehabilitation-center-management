import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', hoTen: 'Nguyễn Văn A', ngheNghiep: 'Công nhân', trinhDo: 'THPT', noiLamViec: 'Hà Nội' },
    { id: '2', hoTen: 'Trần Thị B', ngheNghiep: 'Nông dân', trinhDo: 'THCS', noiLamViec: 'Nam Định' },
];

export default function HocVanList() {
    const [filter, setFilter] = useState({ hoTen: '', ngheNghiep: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.hoTen || row.hoTen.toLowerCase().includes(filter.hoTen.toLowerCase())) &&
        (!filter.ngheNghiep || row.ngheNghiep.toLowerCase().includes(filter.ngheNghiep.toLowerCase()))
    );
    const paged = data.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm họ tên" value={filter.hoTen} onChange={e => setFilter(f => ({ ...f, hoTen: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm nghề nghiệp" value={filter.ngheNghiep} onChange={e => setFilter(f => ({ ...f, ngheNghiep: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Họ tên</th>
                            <th>Nghề nghiệp</th>
                            <th>Trình độ</th>
                            <th>Nơi làm việc</th>
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
                                    <td>{row.hoTen}</td>
                                    <td>{row.ngheNghiep}</td>
                                    <td>{row.trinhDo}</td>
                                    <td>{row.noiLamViec}</td>
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