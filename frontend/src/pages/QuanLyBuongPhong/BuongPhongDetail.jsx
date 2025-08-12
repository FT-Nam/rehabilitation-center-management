import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchBuongPhongById, 
  createBuongPhong, 
  updateBuongPhong,
  clearError,
  clearSuccess 
} from '../../features/buongPhong/buongPhongSlice';

const schema = yup.object({
  maPhong: yup.string().required('Mã phòng là bắt buộc'),
  tenPhong: yup.string().required('Tên phòng là bắt buộc'),
  loaiPhong: yup.string(),
  soLuong: yup.number().typeError('Số lượng phải là số').min(0, 'Số lượng không được âm'),
  sucChua: yup.number().typeError('Sức chứa phải là số').min(0, 'Sức chứa không được âm'),
  tinhTrang: yup.string(),
  phuTrach: yup.string(),
  soLuongHocVien: yup.number().typeError('Số lượng học viên phải là số').min(0, 'Số lượng học viên không được âm')
});

const defaultValues = {
  maPhong: '',
  tenPhong: '',
  loaiPhong: '',
  soLuong: '',
  sucChua: '',
  tinhTrang: '',
  phuTrach: '',
  soLuongHocVien: ''
};

export default function BuongPhongDetail({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const isNew = mode === 'add' || location.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || location.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { current, loading, error, success } = useSelector(state => state.buongPhong);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchBuongPhongById(id));
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
      dispatch(createBuongPhong(data));
    } else if (isEdit) {
      dispatch(updateBuongPhong({ id, data }));
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
            {isNew ? 'Thêm buồng/phòng' : isEdit ? 'Chỉnh sửa buồng/phòng' : 'Xem chi tiết buồng/phòng'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Mã phòng *</label>
                <input
                  {...register('maPhong')}
                  className={`form-control ${errors.maPhong ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.maPhong && (
                  <div className="invalid-feedback">{errors.maPhong.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên phòng *</label>
                <input
                  {...register('tenPhong')}
                  className={`form-control ${errors.tenPhong ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tenPhong && (
                  <div className="invalid-feedback">{errors.tenPhong.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Loại phòng</label>
                <input
                  {...register('loaiPhong')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số lượng</label>
                <input
                  {...register('soLuong')}
                  type="number"
                  className={`form-control ${errors.soLuong ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.soLuong && (
                  <div className="invalid-feedback">{errors.soLuong.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Sức chứa</label>
                <input
                  {...register('sucChua')}
                  type="number"
                  className={`form-control ${errors.sucChua ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.sucChua && (
                  <div className="invalid-feedback">{errors.sucChua.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tình trạng</label>
                <input
                  {...register('tinhTrang')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Người phụ trách</label>
                <input
                  {...register('phuTrach')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số lượng học viên đang sử dụng</label>
                <input
                  {...register('soLuongHocVien')}
                  type="number"
                  className={`form-control ${errors.soLuongHocVien ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.soLuongHocVien && (
                  <div className="invalid-feedback">{errors.soLuongHocVien.message}</div>
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