import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteThuocKiemKe, fetchThuocKiemKeList } from '../../features/thuocKiemKe/thuocKiemKeSlice';
import PaginationControl from '../../components/PaginationControl';

export default function KiemKeList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.thuocKiemKe);

    const [filter, setFilter] = useState({ maSanPham: '', tenSanPham: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchThuocKiemKeList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(d =>
            (!filter.maSanPham || d.maSanPham?.toLowerCase().includes(filter.maSanPham.toLowerCase())) &&
            (!filter.tenSanPham || d.tenSanPham?.toLowerCase().includes(filter.tenSanPham.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa kiểm kê?')) {
            dispatch(deleteThuocKiemKe(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã sản phẩm" value={filter.maSanPham} onChange={e => setFilter(f => ({ ...f, maSanPham: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên sản phẩm" value={filter.tenSanPham} onChange={e => setFilter(f => ({ ...f, tenSanPham: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600 }}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã sản phẩm</th>
                            <th>Tên sản phẩm</th>
                            <th>Thời gian kiểm kê</th>
                            <th>SL tồn thực tế</th>
                            <th>SL chênh lệch</th>
                            <th>Lý do</th>
                            <th>Giá trị chênh lệch</th>
                            <th>Người thực hiện</th>
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
                                    <td>{row.maSanPham}</td>
                                    <td>{row.tenSanPham}</td>
                                    <td>{row.thoiGianKiemKe}</td>
                                    <td>{row.slTonThucTe}</td>
                                    <td>{row.slChenhLech}</td>
                                    <td>{row.lyDo}</td>
                                    <td>{row.giaTriChenhLech}</td>
                                    <td>{row.nguoiThucHien}</td>
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