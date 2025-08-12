import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { 
  fetchSerialById, 
  createSerial, 
  updateSerial,
  clearError,
  clearSuccess 
} from '../../features/serial/serialSlice';

const schema = yup.object({
  maSanPham: yup.string().required('Mã sản phẩm là bắt buộc'),
  maSerial: yup.string().required('Mã serial là bắt buộc'),
  tinhTrang: yup.string(),
  khauHao: yup.number().typeError('Khấu hao phải là số').min(0, 'Khấu hao không được âm'),
  ngayNhap: yup.date().typeError('Ngày nhập không hợp lệ')
});

const defaultValues = {
  maSanPham: '',
  maSerial: '',
  tinhTrang: '',
  khauHao: '',
  ngayNhap: ''
};

export default function SerialDetail({ mode }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  
  const isNew = mode === 'add' || location.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || location.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { current, loading, error, success } = useSelector(state => state.serial);

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchSerialById(id));
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
      dispatch(createSerial(data));
    } else if (isEdit) {
      dispatch(updateSerial({ id, data }));
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
            {isNew ? 'Thêm serial sản phẩm' : isEdit ? 'Chỉnh sửa serial sản phẩm' : 'Xem chi tiết serial sản phẩm'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Mã sản phẩm *</label>
                <input
                  {...register('maSanPham')}
                  className={`form-control ${errors.maSanPham ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.maSanPham && (
                  <div className="invalid-feedback">{errors.maSanPham.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mã serial *</label>
                <input
                  {...register('maSerial')}
                  className={`form-control ${errors.maSerial ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.maSerial && (
                  <div className="invalid-feedback">{errors.maSerial.message}</div>
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
                <label className="form-label">Khấu hao theo năm</label>
                <input
                  {...register('khauHao')}
                  type="number"
                  className={`form-control ${errors.khauHao ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.khauHao && (
                  <div className="invalid-feedback">{errors.khauHao.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Ngày nhập kho</label>
                <input
                  {...register('ngayNhap')}
                  type="date"
                  className={`form-control ${errors.ngayNhap ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.ngayNhap && (
                  <div className="invalid-feedback">{errors.ngayNhap.message}</div>
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