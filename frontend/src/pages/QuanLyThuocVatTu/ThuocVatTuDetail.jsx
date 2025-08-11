import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createThuocVatTu, fetchThuocVatTuById, updateThuocVatTu } from '../../features/thuocVatTu/thuocVatTuSlice';

const schema = yup.object({
  maSanPham: yup.string().required('Bắt buộc'),
  sku: yup.string().required('Bắt buộc'),
  loaiSanPham: yup.string().required('Bắt buộc'),
  donViTinh: yup.string().required('Bắt buộc'),
  nhaCungCap: yup.string().required('Bắt buộc'),
  giaNhap: yup.string().required('Bắt buộc'),
});

const defaultValues = { maSanPham: '', sku: '', loaiSanPham: '', donViTinh: '', nhaCungCap: '', moTa: '', giaNhap: '' };

export default function ThuocVatTuDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.thuocVatTu);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchThuocVatTuById(id));
    } else {
      reset(defaultValues);
    }
  }, [dispatch, id, isNew, reset]);

  useEffect(() => {
    if (current && !isNew) {
      reset(current);
    }
  }, [current, isNew, reset]);

  const onSubmit = async (values) => {
    if (isNew) {
      const res = await dispatch(createThuocVatTu(values));
      if (createThuocVatTu.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateThuocVatTu({ id, payload: values }));
      if (updateThuocVatTu.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm thuốc/vật tư' : isEdit ? 'Chỉnh sửa thuốc/vật tư' : 'Xem chi tiết thuốc/vật tư'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã sản phẩm *</label>
            <input {...register('maSanPham')} disabled={isView || loading || isSubmitting} />
            {errors.maSanPham && <div className="form-err">{errors.maSanPham.message}</div>}
          </div>
          <div className="form-group">
            <label>SKU *</label>
            <input {...register('sku')} disabled={isView || loading || isSubmitting} />
            {errors.sku && <div className="form-err">{errors.sku.message}</div>}
          </div>
          <div className="form-group">
            <label>Loại sản phẩm *</label>
            <input {...register('loaiSanPham')} disabled={isView || loading || isSubmitting} />
            {errors.loaiSanPham && <div className="form-err">{errors.loaiSanPham.message}</div>}
          </div>
          <div className="form-group">
            <label>Đơn vị tính *</label>
            <input {...register('donViTinh')} disabled={isView || loading || isSubmitting} />
            {errors.donViTinh && <div className="form-err">{errors.donViTinh.message}</div>}
          </div>
          <div className="form-group">
            <label>Nhà cung cấp *</label>
            <input {...register('nhaCungCap')} disabled={isView || loading || isSubmitting} />
            {errors.nhaCungCap && <div className="form-err">{errors.nhaCungCap.message}</div>}
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <input {...register('moTa')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Giá nhập *</label>
            <input {...register('giaNhap')} disabled={isView || loading || isSubmitting} />
            {errors.giaNhap && <div className="form-err">{errors.giaNhap.message}</div>}
          </div>
        </div>
        <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 18 }}>
          <button type="button" onClick={() => nav(-1)}>Quay lại</button>
          {!isView && <button type="submit" disabled={loading || isSubmitting} style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Lưu</button>}
        </div>
      </form>
    </div>
  );
}