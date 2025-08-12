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

const schema = yup.object({
  ngayDanhGia: yup.date().typeError('Ngày đánh giá không hợp lệ'),
  noiDungDanhGia: yup.string().required('Nội dung đánh giá là bắt buộc'),
  ketQuaDanhGia: yup.string(),
  nguoiDanhGia: yup.string(),
  ghiChu: yup.string()
});

const defaultValues = {
  ngayDanhGia: '',
  noiDungDanhGia: '',
  ketQuaDanhGia: '',
  nguoiDanhGia: '',
  ghiChu: ''
};

export default function DanhGiaDetail({ mode }) {
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
      // Handle create new
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
            {isNew ? 'Thêm đánh giá' : isEdit ? 'Chỉnh sửa đánh giá' : 'Xem chi tiết đánh giá'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Ngày đánh giá</label>
                <input
                  {...register('ngayDanhGia')}
                  type="date"
                  className={`form-control ${errors.ngayDanhGia ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.ngayDanhGia && (
                  <div className="invalid-feedback">{errors.ngayDanhGia.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nội dung đánh giá *</label>
                <input
                  {...register('noiDungDanhGia')}
                  className={`form-control ${errors.noiDungDanhGia ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.noiDungDanhGia && (
                  <div className="invalid-feedback">{errors.noiDungDanhGia.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết quả đánh giá</label>
                <input
                  {...register('ketQuaDanhGia')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Người đánh giá</label>
                <input
                  {...register('nguoiDanhGia')}
                  className="form-control"
                  disabled={isView}
                />
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