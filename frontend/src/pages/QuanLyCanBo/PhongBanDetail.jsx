import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createPhongBan, fetchPhongBanById, updatePhongBan } from '../../features/phongBan/phongBanSlice';

const schema = yup.object({
  maPhong: yup.string().required('Bắt buộc'),
  tenPhong: yup.string().required('Bắt buộc'),
});

const defaultValues = { maPhong: '', tenPhong: '', trangThai: '', phuTrach: '', soLuong: '', danhSach: '' };

export default function PhongBanDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.phongBan);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchPhongBanById(id));
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
      const res = await dispatch(createPhongBan(values));
      if (createPhongBan.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updatePhongBan({ id, payload: values }));
      if (updatePhongBan.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm phòng ban/bộ phận' : isEdit ? 'Chỉnh sửa phòng ban/bộ phận' : 'Xem chi tiết phòng ban/bộ phận'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã phòng *</label>
            <input {...register('maPhong')} disabled={isView || loading || isSubmitting} />
            {errors.maPhong && <div className="form-err">{errors.maPhong.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên phòng *</label>
            <input {...register('tenPhong')} disabled={isView || loading || isSubmitting} />
            {errors.tenPhong && <div className="form-err">{errors.tenPhong.message}</div>}
          </div>
          <div className="form-group">
            <label>Trạng thái phòng</label>
            <input {...register('trangThai')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Người phụ trách phòng</label>
            <input {...register('phuTrach')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Số lượng cán bộ trong phòng</label>
            <input {...register('soLuong')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group" style={{ gridColumn: '1/3' }}>
            <label>Danh sách cán bộ trong phòng</label>
            <textarea rows={2} {...register('danhSach')} disabled={isView || loading || isSubmitting} />
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