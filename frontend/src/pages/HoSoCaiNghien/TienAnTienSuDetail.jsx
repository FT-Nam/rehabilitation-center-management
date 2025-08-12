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
  tongSoTienAn: yup.string(),
  taiPham: yup.string(),
  namXu: yup.string().required('Năm xử là bắt buộc'),
  toaXu: yup.string(),
  diaPhuong: yup.string(),
  toiDanh: yup.string().required('Tội danh là bắt buộc'),
  mucAn: yup.string(),
  noiChapHanhAn: yup.string(),
  namTha: yup.string(),
  tinhTrang: yup.string(),
  ghiChuTienAn: yup.string(),
  soTienSu: yup.string(),
  ghiChuTienSu: yup.string(),
  thoiGian: yup.string(),
  soQD: yup.string(),
  ngayQD: yup.date().typeError('Ngày QĐ không hợp lệ'),
  hanhViViPham: yup.string(),
  donViXuLy: yup.string(),
  hinhThucXuLy: yup.string(),
  noiChapHanh: yup.string(),
  batDau: yup.string(),
  ketThuc: yup.string()
});

const defaultValues = {
  tongSoTienAn: '',
  taiPham: '',
  namXu: '',
  toaXu: '',
  diaPhuong: '',
  toiDanh: '',
  mucAn: '',
  noiChapHanhAn: '',
  namTha: '',
  tinhTrang: '',
  ghiChuTienAn: '',
  soTienSu: '',
  ghiChuTienSu: '',
  thoiGian: '',
  soQD: '',
  ngayQD: '',
  hanhViViPham: '',
  donViXuLy: '',
  hinhThucXuLy: '',
  noiChapHanh: '',
  batDau: '',
  ketThuc: ''
};

export default function TienAnTienSuDetail({ mode }) {
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
            {isNew ? 'Thêm tiền án/tiền sự' : isEdit ? 'Chỉnh sửa tiền án/tiền sự' : 'Xem chi tiết tiền án/tiền sự'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Tổng số tiền án</label>
                <input
                  {...register('tongSoTienAn')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tái phạm</label>
                <input
                  {...register('taiPham')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Năm xử *</label>
                <input
                  {...register('namXu')}
                  className={`form-control ${errors.namXu ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.namXu && (
                  <div className="invalid-feedback">{errors.namXu.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tòa xử</label>
                <input
                  {...register('toaXu')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Địa phương</label>
                <input
                  {...register('diaPhuong')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tội danh *</label>
                <input
                  {...register('toiDanh')}
                  className={`form-control ${errors.toiDanh ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.toiDanh && (
                  <div className="invalid-feedback">{errors.toiDanh.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mức án</label>
                <input
                  {...register('mucAn')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nơi chấp hành án</label>
                <input
                  {...register('noiChapHanhAn')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Năm tha</label>
                <input
                  {...register('namTha')}
                  className="form-control"
                  disabled={isView}
                />
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
                <label className="form-label">Ghi chú tiền án</label>
                <input
                  {...register('ghiChuTienAn')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số tiền sự</label>
                <input
                  {...register('soTienSu')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Ghi chú tiền sự</label>
                <input
                  {...register('ghiChuTienSu')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian</label>
                <input
                  {...register('thoiGian')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số QĐ</label>
                <input
                  {...register('soQD')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Ngày QĐ</label>
                <input
                  {...register('ngayQD')}
                  type="date"
                  className={`form-control ${errors.ngayQD ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.ngayQD && (
                  <div className="invalid-feedback">{errors.ngayQD.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Hành vi vi phạm</label>
                <input
                  {...register('hanhViViPham')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Đơn vị xử lý</label>
                <input
                  {...register('donViXuLy')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Hình thức xử lý</label>
                <input
                  {...register('hinhThucXuLy')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nơi chấp hành</label>
                <input
                  {...register('noiChapHanh')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Bắt đầu</label>
                <input
                  {...register('batDau')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết thúc</label>
                <input
                  {...register('ketThuc')}
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