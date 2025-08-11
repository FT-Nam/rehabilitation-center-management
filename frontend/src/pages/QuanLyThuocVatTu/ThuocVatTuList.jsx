import React, { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { deleteThuocVatTu, fetchThuocVatTuList } from '../../features/thuocVatTu/thuocVatTuSlice';
import PaginationControl from '../../components/PaginationControl';

export default function ThuocVatTuList() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { list, loading } = useSelector((s) => s.thuocVatTu);

  const [filter, setFilter] = useState({ maSanPham: '', sku: '', loaiSanPham: '' });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  useEffect(() => {
    dispatch(fetchThuocVatTuList());
  }, [dispatch]);

  const data = useMemo(() => {
    return list.filter((d) =>
      (!filter.maSanPham || d.maSanPham?.toLowerCase().includes(filter.maSanPham.toLowerCase())) &&
      (!filter.sku || d.sku?.toLowerCase().includes(filter.sku.toLowerCase())) &&
      (!filter.loaiSanPham || d.loaiSanPham?.toLowerCase().includes(filter.loaiSanPham.toLowerCase()))
    );
  }, [list, filter]);

  const paged = useMemo(() => data.slice((page - 1) * pageSize, page * pageSize), [data, page, pageSize]);

  const handleDelete = (id) => {
    if (window.confirm('Xác nhận xóa sản phẩm?')) {
      dispatch(deleteThuocVatTu(id));
    }
  };

  return (
    <div className="container-fluid">
      <div className="d-flex gap-3 mb-3 align-items-center justify-content-between">
        <div className="d-flex gap-3">
          <input className="form-control" placeholder="Tìm mã sản phẩm" value={filter.maSanPham} onChange={(e) => setFilter((f) => ({ ...f, maSanPham: e.target.value }))} />
          <input className="form-control" placeholder="Tìm SKU" value={filter.sku} onChange={(e) => setFilter((f) => ({ ...f, sku: e.target.value }))} />
          <input className="form-control" placeholder="Tìm loại sản phẩm" value={filter.loaiSanPham} onChange={(e) => setFilter((f) => ({ ...f, loaiSanPham: e.target.value }))} />
        </div>
        <button className="btn btn-primary" onClick={() => nav('new')}>+ Thêm mới</button>
      </div>
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>STT</th>
              <th>Mã sản phẩm</th>
              <th>SKU</th>
              <th>Loại sản phẩm</th>
              <th>Đơn vị tính</th>
              <th>Nhà cung cấp</th>
              <th>Mô tả</th>
              <th>Giá nhập</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr><td colSpan={9} className="text-center text-muted">Đang tải...</td></tr>
            ) : paged.length === 0 ? (
              <tr><td colSpan={9} className="text-center text-muted">Chưa có dữ liệu</td></tr>
            ) : (
              paged.map((row, idx) => (
                <tr key={row.id}>
                  <td>{(page - 1) * pageSize + idx + 1}</td>
                  <td>{row.maSanPham}</td>
                  <td>{row.sku}</td>
                  <td>{row.loaiSanPham}</td>
                  <td>{row.donViTinh}</td>
                  <td>{row.nhaCungCap}</td>
                  <td>{row.moTa}</td>
                  <td>{row.giaNhap}</td>
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