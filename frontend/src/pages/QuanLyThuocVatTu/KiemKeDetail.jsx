import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createThuocKiemKe, fetchThuocKiemKeById, updateThuocKiemKe } from '../../features/thuocKiemKe/thuocKiemKeSlice';

const schema = yup.object({
  maSanPham: yup.string().required('Bắt buộc'),
  tenSanPham: yup.string().required('Bắt buộc'),
  thoiGianKiemKe: yup.string().required('Bắt buộc'),
  slTonThucTe: yup.number().required('Bắt buộc'),
  slChenhLech: yup.number().required('Bắt buộc'),
  giaTriChenhLech: yup.string().required('Bắt buộc'),
  nguoiThucHien: yup.string().required('Bắt buộc'),
});

const defaultValues = {
  maSanPham: '',
  tenSanPham: '',
  thoiGianKiemKe: '',
  slTonThucTe: '',
  slChenhLech: '',
  lyDo: '',
  giaTriChenhLech: '',
  nguoiThucHien: '',
};

export default function KiemKeDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.thuocKiemKe);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchThuocKiemKeById(id));
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
      const res = await dispatch(createThuocKiemKe(values));
      if (createThuocKiemKe.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateThuocKiemKe({ id, payload: values }));
      if (updateThuocKiemKe.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm kiểm kê' : isEdit ? 'Chỉnh sửa kiểm kê' : 'Xem chi tiết kiểm kê'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã sản phẩm *</label>
            <input {...register('maSanPham')} disabled={isView || loading || isSubmitting} />
            {errors.maSanPham && <div className="form-err">{errors.maSanPham.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên sản phẩm *</label>
            <input {...register('tenSanPham')} disabled={isView || loading || isSubmitting} />
            {errors.tenSanPham && <div className="form-err">{errors.tenSanPham.message}</div>}
          </div>
          <div className="form-group">
            <label>Thời gian kiểm kê *</label>
            <input type="date" {...register('thoiGianKiemKe')} disabled={isView || loading || isSubmitting} />
            {errors.thoiGianKiemKe && <div className="form-err">{errors.thoiGianKiemKe.message}</div>}
          </div>
          <div className="form-group">
            <label>SL tồn thực tế *</label>
            <input type="number" {...register('slTonThucTe')} disabled={isView || loading || isSubmitting} />
            {errors.slTonThucTe && <div className="form-err">{errors.slTonThucTe.message}</div>}
          </div>
          <div className="form-group">
            <label>SL chênh lệch *</label>
            <input type="number" {...register('slChenhLech')} disabled={isView || loading || isSubmitting} />
            {errors.slChenhLech && <div className="form-err">{errors.slChenhLech.message}</div>}
          </div>
          <div className="form-group">
            <label>Lý do</label>
            <input {...register('lyDo')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Giá trị chênh lệch *</label>
            <input {...register('giaTriChenhLech')} disabled={isView || loading || isSubmitting} />
            {errors.giaTriChenhLech && <div className="form-err">{errors.giaTriChenhLech.message}</div>}
          </div>
          <div className="form-group">
            <label>Người thực hiện *</label>
            <input {...register('nguoiThucHien')} disabled={isView || loading || isSubmitting} />
            {errors.nguoiThucHien && <div className="form-err">{errors.nguoiThucHien.message}</div>}
          </div>
        </div>
        <div className="form-footer">
          <button type="button" className="form-btn back-btn" onClick={() => nav(-1)}>Quay lại</button>
          {!isView && (
            <button type="submit" className="form-btn save-btn" disabled={isSubmitting || loading}>
              {isNew ? 'Thêm mới' : 'Lưu'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
} 