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
  tienSuBenhLy: yup.string().required('Tiền sử bệnh lý là bắt buộc'),
  loaiMaTuy: yup.string().required('Loại ma túy là bắt buộc'),
  chieuCao: yup.string(),
  canNang: yup.string(),
  nhipTim: yup.string(),
  huyetAp: yup.string(),
  tuoiLanDauSD: yup.string(),
  lanXetNghiem: yup.string(),
  thoiGianXetNghiem: yup.string(),
  ketQuaXetNghiem: yup.string(),
  thoiGianChanDoan: yup.string(),
  ketQuaChanDoan: yup.string(),
  bacSi: yup.string(),
  tenThuoc: yup.string(),
  soLuongThuoc: yup.string()
});

// Default values
const defaultValues = {
  tienSuBenhLy: '',
  benhTamThan: '',
  tienSuBenhGiaDinh: '',
  tinhTrangGiaDinh: '',
  chieuCao: '',
  canNang: '',
  nhipTim: '',
  huyetAp: '',
  benhManTinh: '',
  loaiMaTuy: '',
  tuoiLanDauSD: '',
  tuoiLanDauTiem: '',
  tongThoiGianSD: '',
  soTienSD: '',
  cachSD: '',
  lanXetNghiem: '',
  thoiGianXetNghiem: '',
  ketQuaXetNghiem: '',
  thoiGianChanDoan: '',
  ketQuaChanDoan: '',
  bacSi: '',
  benhLyKem: '',
  tenThuoc: '',
  soLuongThuoc: ''
};

export default function SucKhoeDetail({ mode }) {
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
            {isNew ? 'Thêm sức khỏe/điều trị' : isEdit ? 'Chỉnh sửa sức khỏe/điều trị' : 'Xem chi tiết sức khỏe/điều trị'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Tiền sử bệnh lý *</label>
                <input
                  {...register('tienSuBenhLy')}
                  className={`form-control ${errors.tienSuBenhLy ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tienSuBenhLy && (
                  <div className="invalid-feedback">{errors.tienSuBenhLy.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tình trạng bệnh tâm thần</label>
                <input
                  {...register('benhTamThan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tiền sử bệnh gia đình</label>
                <input
                  {...register('tienSuBenhGiaDinh')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tình trạng gia đình</label>
                <input
                  {...register('tinhTrangGiaDinh')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Chiều cao</label>
                <input
                  {...register('chieuCao')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Cân nặng</label>
                <input
                  {...register('canNang')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nhịp tim</label>
                <input
                  {...register('nhipTim')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Huyết áp</label>
                <input
                  {...register('huyetAp')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Bệnh mãn tính</label>
                <input
                  {...register('benhManTinh')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Loại ma túy đã sử dụng *</label>
                <input
                  {...register('loaiMaTuy')}
                  className={`form-control ${errors.loaiMaTuy ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.loaiMaTuy && (
                  <div className="invalid-feedback">{errors.loaiMaTuy.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tuổi lần đầu sử dụng</label>
                <input
                  {...register('tuoiLanDauSD')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tuổi lần đầu tiêm chích</label>
                <input
                  {...register('tuoiLanDauTiem')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tổng thời gian sử dụng</label>
                <input
                  {...register('tongThoiGianSD')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số tiền sử dụng/ngày</label>
                <input
                  {...register('soTienSD')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Cách sử dụng</label>
                <input
                  {...register('cachSD')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Lần xét nghiệm</label>
                <input
                  {...register('lanXetNghiem')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian xét nghiệm</label>
                <input
                  {...register('thoiGianXetNghiem')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết quả xét nghiệm</label>
                <input
                  {...register('ketQuaXetNghiem')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian chẩn đoán</label>
                <input
                  {...register('thoiGianChanDoan')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Kết quả chẩn đoán</label>
                <input
                  {...register('ketQuaChanDoan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Bác sĩ điều trị</label>
                <input
                  {...register('bacSi')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Bệnh lý đi kèm</label>
                <input
                  {...register('benhLyKem')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên thuốc</label>
                <input
                  {...register('tenThuoc')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số lượng thuốc sử dụng</label>
                <input
                  {...register('soLuongThuoc')}
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