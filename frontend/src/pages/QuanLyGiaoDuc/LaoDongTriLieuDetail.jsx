import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createLaoDong, fetchLaoDongById, updateLaoDong } from '../../features/laoDongTriLieu/laoDongTriLieuSlice';

const schema = yup.object({
  maDot: yup.string().required('Bắt buộc'),
  tenDot: yup.string().required('Bắt buộc'),
  diaDiem: yup.string().required('Bắt buộc'),
  loaiNganhNghe: yup.string().required('Bắt buộc'),
  thoiGianBatDau: yup.string().required('Bắt buộc'),
  thoiGianKetThuc: yup.string().required('Bắt buộc'),
});

const defaultValues = { maDot: '', tenDot: '', diaDiem: '', loaiNganhNghe: '', thoiGianBatDau: '', thoiGianKetThuc: '', soLuong: '', phuTrach: '' };

export default function LaoDongTriLieuDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.laoDongTriLieu);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchLaoDongById(id));
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
      const res = await dispatch(createLaoDong(values));
      if (createLaoDong.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateLaoDong({ id, payload: values }));
      if (updateLaoDong.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm đợt lao động trị liệu' : isEdit ? 'Chỉnh sửa đợt lao động trị liệu' : 'Xem chi tiết đợt lao động trị liệu'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã đợt lao động *</label>
            <input {...register('maDot')} disabled={isView || loading || isSubmitting} />
            {errors.maDot && <div className="form-err">{errors.maDot.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên đợt lao động *</label>
            <input {...register('tenDot')} disabled={isView || loading || isSubmitting} />
            {errors.tenDot && <div className="form-err">{errors.tenDot.message}</div>}
          </div>
          <div className="form-group">
            <label>Địa điểm lao động *</label>
            <input {...register('diaDiem')} disabled={isView || loading || isSubmitting} />
            {errors.diaDiem && <div className="form-err">{errors.diaDiem.message}</div>}
          </div>
          <div className="form-group">
            <label>Loại ngành nghề lao động *</label>
            <input {...register('loaiNganhNghe')} disabled={isView || loading || isSubmitting} />
            {errors.loaiNganhNghe && <div className="form-err">{errors.loaiNganhNghe.message}</div>}
          </div>
          <div className="form-group">
            <label>Thời gian bắt đầu *</label>
            <input type="date" {...register('thoiGianBatDau')} disabled={isView || loading || isSubmitting} />
            {errors.thoiGianBatDau && <div className="form-err">{errors.thoiGianBatDau.message}</div>}
          </div>
          <div className="form-group">
            <label>Thời gian kết thúc *</label>
            <input type="date" {...register('thoiGianKetThuc')} disabled={isView || loading || isSubmitting} />
            {errors.thoiGianKetThuc && <div className="form-err">{errors.thoiGianKetThuc.message}</div>}
          </div>
          <div className="form-group">
            <label>Số lượng người cai nghiện</label>
            <input {...register('soLuong')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Người phụ trách</label>
            <input {...register('phuTrach')} disabled={isView || loading || isSubmitting} />
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