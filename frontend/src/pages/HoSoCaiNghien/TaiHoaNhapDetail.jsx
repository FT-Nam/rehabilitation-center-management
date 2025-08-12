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
  ketQuaYTe: yup.string().required('Kết quả đánh giá y tế là bắt buộc'),
  loaiXacNhan: yup.string().required('Loại xác nhận là bắt buộc'),
  thoiGianDanhGia: yup.string(),
  ketQuaPhucHoi: yup.string(),
  ketQuaGiaoDuc: yup.string(),
  ketQuaLaoDong: yup.string(),
  ketQuaChuanBi: yup.string(),
  soXacNhan: yup.string(),
  thoiGianCap: yup.string(),
  toChucQuanLy: yup.string(),
  thoiGianDeXuat: yup.string()
});

// Default values
const defaultValues = {
  thoiGianDanhGia: '',
  ketQuaYTe: '',
  ketQuaPhucHoi: '',
  ketQuaGiaoDuc: '',
  ketQuaLaoDong: '',
  ketQuaChuanBi: '',
  loaiXacNhan: '',
  soXacNhan: '',
  thoiGianCap: '',
  toChucQuanLy: '',
  thoiGianDeXuat: ''
};

export default function TaiHoaNhapDetail({ mode }) {
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
            {isNew ? 'Thêm tái hòa nhập/quản lý sau cai' : isEdit ? 'Chỉnh sửa tái hòa nhập/quản lý sau cai' : 'Xem chi tiết tái hòa nhập/quản lý sau cai'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian đánh giá kết quả cai nghiện</label>
                <input
                  {...register('thoiGianDanhGia')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết quả đánh giá y tế *</label>
                <input
                  {...register('ketQuaYTe')}
                  className={`form-control ${errors.ketQuaYTe ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.ketQuaYTe && (
                  <div className="invalid-feedback">{errors.ketQuaYTe.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết quả đánh giá phục hồi</label>
                <input
                  {...register('ketQuaPhucHoi')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết quả đánh giá giáo dục</label>
                <input
                  {...register('ketQuaGiaoDuc')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết quả đánh giá lao động trị liệu, học nghề</label>
                <input
                  {...register('ketQuaLaoDong')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết quả đánh giá chuẩn bị tái hòa nhập</label>
                <input
                  {...register('ketQuaChuanBi')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Loại xác nhận (giấy xác nhận/giấy chứng nhận) *</label>
                <input
                  {...register('loaiXacNhan')}
                  className={`form-control ${errors.loaiXacNhan ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.loaiXacNhan && (
                  <div className="invalid-feedback">{errors.loaiXacNhan.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số xác nhận/chứng nhận hoàn thành cai nghiện</label>
                <input
                  {...register('soXacNhan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian cấp</label>
                <input
                  {...register('thoiGianCap')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tổ chức quản lý</label>
                <input
                  {...register('toChucQuanLy')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian đề xuất quản lý sau cai</label>
                <input
                  {...register('thoiGianDeXuat')}
                  type="date"
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