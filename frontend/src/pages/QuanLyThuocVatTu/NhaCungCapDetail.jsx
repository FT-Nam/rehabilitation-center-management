import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createNCC, fetchNCCById, updateNCC } from '../../features/thuocNhaCungCap/thuocNhaCungCapSlice';

const schema = yup.object({
  maNCC: yup.string().required('Bắt buộc'),
  tenNCC: yup.string().required('Bắt buộc'),
  trangThai: yup.string().required('Bắt buộc'),
});

const defaultValues = { maNCC: '', tenNCC: '', trangThai: '', moTa: '' };

export default function NhaCungCapDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.nhaCungCap);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchNCCById(id));
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
      const res = await dispatch(createNCC(values));
      if (createNCC.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateNCC({ id, payload: values }));
      if (updateNCC.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm nhà cung cấp' : isEdit ? 'Chỉnh sửa nhà cung cấp' : 'Xem chi tiết nhà cung cấp'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã nhà cung cấp *</label>
            <input {...register('maNCC')} disabled={isView || loading || isSubmitting} />
            {errors.maNCC && <div className="form-err">{errors.maNCC.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên nhà cung cấp *</label>
            <input {...register('tenNCC')} disabled={isView || loading || isSubmitting} />
            {errors.tenNCC && <div className="form-err">{errors.tenNCC.message}</div>}
          </div>
          <div className="form-group">
            <label>Trạng thái *</label>
            <input {...register('trangThai')} disabled={isView || loading || isSubmitting} />
            {errors.trangThai && <div className="form-err">{errors.trangThai.message}</div>}
          </div>
          <div className="form-group">
            <label>Mô tả</label>
            <input {...register('moTa')} disabled={isView || loading || isSubmitting} />
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