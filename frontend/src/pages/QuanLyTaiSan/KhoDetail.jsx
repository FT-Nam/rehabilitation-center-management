import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createKho, fetchKhoById, updateKho } from '../../features/taiSanKho/taiSanKhoSlice';

const schema = yup.object({
  maTaiSan: yup.string().required('Bắt buộc'),
  tenTaiSan: yup.string().required('Bắt buộc'),
});

const defaultValues = { maTaiSan: '', tenTaiSan: '', tonKho: '', dangSuDung: '', hong: '' };

export default function KhoDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.taiSanKho);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchKhoById(id));
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
      const res = await dispatch(createKho(values));
      if (createKho.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateKho({ id, payload: values }));
      if (updateKho.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm quản lý kho' : isEdit ? 'Chỉnh sửa quản lý kho' : 'Xem chi tiết quản lý kho'}</h1>
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
            <label>Số lượng tồn kho</label>
            <input {...register('tonKho')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Số lượng đang sử dụng</label>
            <input {...register('dangSuDung')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Số lượng hỏng/cần sửa</label>
            <input {...register('hong')} disabled={isView || loading || isSubmitting} />
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