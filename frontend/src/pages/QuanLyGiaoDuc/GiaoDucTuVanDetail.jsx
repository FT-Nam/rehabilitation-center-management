import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createGiaoDucTuVan, fetchGiaoDucTuVanById, updateGiaoDucTuVan } from '../../features/giaoDucTuVan/giaoDucTuVanSlice';

const schema = yup.object({
  maKhoa: yup.string().required('Bắt buộc'),
  tenKhoa: yup.string().required('Bắt buộc'),
  phanLoai: yup.string().required('Bắt buộc'),
});

const defaultValues = { maKhoa: '', tenKhoa: '', phanLoai: '', moTa: '' };

export default function GiaoDucTuVanDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.giaoDucTuVan);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchGiaoDucTuVanById(id));
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
      const res = await dispatch(createGiaoDucTuVan(values));
      if (createGiaoDucTuVan.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateGiaoDucTuVan({ id, payload: values }));
      if (updateGiaoDucTuVan.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm khóa học giáo dục/tư vấn' : isEdit ? 'Chỉnh sửa khóa học giáo dục/tư vấn' : 'Xem chi tiết khóa học giáo dục/tư vấn'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã khóa học *</label>
            <input {...register('maKhoa')} disabled={isView || loading || isSubmitting} />
            {errors.maKhoa && <div className="form-err">{errors.maKhoa.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên khóa học *</label>
            <input {...register('tenKhoa')} disabled={isView || loading || isSubmitting} />
            {errors.tenKhoa && <div className="form-err">{errors.tenKhoa.message}</div>}
          </div>
          <div className="form-group">
            <label>Phân loại *</label>
            <input {...register('phanLoai')} disabled={isView || loading || isSubmitting} />
            {errors.phanLoai && <div className="form-err">{errors.phanLoai.message}</div>}
          </div>
          <div className="form-group" style={{ gridColumn: '1/3' }}>
            <label>Mô tả khóa học</label>
            <textarea rows={3} {...register('moTa')} disabled={isView || loading || isSubmitting} />
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