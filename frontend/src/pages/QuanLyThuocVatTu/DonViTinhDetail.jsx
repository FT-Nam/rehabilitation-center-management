import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createDonViTinh, fetchDonViTinhById, updateDonViTinh } from '../../features/thuocDonViTinh/thuocDonViTinhSlice';

const schema = yup.object({
  maDVT: yup.string().required('Bắt buộc'),
  tenDonVi: yup.string().required('Bắt buộc'),
  trangThai: yup.string().required('Bắt buộc'),
});

const defaultValues = { maDVT: '', tenDonVi: '', moTa: '', trangThai: '' };

export default function DonViTinhDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.thuocDonViTinh);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchDonViTinhById(id));
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
      const res = await dispatch(createDonViTinh(values));
      if (createDonViTinh.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateDonViTinh({ id, payload: values }));
      if (updateDonViTinh.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm đơn vị tính' : isEdit ? 'Chỉnh sửa đơn vị tính' : 'Xem chi tiết đơn vị tính'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã đơn vị tính *</label>
            <input {...register('maDVT')} disabled={isView || loading || isSubmitting} />
            {errors.maDVT && <div className="form-err">{errors.maDVT.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên đơn vị *</label>
            <input {...register('tenDonVi')} disabled={isView || loading || isSubmitting} />
            {errors.tenDonVi && <div className="form-err">{errors.tenDonVi.message}</div>}
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <input {...register('moTa')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Trạng thái *</label>
            <input {...register('trangThai')} disabled={isView || loading || isSubmitting} />
            {errors.trangThai && <div className="form-err">{errors.trangThai.message}</div>}
          </div>
        </div>
        <div className="form-footer">
          <button type="button" className="form-btn back-btn" onClick={() => nav(-1)}>Quay lại</button>
          {!isView && (
            <button type="submit" className="form-btn save-btn" disabled={loading || isSubmitting}>
              {isNew ? 'Thêm mới' : 'Lưu'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}