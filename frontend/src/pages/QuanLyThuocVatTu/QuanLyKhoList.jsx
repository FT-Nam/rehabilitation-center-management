import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteThuocKho, fetchThuocKhoList } from '../../features/thuocQuanLyKho/thuocQuanLyKhoSlice';
import PaginationControl from '../../components/PaginationControl';

export default function QuanLyKhoList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.thuocKho);

    const [filter, setFilter] = useState({ soLuongTon: '', soLuongSuDung: '', soLuongDangXuLy: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchThuocKhoList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(d =>
            (!filter.soLuongTon || String(d.soLuongTon).includes(filter.soLuongTon)) &&
            (!filter.soLuongSuDung || String(d.soLuongSuDung).includes(filter.soLuongSuDung)) &&
            (!filter.soLuongDangXuLy || String(d.soLuongDangXuLy).includes(filter.soLuongDangXuLy))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa quản lý kho?')) {
            dispatch(deleteThuocKho(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm SL tồn kho" value={filter.soLuongTon} onChange={e => setFilter(f => ({ ...f, soLuongTon: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm SL có thể sử dụng" value={filter.soLuongSuDung} onChange={e => setFilter(f => ({ ...f, soLuongSuDung: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm SL đang xử lý" value={filter.soLuongDangXuLy} onChange={e => setFilter(f => ({ ...f, soLuongDangXuLy: e.target.value }))} />
                </div>
                <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600 }}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Số lượng tồn kho</th>
                            <th>Số lượng tồn kho có thể sử dụng</th>
                            <th>Số lượng tồn kho đang xử lý</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {loading ? (
                            <tr><td colSpan={5} className="text-center text-muted">Đang tải...</td></tr>
                        ) : data.length === 0 ? (
                            <tr><td colSpan={5} className="text-center text-muted">Chưa có dữ liệu</td></tr>
                        ) : (
                            data.slice((page - 1) * pageSize, page * pageSize).map((row, idx) => (
                                <tr key={row.id}>
                                    <td>{(page - 1) * pageSize + idx + 1}</td>
                                    <td>{row.soLuongTon}</td>
                                    <td>{row.soLuongSuDung}</td>
                                    <td>{row.soLuongDangXuLy}</td>
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