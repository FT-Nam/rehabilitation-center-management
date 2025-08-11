import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteBanGiao, fetchBanGiaoList } from '../../features/taiSanBanGiao/taiSanBanGiaoSlice';
import PaginationControl from '../../components/PaginationControl';

export default function BanGiaoList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.taiSanBanGiao);

    const [filter, setFilter] = useState({ maTaiSan: '', nguoiBanGiao: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchBanGiaoList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(row =>
            (!filter.maTaiSan || row.maTaiSan?.toLowerCase().includes(filter.maTaiSan.toLowerCase())) &&
            (!filter.nguoiBanGiao || row.nguoiBanGiao?.toLowerCase().includes(filter.nguoiBanGiao.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa bàn giao?')) {
            dispatch(deleteBanGiao(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã tài sản" value={filter.maTaiSan} onChange={e => setFilter(f => ({ ...f, maTaiSan: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm người bàn giao" value={filter.nguoiBanGiao} onChange={e => setFilter(f => ({ ...f, nguoiBanGiao: e.target.value }))} />
                </div>
                <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã tài sản</th>
                            <th>Người bàn giao</th>
                            <th>Người nhận bàn giao</th>
                            <th>Ngày bàn giao</th>
                            <th>Tình trạng bàn giao</th>
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
                                    <td>{row.nguoiBanGiao}</td>
                                    <td>{row.nguoiNhan}</td>
                                    <td>{row.ngayBanGiao}</td>
                                    <td>{row.tinhTrang}</td>
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