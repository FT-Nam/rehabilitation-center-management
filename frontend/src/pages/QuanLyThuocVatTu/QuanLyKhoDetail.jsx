import React, { useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createThuocKho, fetchThuocKhoById, updateThuocKho } from '../../features/thuocQuanLyKho/thuocQuanLyKhoSlice';

const schema = yup.object({
  soLuongTon: yup.number().required('Bắt buộc'),
  soLuongSuDung: yup.number().required('Bắt buộc'),
  soLuongDangXuLy: yup.number().required('Bắt buộc'),
});

const defaultValues = {
  soLuongTon: '',
  soLuongSuDung: '',
  soLuongDangXuLy: '',
};

export default function QuanLyKhoDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.thuocKho);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchThuocKhoById(id));
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
      const res = await dispatch(createThuocKho(values));
      if (createThuocKho.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateThuocKho({ id, payload: values }));
      if (updateThuocKho.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm quản lý kho' : isEdit ? 'Chỉnh sửa quản lý kho' : 'Xem chi tiết quản lý kho'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Số lượng tồn kho *</label>
            <input type="number" {...register('soLuongTon')} disabled={isView || loading || isSubmitting} />
            {errors.soLuongTon && <div className="form-err">{errors.soLuongTon.message}</div>}
          </div>
          <div className="form-group">
            <label>Số lượng tồn kho có thể sử dụng *</label>
            <input type="number" {...register('soLuongSuDung')} disabled={isView || loading || isSubmitting} />
            {errors.soLuongSuDung && <div className="form-err">{errors.soLuongSuDung.message}</div>}
          </div>
          <div className="form-group">
            <label>Số lượng tồn kho đang xử lý *</label>
            <input type="number" {...register('soLuongDangXuLy')} disabled={isView || loading || isSubmitting} />
            {errors.soLuongDangXuLy && <div className="form-err">{errors.soLuongDangXuLy.message}</div>}
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