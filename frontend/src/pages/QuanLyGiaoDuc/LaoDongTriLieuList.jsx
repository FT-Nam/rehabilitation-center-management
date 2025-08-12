import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteLaoDong, fetchLaoDongList } from '../../features/laoDongTriLieu/laoDongTriLieuSlice';
import PaginationControl from '../../components/PaginationControl';

export default function LaoDongTriLieuList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.laoDongTriLieu);

    const [filter, setFilter] = useState({ maDot: '', tenDot: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchLaoDongList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(row =>
            (!filter.maDot || row.maDot?.toLowerCase().includes(filter.maDot.toLowerCase())) &&
            (!filter.tenDot || row.tenDot?.toLowerCase().includes(filter.tenDot.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa đợt lao động?')) {
            dispatch(deleteLaoDong(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã đợt" value={filter.maDot} onChange={e => setFilter(f => ({ ...f, maDot: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên đợt" value={filter.tenDot} onChange={e => setFilter(f => ({ ...f, tenDot: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600 }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã đợt</th>
                            <th>Tên đợt</th>
                            <th>Địa điểm</th>
                            <th>Loại ngành nghề</th>
                            <th>Bắt đầu</th>
                            <th>Kết thúc</th>
                            <th>Số lượng</th>
                            <th>Phụ trách</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={10} className="text-center text-muted">Đang tải...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={10} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.maDot}</td>
                                    <td>{row.tenDot}</td>
                                    <td>{row.diaDiem}</td>
                                    <td>{row.loaiNganhNghe}</td>
                                    <td>{row.thoiGianBatDau}</td>
                                    <td>{row.thoiGianKetThuc}</td>
                                    <td>{row.soLuong}</td>
                                    <td>{row.phuTrach}</td>
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