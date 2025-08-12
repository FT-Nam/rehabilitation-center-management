import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchHocVienById, 
  updateHocVien,
  clearError,
  clearSuccess 
} from '../../features/hocVien/hocVienSlice';

// Validation schema
const schema = yup.object({
  loaiCaiNghien: yup.string().required('Loại cai nghiện là bắt buộc'),
  tenCoSo: yup.string().required('Tên cơ sở cai nghiện là bắt buộc'),
  to: yup.string(),
  doi: yup.string(),
  buong: yup.string(),
  phuongPhap: yup.string(),
  thoiGianCai: yup.string(),
  thoiGianBatDau: yup.string(),
  thoiGianKetThuc: yup.string(),
  xepLoai: yup.string()
});

// Default values
const defaultValues = {
  loaiCaiNghien: '',
  tenCoSo: '',
  to: '',
  doi: '',
  buong: '',
  phuongPhap: '',
  thoiGianCai: '',
  thoiGianBatDau: '',
  thoiGianKetThuc: '',
  xepLoai: ''
};

export default function QuaTrinhCaiDetail({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const isNew = mode === 'add' || location.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || location.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { current, loading, error, success } = useSelector(state => state.hocVien);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchHocVienById(id));
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
      console.log('Create new:', data);
    } else if (isEdit) {
      dispatch(updateHocVien({ id, data }));
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
            {isNew ? 'Thêm quá trình cai nghiện' : isEdit ? 'Chỉnh sửa quá trình cai nghiện' : 'Xem chi tiết quá trình cai nghiện'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Loại cai nghiện *</label>
                <input
                  {...register('loaiCaiNghien')}
                  className={`form-control ${errors.loaiCaiNghien ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.loaiCaiNghien && (
                  <div className="invalid-feedback">{errors.loaiCaiNghien.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên cơ sở cai nghiện xử lý *</label>
                <input
                  {...register('tenCoSo')}
                  className={`form-control ${errors.tenCoSo ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tenCoSo && (
                  <div className="invalid-feedback">{errors.tenCoSo.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tổ</label>
                <input
                  {...register('to')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Đội</label>
                <input
                  {...register('doi')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Buồng/phòng</label>
                <input
                  {...register('buong')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Phương pháp cai nghiện</label>
                <input
                  {...register('phuongPhap')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian cai nghiện</label>
                <input
                  {...register('thoiGianCai')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian bắt đầu</label>
                <input
                  {...register('thoiGianBatDau')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian kết thúc</label>
                <input
                  {...register('thoiGianKetThuc')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Xếp loại cai nghiện</label>
                <input
                  {...register('xepLoai')}
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
              <button type="button" className="form-btn back-btn" onClick={() => navigate(-1)}>Quay lại</button>
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