import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteSuaChua, fetchSuaChuaList } from '../../features/taiSanSuaChua/taiSanSuaChuaSlice';
import PaginationControl from '../../components/PaginationControl';

export default function SuaChuaList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.taiSanSuaChua);

    const [filter, setFilter] = useState({ maTaiSan: '', nguoiChiuTN: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchSuaChuaList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(row =>
            (!filter.maTaiSan || row.maTaiSan?.toLowerCase().includes(filter.maTaiSan.toLowerCase())) &&
            (!filter.nguoiChiuTN || row.nguoiChiuTN?.toLowerCase().includes(filter.nguoiChiuTN.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa sửa chữa?')) {
            dispatch(deleteSuaChua(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã tài sản" value={filter.maTaiSan} onChange={e => setFilter(f => ({ ...f, maTaiSan: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm người chịu trách nhiệm" value={filter.nguoiChiuTN} onChange={e => setFilter(f => ({ ...f, nguoiChiuTN: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã tài sản</th>
                            <th>Tình trạng ban đầu</th>
                            <th>Tình trạng sửa chữa</th>
                            <th>Ngày sửa chữa</th>
                            <th>Người chịu trách nhiệm</th>
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
                                    <td>{row.maTaiSan}</td>
                                    <td>{row.tinhTrangBanDau}</td>
                                    <td>{row.tinhTrangSuaChua}</td>
                                    <td>{row.ngaySuaChua}</td>
                                    <td>{row.nguoiChiuTN}</td>
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
