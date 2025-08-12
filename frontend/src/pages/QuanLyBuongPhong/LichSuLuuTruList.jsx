import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', tenHocVien: 'Nguyễn Văn A', maHocVien: 'HV01', vaoPhong: '2024-06-01', raPhong: '2024-07-01', ghiChu: 'Chuyển phòng' },
    { id: '2', tenHocVien: 'Trần Thị B', maHocVien: 'HV02', vaoPhong: '2024-06-15', raPhong: '', ghiChu: '' },
];

export default function LichSuLuuTruList() {
    const [filter, setFilter] = useState({ tenHocVien: '', maHocVien: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.tenHocVien || row.tenHocVien.toLowerCase().includes(filter.tenHocVien.toLowerCase())) &&
        (!filter.maHocVien || row.maHocVien.toLowerCase().includes(filter.maHocVien.toLowerCase()))
    );
    const paged = data.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm tên học viên" value={filter.tenHocVien} onChange={e => setFilter(f => ({ ...f, tenHocVien: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm mã học viên" value={filter.maHocVien} onChange={e => setFilter(f => ({ ...f, maHocVien: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Tên học viên</th>
                            <th>Mã học viên</th>
                            <th>Thời gian vào phòng</th>
                            <th>Thời gian ra phòng</th>
                            <th>Ghi chú</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paged.length === 0 ? (
                            <tr><td colSpan={7} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            paged.map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.tenHocVien}</td>
                                    <td>{row.maHocVien}</td>
                                    <td>{row.vaoPhong}</td>
                                    <td>{row.raPhong}</td>
                                    <td>{row.ghiChu}</td>
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