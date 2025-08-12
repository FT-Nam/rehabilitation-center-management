import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchDanhMucTaiSanById, 
  createDanhMucTaiSan, 
  updateDanhMucTaiSan,
  clearError,
  clearSuccess 
} from '../../features/danhMucTaiSan/danhMucTaiSanSlice';

const schema = yup.object({
  maDanhMuc: yup.string().required('Mã danh mục là bắt buộc'),
  tenDanhMuc: yup.string().required('Tên danh mục là bắt buộc'),
  trangThai: yup.string(),
  donViTinh: yup.string()
});

const defaultValues = {
  maDanhMuc: '',
  tenDanhMuc: '',
  trangThai: '',
  donViTinh: ''
};

export default function DanhMucDetail({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const isNew = mode === 'add' || location.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || location.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { current, loading, error, success } = useSelector(state => state.danhMucTaiSan);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchDanhMucTaiSanById(id));
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
      dispatch(createDanhMucTaiSan(data));
    } else if (isEdit) {
      dispatch(updateDanhMucTaiSan({ id, data }));
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
            {isNew ? 'Thêm danh mục tài sản' : isEdit ? 'Chỉnh sửa danh mục tài sản' : 'Xem chi tiết danh mục tài sản'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Mã danh mục *</label>
                <input
                  {...register('maDanhMuc')}
                  className={`form-control ${errors.maDanhMuc ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.maDanhMuc && (
                  <div className="invalid-feedback">{errors.maDanhMuc.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên danh mục *</label>
                <input
                  {...register('tenDanhMuc')}
                  className={`form-control ${errors.tenDanhMuc ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tenDanhMuc && (
                  <div className="invalid-feedback">{errors.tenDanhMuc.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Trạng thái</label>
                <input
                  {...register('trangThai')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Đơn vị tính</label>
                <input
                  {...register('donViTinh')}
                  className="form-control"
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