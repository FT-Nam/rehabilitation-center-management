import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteHocVien, fetchHocVienList } from '../../features/hocVien/hocVienSlice';
import PaginationControl from '../../components/PaginationControl';

export default function DanCuList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.hocVien);

    const [filter, setFilter] = useState({ cccd: '', hoTen: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchHocVienList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(row =>
            (!filter.cccd || row.cccd?.includes(filter.cccd)) &&
            (!filter.hoTen || row.hoTen?.toLowerCase().includes(filter.hoTen.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa học viên này?')) {
            dispatch(deleteHocVien(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm CCCD" value={filter.cccd} onChange={e => setFilter(f => ({ ...f, cccd: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm họ tên" value={filter.hoTen} onChange={e => setFilter(f => ({ ...f, hoTen: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>CCCD</th>
                            <th>Họ tên</th>
                            <th>Ngày sinh</th>
                            <th>Giới tính</th>
                            <th>Quê quán</th>
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
                                    <td>{row.cccd}</td>
                                    <td>{row.hoTen}</td>
                                    <td>{row.ngaySinh}</td>
                                    <td>{row.gioiTinh}</td>
                                    <td>{row.queQuan}</td>
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