import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createKiemKe, fetchKiemKeById, updateKiemKe } from '../../features/taiSanKiemKe/taiSanKiemKeSlice';

const schema = yup.object({
  maSanPham: yup.string().required('Bắt buộc'),
  tenSanPham: yup.string().required('Bắt buộc'),
});

const defaultValues = { maSanPham: '', tenSanPham: '', thoiGian: '', tonThucTe: '', chenhLech: '', lyDo: '', giaTriChenhLech: '', nguoiThucHien: '' };

export default function KiemKeDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.taiSanKiemKe);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchKiemKeById(id));
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
      const res = await dispatch(createKiemKe(values));
      if (createKiemKe.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateKiemKe({ id, payload: values }));
      if (updateKiemKe.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm kiểm kê tài sản' : isEdit ? 'Chỉnh sửa kiểm kê tài sản' : 'Xem chi tiết kiểm kê tài sản'}</h1>
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
            <label>Thời gian kiểm kê</label>
            <input type="date" {...register('thoiGian')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>SL tồn thực tế</label>
            <input {...register('tonThucTe')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>SL chênh lệch</label>
            <input {...register('chenhLech')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Lý do</label>
            <input {...register('lyDo')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Giá trị chênh lệch</label>
            <input {...register('giaTriChenhLech')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Người thực hiện</label>
            <input {...register('nguoiThucHien')} disabled={isView || loading || isSubmitting} />
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