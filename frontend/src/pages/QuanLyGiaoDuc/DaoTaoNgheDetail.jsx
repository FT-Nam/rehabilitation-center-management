import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createDaoTaoNghe, fetchDaoTaoNgheById, updateDaoTaoNghe } from '../../features/daoTaoNghe/daoTaoNgheSlice';

const schema = yup.object({
  maKhoa: yup.string().required('Bắt buộc'),
  tenKhoa: yup.string().required('Bắt buộc'),
  loaiNganhNghe: yup.string().required('Bắt buộc'),
});

const defaultValues = { maKhoa: '', tenKhoa: '', loaiNganhNghe: '', moTa: '' };

export default function DaoTaoNgheDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.daoTaoNghe);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchDaoTaoNgheById(id));
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
      const res = await dispatch(createDaoTaoNghe(values));
      if (createDaoTaoNghe.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateDaoTaoNghe({ id, payload: values }));
      if (updateDaoTaoNghe.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm khóa đào tạo nghề' : isEdit ? 'Chỉnh sửa khóa đào tạo nghề' : 'Xem chi tiết khóa đào tạo nghề'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã khóa đào tạo nghề *</label>
            <input {...register('maKhoa')} disabled={isView || loading || isSubmitting} />
            {errors.maKhoa && <div className="form-err">{errors.maKhoa.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên khóa đào tạo nghề *</label>
            <input {...register('tenKhoa')} disabled={isView || loading || isSubmitting} />
            {errors.tenKhoa && <div className="form-err">{errors.tenKhoa.message}</div>}
          </div>
          <div className="form-group">
            <label>Loại ngành nghề *</label>
            <input {...register('loaiNganhNghe')} disabled={isView || loading || isSubmitting} />
            {errors.loaiNganhNghe && <div className="form-err">{errors.loaiNganhNghe.message}</div>}
          </div>
          <div className="form-group" style={{ gridColumn: '1/3' }}>
            <label>Mô tả khóa đào tạo nghề</label>
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