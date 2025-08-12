import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteKho, fetchKhoList } from '../../features/taiSanKho/taiSanKhoSlice';
import PaginationControl from '../../components/PaginationControl';

export default function KhoList() {
    const dispatch = useDispatch();
    const nav = useNavigate();
    const { list, loading } = useSelector((s) => s.taiSanKho);

    const [filter, setFilter] = useState({ maTaiSan: '', tenTaiSan: '' });
    const [page, setPage] = useState(1);
    const [pageSize, setPageSize] = useState(10);

    useEffect(() => {
        dispatch(fetchKhoList());
    }, [dispatch]);

    const data = useMemo(() => {
        return list.filter(row =>
            (!filter.maTaiSan || row.maTaiSan?.toLowerCase().includes(filter.maTaiSan.toLowerCase())) &&
            (!filter.tenTaiSan || row.tenTaiSan?.toLowerCase().includes(filter.tenTaiSan.toLowerCase()))
        );
    }, [list, filter]);

    const handleDelete = (id) => {
        if (window.confirm('Xác nhận xóa bản ghi kho?')) {
            dispatch(deleteKho(id));
        }
    };

    return (
        <div className="container-fluid">
            <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
                <div className="d-flex gap-3">
                    <input className="form-control" placeholder="Tìm mã tài sản" value={filter.maTaiSan} onChange={e => setFilter(f => ({ ...f, maTaiSan: e.target.value }))} />
                    <input className="form-control" placeholder="Tìm tên tài sản" value={filter.tenTaiSan} onChange={e => setFilter(f => ({ ...f, tenTaiSan: e.target.value }))} />
                </div>
                <button style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600 }} onClick={() => nav('new')}>+ Thêm mới</button>
            </div>
            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>STT</th>
                            <th>Mã tài sản</th>
                            <th>Tên tài sản</th>
                            <th>Số lượng tồn kho</th>
                            <th>Số lượng đang sử dụng</th>
                            <th>Số lượng hỏng/cần sửa</th>
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
                                    <td>{row.tenTaiSan}</td>
                                    <td>{row.tonKho}</td>
                                    <td>{row.dangSuDung}</td>
                                    <td>{row.hong}</td>
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