import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PaginationControl from '../../components/PaginationControl';

const mockData = [
    { id: '1', maSanPham: 'TS01', maSerial: 'SR001', tinhTrang: 'Đang sử dụng', khauHao: '2', ngayNhap: '2023-01-01' },
    { id: '2', maSanPham: 'TS01', maSerial: 'SR002', tinhTrang: 'Bảo trì', khauHao: '1', ngayNhap: '2023-06-01' },
];

export default function SerialList() {
    const [filter, setFilter] = useState({ maSanPham: '', maSerial: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const nav = useNavigate();
    const data = mockData.filter(row =>
        (!filter.maSanPham || row.maSanPham.toLowerCase().includes(filter.maSanPham.toLowerCase())) &&
        (!filter.maSerial || row.maSerial.toLowerCase().includes(filter.maSerial.toLowerCase()))
    );
    const paged = data.slice((page - 1) * pageSize, page * pageSize);

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã sản phẩm" value={filter.maSanPham} onChange={e => setFilter(f => ({ ...f, maSanPham: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm mã serial" value={filter.maSerial} onChange={e => setFilter(f => ({ ...f, maSerial: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sản phẩm</th>
                            <th>Mã serial</th>
                            <th>Tình trạng</th>
                            <th>Khấu hao theo năm</th>
                            <th>Ngày nhập kho</th>
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
                                    <td>{row.maSanPham}</td>
                                    <td>{row.maSerial}</td>
                                    <td>{row.tinhTrang}</td>
                                    <td>{row.khauHao}</td>
                                    <td>{row.ngayNhap}</td>
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