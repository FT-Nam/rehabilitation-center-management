import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDaoTaoNghe, fetchDaoTaoNgheList } from '../../features/daoTaoNghe/daoTaoNgheSlice';
import PaginationControl from '../../components/PaginationControl';

export default function DaoTaoNgheList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.daoTaoNghe);

    const [filter, setFilter] = useState({ maKhoa: '', tenKhoa: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchDaoTaoNgheList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(row =>
            (!filter.maKhoa || row.maKhoa?.toLowerCase().includes(filter.maKhoa.toLowerCase())) &&
            (!filter.tenKhoa || row.tenKhoa?.toLowerCase().includes(filter.tenKhoa.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa khóa đào tạo?')) {
            dispatch(deleteDaoTaoNghe(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã khóa" value={filter.maKhoa} onChange={e => setFilter(f => ({ ...f, maKhoa: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên khóa" value={filter.tenKhoa} onChange={e => setFilter(f => ({ ...f, tenKhoa: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã khóa</th>
                            <th>Tên khóa</th>
                            <th>Loại ngành nghề</th>
                            <th>Mô tả</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={6} className="text-center text-muted">Đang tải...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={6} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.maKhoa}</td>
                                    <td>{row.tenKhoa}</td>
                                    <td>{row.loaiNganhNghe}</td>
                                    <td>{row.moTa}</td>
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