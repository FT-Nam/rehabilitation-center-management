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
  tenChuongTrinhGiaoDuc: yup.string().required('Tên chương trình giáo dục là bắt buộc'),
  giaoVien: yup.string().required('Giáo viên là bắt buộc'),
  soChuongTrinhGiaoDuc: yup.string(),
  soChuongTrinhTuVan: yup.string(),
  thoiGianBatDauGD: yup.string(),
  thoiGianKetThucGD: yup.string(),
  diemTB: yup.string(),
  xepLoai: yup.string(),
  tenChuongTrinhTuVan: yup.string(),
  thoiGianBatDauTV: yup.string(),
  thoiGianKetThucTV: yup.string(),
  diemTBTuVan: yup.string(),
  xepLoaiTuVan: yup.string(),
  giaoVienTuVan: yup.string(),
  tongSoChuongTrinhNghe: yup.string(),
  tongSoChungChi: yup.string(),
  maLopHoc: yup.string(),
  tenKhoaHoc: yup.string(),
  loaiNganhNghe: yup.string(),
  tenLopHoc: yup.string(),
  thoiGianBatDauNghe: yup.string(),
  thoiGianKetThucNghe: yup.string(),
  diemTBNghe: yup.string(),
  xepLoaiNghe: yup.string(),
  tinhTrangChungChi: yup.string(),
  maChungChi: yup.string(),
  tongSoLanLaoDong: yup.string(),
  tenNoiLaoDong: yup.string(),
  tongSoNgayCong: yup.string(),
  tenChungChiLaoDong: yup.string(),
  thoiGianCapChungChi: yup.string()
});

// Default values
const defaultValues = {
  soChuongTrinhGiaoDuc: '',
  soChuongTrinhTuVan: '',
  tenChuongTrinhGiaoDuc: '',
  thoiGianBatDauGD: '',
  thoiGianKetThucGD: '',
  diemTB: '',
  xepLoai: '',
  giaoVien: '',
  tenChuongTrinhTuVan: '',
  thoiGianBatDauTV: '',
  thoiGianKetThucTV: '',
  diemTBTuVan: '',
  xepLoaiTuVan: '',
  giaoVienTuVan: '',
  tongSoChuongTrinhNghe: '',
  tongSoChungChi: '',
  maLopHoc: '',
  tenKhoaHoc: '',
  loaiNganhNghe: '',
  tenLopHoc: '',
  thoiGianBatDauNghe: '',
  thoiGianKetThucNghe: '',
  diemTBNghe: '',
  xepLoaiNghe: '',
  tinhTrangChungChi: '',
  maChungChi: '',
  tongSoLanLaoDong: '',
  tenNoiLaoDong: '',
  tongSoNgayCong: '',
  tenChungChiLaoDong: '',
  thoiGianCapChungChi: ''
};

export default function GiaoDucDetail({ mode }) {
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
            {isNew ? 'Thêm giáo dục/tư vấn/nghề' : isEdit ? 'Chỉnh sửa giáo dục/tư vấn/nghề' : 'Xem chi tiết giáo dục/tư vấn/nghề'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Số chương trình giáo dục đã đào tạo</label>
                <input
                  {...register('soChuongTrinhGiaoDuc')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Số chương trình tư vấn đã tham gia</label>
                <input
                  {...register('soChuongTrinhTuVan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên chương trình giáo dục *</label>
                <input
                  {...register('tenChuongTrinhGiaoDuc')}
                  className={`form-control ${errors.tenChuongTrinhGiaoDuc ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tenChuongTrinhGiaoDuc && (
                  <div className="invalid-feedback">{errors.tenChuongTrinhGiaoDuc.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian bắt đầu GD</label>
                <input
                  {...register('thoiGianBatDauGD')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian kết thúc GD</label>
                <input
                  {...register('thoiGianKetThucGD')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Điểm trung bình GD</label>
                <input
                  {...register('diemTB')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Xếp loại GD</label>
                <input
                  {...register('xepLoai')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Giáo viên *</label>
                <input
                  {...register('giaoVien')}
                  className={`form-control ${errors.giaoVien ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.giaoVien && (
                  <div className="invalid-feedback">{errors.giaoVien.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên chương trình tư vấn</label>
                <input
                  {...register('tenChuongTrinhTuVan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian bắt đầu TV</label>
                <input
                  {...register('thoiGianBatDauTV')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian kết thúc TV</label>
                <input
                  {...register('thoiGianKetThucTV')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Điểm trung bình TV</label>
                <input
                  {...register('diemTBTuVan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Xếp loại TV</label>
                <input
                  {...register('xepLoaiTuVan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Giáo viên TV</label>
                <input
                  {...register('giaoVienTuVan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tổng số chương trình đào tạo nghề đã được học</label>
                <input
                  {...register('tongSoChuongTrinhNghe')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tổng số chứng chỉ được cấp</label>
                <input
                  {...register('tongSoChungChi')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mã lớp học</label>
                <input
                  {...register('maLopHoc')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên khóa học</label>
                <input
                  {...register('tenKhoaHoc')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Loại ngành nghề</label>
                <input
                  {...register('loaiNganhNghe')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên lớp học</label>
                <input
                  {...register('tenLopHoc')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian bắt đầu nghề</label>
                <input
                  {...register('thoiGianBatDauNghe')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian kết thúc nghề</label>
                <input
                  {...register('thoiGianKetThucNghe')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Điểm trung bình nghề</label>
                <input
                  {...register('diemTBNghe')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Xếp loại nghề</label>
                <input
                  {...register('xepLoaiNghe')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tình trạng được cấp chứng chỉ</label>
                <input
                  {...register('tinhTrangChungChi')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mã chứng chỉ</label>
                <input
                  {...register('maChungChi')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tổng số lần đi lao động</label>
                <input
                  {...register('tongSoLanLaoDong')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên nơi lao động trị liệu</label>
                <input
                  {...register('tenNoiLaoDong')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tổng số ngày công</label>
                <input
                  {...register('tongSoNgayCong')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên chứng chỉ lao động</label>
                <input
                  {...register('tenChungChiLaoDong')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian cấp chứng chỉ</label>
                <input
                  {...register('thoiGianCapChungChi')}
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