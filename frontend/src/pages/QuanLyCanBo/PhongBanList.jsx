import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deletePhongBan, fetchPhongBanList } from '../../features/phongBan/phongBanSlice';
import PaginationControl from '../../components/PaginationControl';

export default function PhongBanList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.phongBan);

    const [filter, setFilter] = useState({ maPhong: '', tenPhong: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchPhongBanList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(row =>
            (!filter.maPhong || row.maPhong?.toLowerCase().includes(filter.maPhong.toLowerCase())) &&
            (!filter.tenPhong || row.tenPhong?.toLowerCase().includes(filter.tenPhong.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa phòng ban này?')) {
            dispatch(deletePhongBan(id));
        }
    };

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
                            <th>Trạng thái</th>
                            <th>Phụ trách</th>
                            <th>Số lượng cán bộ</th>
                            <th>Danh sách cán bộ</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={8} className="text-center text-muted">Đang tải...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={8} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.maPhong}</td>
                                    <td>{row.tenPhong}</td>
                                    <td>{row.trangThai}</td>
                                    <td>{row.phuTrach}</td>
                                    <td>{row.soLuong}</td>
                                    <td>{row.danhSach}</td>
                                    <td className="d-flex gap-2">
                                        <button title="Xem chi tiết" onClick={() => nav(`${row.id}`)} className="btn btn-link p-0">👁️</button>
                                        <button title="Sửa" onClick={() => nav(`${row.id}/edit`)} className="btn btn-link p-0 text-warning">✏️</button>
                                        <button title="Xóa" onClick={() => handleDelete(row.id)} className="btn btn-link p-0 text-danger">🗑️</button>
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