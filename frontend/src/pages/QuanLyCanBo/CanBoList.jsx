import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteCanBo, fetchCanBoList } from '../../features/canBo/canBoSlice';
import PaginationControl from '../../components/PaginationControl';

export default function CanBoList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.canBo);

    const [filter, setFilter] = useState({ maCanBo: '', tenCanBo: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchCanBoList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(row =>
            (!filter.maCanBo || row.maCanBo?.toLowerCase().includes(filter.maCanBo.toLowerCase())) &&
            (!filter.tenCanBo || row.tenCanBo?.toLowerCase().includes(filter.tenCanBo.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa cán bộ này?')) {
            dispatch(deleteCanBo(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã cán bộ" value={filter.maCanBo} onChange={e => setFilter(f => ({ ...f, maCanBo: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên cán bộ" value={filter.tenCanBo} onChange={e => setFilter(f => ({ ...f, tenCanBo: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã cán bộ</th>
                            <th>Tên cán bộ</th>
                            <th>Phòng ban</th>
                            <th>Chức vụ</th>
                            <th>Trạng thái</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={7} className="text-center text-muted">Đang tải...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={7} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.maCanBo}</td>
                                    <td>{row.tenCanBo}</td>
                                    <td>{row.phongBan}</td>
                                    <td>{row.chucVu}</td>
                                    <td>{row.trangThai}</td>
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