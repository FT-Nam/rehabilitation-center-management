import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteNCC, fetchNCCList } from '../../features/thuocNhaCungCap/thuocNhaCungCapSlice';
import PaginationControl from '../../components/PaginationControl';

export default function NhaCungCapList() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { list, loading } = useSelector((s) => s.nhaCungCap);

  const [filter, setFilter] = useState({ maNCC: '', tenNCC: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchNCCList());
  }, [dispatch]);

  const data = useMemo(() => {
    return list.filter((d) =>
      (!filter.maNCC || d.maNCC?.toLowerCase().includes(filter.maNCC.toLowerCase())) &&
      (!filter.tenNCC || d.tenNCC?.toLowerCase().includes(filter.tenNCC.toLowerCase()))
    );
  }, [list, filter]);

  const paged = useMemo(() => data.slice((page - 1) * pageSize, page * pageSize), [data, page, pageSize]);

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa nhà cung cấp?')) {
      dispatch(deleteNCC(id));
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
        <div className="d-flex gap-3">
          <input className="form-control" placeholder="Tìm mã nhà cung cấp" value={filter.maNCC} onChange={(e) => setFilter((f) => ({ ...f, maNCC: e.target.value }))} />
          <input className="form-control" placeholder="Tìm tên nhà cung cấp" value={filter.tenNCC} onChange={(e) => setFilter((f) => ({ ...f, tenNCC: e.target.value }))} />
        </div>
        <button onClick={() => nav('new')} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '6px 18px', fontWeight: 600 }}>+ Thêm mới</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã nhà cung cấp</th>
              <th>Tên nhà cung cấp</th>
              <th>Trạng thái</th>
              <th>Mô tả</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={6} className="text-center text-muted">Đang tải...</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={6} className="text-center text-muted">Chưa có dữ liệu</td></tr>
            ) : (
              paged.map((row, idx) => (
                <tr key={row.id}>
                  <td>{(page - 1) * pageSize + idx + 1}</td>
                  <td>{row.maNCC}</td>
                  <td>{row.tenNCC}</td>
                  <td>{row.trangThai}</td>
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