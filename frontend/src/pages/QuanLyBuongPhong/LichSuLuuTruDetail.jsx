import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchLichSuLuuTruById, 
  createLichSuLuuTru, 
  updateLichSuLuuTru,
  clearError,
  clearSuccess 
} from '../../features/lichSuLuuTru/lichSuLuuTruSlice';

const schema = yup.object({
  tenHocVien: yup.string().required('Tên học viên là bắt buộc'),
  maHocVien: yup.string().required('Mã học viên là bắt buộc'),
  vaoPhong: yup.date().typeError('Ngày vào phòng không hợp lệ'),
  raPhong: yup.date().typeError('Ngày ra phòng không hợp lệ'),
  ghiChu: yup.string()
});

const defaultValues = {
  tenHocVien: '',
  maHocVien: '',
  vaoPhong: '',
  raPhong: '',
  ghiChu: ''
};

export default function LichSuLuuTruDetail({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const isNew = mode === 'add' || location.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || location.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { current, loading, error, success } = useSelector(state => state.lichSuLuuTru);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchLichSuLuuTruById(id));
    }
  }, [dispatch, id, isNew]);

  useEffect(() => {
    if (current && !isNew) {
      reset(current);
    }
  }, [current, reset, isNew]);

  useEffect(() => {
    if (success) {
      dispatch(clearSuccess());
      navigate(-1);
    }
  }, [success, dispatch, navigate]);

  useEffect(() => {
    if (error) {
      dispatch(clearError());
    }
  }, [error, dispatch]);

  const onSubmit = (data) => {
    if (isNew) {
      dispatch(createLichSuLuuTru(data));
    } else if (isEdit) {
      dispatch(updateLichSuLuuTru({ id, data }));
    }
  };

  const handleCancel = () => {
    navigate(-1);
  };

  if (loading) {
    return (
      <div className="container-fluid">
        <div className="d-flex justify-content-center">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-12">
          <h1 className="h3 mb-4">
            {isNew ? 'Thêm lịch sử lưu trú' : isEdit ? 'Chỉnh sửa lịch sử lưu trú' : 'Xem chi tiết lịch sử lưu trú'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Tên học viên *</label>
                <input
                  {...register('tenHocVien')}
                  className={`form-control ${errors.tenHocVien ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tenHocVien && (
                  <div className="invalid-feedback">{errors.tenHocVien.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mã học viên *</label>
                <input
                  {...register('maHocVien')}
                  className={`form-control ${errors.maHocVien ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.maHocVien && (
                  <div className="invalid-feedback">{errors.maHocVien.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian vào phòng</label>
                <input
                  {...register('vaoPhong')}
                  type="date"
                  className={`form-control ${errors.vaoPhong ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.vaoPhong && (
                  <div className="invalid-feedback">{errors.vaoPhong.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian ra phòng</label>
                <input
                  {...register('raPhong')}
                  type="date"
                  className={`form-control ${errors.raPhong ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.raPhong && (
                  <div className="invalid-feedback">{errors.raPhong.message}</div>
                )}
              </div>

              <div className="col-12 mb-3">
                <label className="form-label">Ghi chú</label>
                <textarea
                  {...register('ghiChu')}
                  className="form-control"
                  rows={3}
                  disabled={isView}
                />
              </div>
            </div>

            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <div className="form-footer">
              <button type="button" className="form-btn back-btn" onClick={handleCancel}>Quay lại</button>
              {!isView && (
                <button type="submit" className="form-btn save-btn" disabled={loading}>
                  {isNew ? 'Thêm mới' : 'Lưu'}
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
} 