import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createBanGiao, fetchBanGiaoById, updateBanGiao } from '../../features/taiSanBanGiao/taiSanBanGiaoSlice';

const schema = yup.object({
  maTaiSan: yup.string().required('Bắt buộc'),
  nguoiBanGiao: yup.string().required('Bắt buộc'),
  nguoiNhan: yup.string().required('Bắt buộc'),
});

const defaultValues = { maTaiSan: '', nguoiBanGiao: '', nguoiNhan: '', ngayBanGiao: '', tinhTrang: '' };

export default function BanGiaoDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.taiSanBanGiao);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchBanGiaoById(id));
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
      const res = await dispatch(createBanGiao(values));
      if (createBanGiao.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateBanGiao({ id, payload: values }));
      if (updateBanGiao.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm bàn giao tài sản' : isEdit ? 'Chỉnh sửa bàn giao tài sản' : 'Xem chi tiết bàn giao tài sản'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã tài sản *</label>
            <input {...register('maTaiSan')} disabled={isView || loading || isSubmitting} />
            {errors.maTaiSan && <div className="form-err">{errors.maTaiSan.message}</div>}
          </div>
          <div className="form-group">
            <label>Người bàn giao *</label>
            <input {...register('nguoiBanGiao')} disabled={isView || loading || isSubmitting} />
            {errors.nguoiBanGiao && <div className="form-err">{errors.nguoiBanGiao.message}</div>}
          </div>
          <div className="form-group">
            <label>Người nhận bàn giao *</label>
            <input {...register('nguoiNhan')} disabled={isView || loading || isSubmitting} />
            {errors.nguoiNhan && <div className="form-err">{errors.nguoiNhan.message}</div>}
          </div>
          <div className="form-group">
            <label>Ngày bàn giao</label>
            <input type="date" {...register('ngayBanGiao')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Tình trạng bàn giao</label>
            <input {...register('tinhTrang')} disabled={isView || loading || isSubmitting} />
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