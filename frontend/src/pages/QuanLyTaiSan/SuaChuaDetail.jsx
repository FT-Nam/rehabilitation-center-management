import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createSuaChua, fetchSuaChuaById, updateSuaChua } from '../../features/taiSanSuaChua/taiSanSuaChuaSlice';

const schema = yup.object({
  maTaiSan: yup.string().required('Bắt buộc'),
  nguoiChiuTN: yup.string().required('Bắt buộc'),
});

const defaultValues = { maTaiSan: '', tinhTrangBanDau: '', tinhTrangSuaChua: '', ngaySuaChua: '', nguoiChiuTN: '' };

export default function SuaChuaDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.taiSanSuaChua);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchSuaChuaById(id));
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
      const res = await dispatch(createSuaChua(values));
      if (createSuaChua.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateSuaChua({ id, payload: values }));
      if (updateSuaChua.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm sửa chữa tài sản' : isEdit ? 'Chỉnh sửa sửa chữa tài sản' : 'Xem chi tiết sửa chữa tài sản'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã tài sản *</label>
            <input {...register('maTaiSan')} disabled={isView || loading || isSubmitting} />
            {errors.maTaiSan && <div className="form-err">{errors.maTaiSan.message}</div>}
          </div>
          <div className="form-group">
            <label>Tình trạng ban đầu</label>
            <input {...register('tinhTrangBanDau')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Tình trạng sửa chữa</label>
            <input {...register('tinhTrangSuaChua')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Ngày sửa chữa</label>
            <input type="date" {...register('ngaySuaChua')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Người chịu trách nhiệm *</label>
            <input {...register('nguoiChiuTN')} disabled={isView || loading || isSubmitting} />
            {errors.nguoiChiuTN && <div className="form-err">{errors.nguoiChiuTN.message}</div>}
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
