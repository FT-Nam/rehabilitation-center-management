import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchThuocTinhById, 
  createThuocTinh, 
  updateThuocTinh,
  clearError,
  clearSuccess 
} from '../../features/thuocTinh/thuocTinhSlice';

const schema = yup.object({
  maThuocTinh: yup.string().required('Mã thuộc tính là bắt buộc'),
  tenThuocTinh: yup.string().required('Tên thuộc tính là bắt buộc'),
  moTaThuocTinh: yup.string(),
  maGiaTri: yup.string().required('Mã giá trị thuộc tính là bắt buộc'),
  tenGiaTri: yup.string().required('Tên giá trị thuộc tính là bắt buộc'),
  moTaGiaTri: yup.string(),
  trangThai: yup.string().required('Trạng thái là bắt buộc')
});

const defaultValues = {
  maThuocTinh: '',
  tenThuocTinh: '',
  moTaThuocTinh: '',
  maGiaTri: '',
  tenGiaTri: '',
  moTaGiaTri: '',
  trangThai: ''
};

export default function ThuocTinhDetail({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const isNew = mode === 'add' || location.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || location.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { current, loading, error, success } = useSelector(state => state.thuocTinh);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchThuocTinhById(id));
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
      dispatch(createThuocTinh(data));
    } else if (isEdit) {
      dispatch(updateThuocTinh({ id, data }));
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
            {isNew ? 'Thêm thuộc tính' : isEdit ? 'Chỉnh sửa thuộc tính' : 'Xem chi tiết thuộc tính'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Mã thuộc tính *</label>
                <input
                  {...register('maThuocTinh')}
                  className={`form-control ${errors.maThuocTinh ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.maThuocTinh && (
                  <div className="invalid-feedback">{errors.maThuocTinh.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên thuộc tính *</label>
                <input
                  {...register('tenThuocTinh')}
                  className={`form-control ${errors.tenThuocTinh ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tenThuocTinh && (
                  <div className="invalid-feedback">{errors.tenThuocTinh.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mô tả thuộc tính</label>
                <input
                  {...register('moTaThuocTinh')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mã giá trị thuộc tính *</label>
                <input
                  {...register('maGiaTri')}
                  className={`form-control ${errors.maGiaTri ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.maGiaTri && (
                  <div className="invalid-feedback">{errors.maGiaTri.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên giá trị thuộc tính *</label>
                <input
                  {...register('tenGiaTri')}
                  className={`form-control ${errors.tenGiaTri ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tenGiaTri && (
                  <div className="invalid-feedback">{errors.tenGiaTri.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mô tả giá trị thuộc tính</label>
                <input
                  {...register('moTaGiaTri')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Trạng thái *</label>
                <input
                  {...register('trangThai')}
                  className={`form-control ${errors.trangThai ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.trangThai && (
                  <div className="invalid-feedback">{errors.trangThai.message}</div>
                )}
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