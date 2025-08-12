import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteDonViTinh, fetchDonViTinh } from '../../features/thuocDonViTinh/thuocDonViTinhSlice';
import PaginationControl from '../../components/PaginationControl';

export default function DonViTinhList() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { list, loading } = useSelector((s) => s.thuocDonViTinh);

  const [filter, setFilter] = useState({ maDVT: '', tenDonVi: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchDonViTinh());
  }, [dispatch]);

  const data = useMemo(() => {
    return list.filter((d) =>
      (!filter.maDVT || d.maDVT?.toLowerCase().includes(filter.maDVT.toLowerCase())) &&
      (!filter.tenDonVi || d.tenDonVi?.toLowerCase().includes(filter.tenDonVi.toLowerCase()))
    );
  }, [list, filter]);

  const paged = useMemo(() => data.slice((page - 1) * pageSize, page * pageSize), [data, page, pageSize]);

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa đơn vị tính?')) {
      dispatch(deleteDonViTinh(id));
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
        <div className="d-flex gap-3">
          <input className="form-control" placeholder="Tìm mã đơn vị" value={filter.maDVT} onChange={(e) => setFilter((f) => ({ ...f, maDVT: e.target.value }))} />
          <input className="form-control" placeholder="Tìm tên đơn vị" value={filter.tenDonVi} onChange={(e) => setFilter((f) => ({ ...f, tenDonVi: e.target.value }))} />
        </div>
        <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã đơn vị tính</th>
              <th>Tên đơn vị</th>
              <th>Mô tả</th>
              <th>Trạng thái</th>
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
                  <td>{row.maDVT}</td>
                  <td>{row.tenDonVi}</td>
                  <td>{row.moTa}</td>
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