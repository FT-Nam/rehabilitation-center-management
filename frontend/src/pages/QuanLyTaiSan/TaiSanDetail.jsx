import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createTaiSan, fetchTaiSanById, updateTaiSan } from '../../features/taiSan/taiSanSlice';

const schema = yup.object({
  maTaiSan: yup.string().required('Bắt buộc'),
  tenTaiSan: yup.string().required('Bắt buộc'),
});

const defaultValues = { maTaiSan: '', tenTaiSan: '', nhaCungCap: '', trangThai: '', donViTinh: '', soLuong: '' };

export default function TaiSanDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.taiSan);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchTaiSanById(id));
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
      const res = await dispatch(createTaiSan(values));
      if (createTaiSan.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateTaiSan({ id, payload: values }));
      if (updateTaiSan.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm tài sản' : isEdit ? 'Chỉnh sửa tài sản' : 'Xem chi tiết tài sản'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã tài sản *</label>
            <input {...register('maTaiSan')} disabled={isView || loading || isSubmitting} />
            {errors.maTaiSan && <div className="form-err">{errors.maTaiSan.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên tài sản *</label>
            <input {...register('tenTaiSan')} disabled={isView || loading || isSubmitting} />
            {errors.tenTaiSan && <div className="form-err">{errors.tenTaiSan.message}</div>}
          </div>
          <div className="form-group">
            <label>Nhà cung cấp</label>
            <input {...register('nhaCungCap')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <input {...register('trangThai')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Đơn vị tính</label>
            <input {...register('donViTinh')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Số lượng</label>
            <input {...register('soLuong')} disabled={isView || loading || isSubmitting} />
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