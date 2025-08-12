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
  tenThanNhan: yup.string().required('Tên thân nhân là bắt buộc'),
  hoTen: yup.string().required('Họ tên là bắt buộc'),
  thoiGianThamGap: yup.string(),
  cccdThanNhan: yup.string(),
  loaiThamGap: yup.string(),
  moiQuanHe: yup.string(),
  tenKhac: yup.string(),
  ngaySinh: yup.string(),
  gioiTinh: yup.string(),
  queQuan: yup.string(),
  danToc: yup.string(),
  tonGiao: yup.string(),
  quocTich: yup.string(),
  nhomMau: yup.string(),
  ngayCapCCCD: yup.string(),
  noiCapCCCD: yup.string(),
  ngayHetHanCCCD: yup.string(),
  noiThuongTru: yup.string(),
  noiTamTru: yup.string(),
  noiOHienTai: yup.string(),
  honNhan: yup.string(),
  quanHeVoiNguoiCaiNghien: yup.string()
});

// Default values
const defaultValues = {
  thoiGianThamGap: '',
  tenThanNhan: '',
  cccdThanNhan: '',
  loaiThamGap: '',
  moiQuanHe: '',
  hoTen: '',
  tenKhac: '',
  ngaySinh: '',
  gioiTinh: '',
  queQuan: '',
  danToc: '',
  tonGiao: '',
  quocTich: '',
  nhomMau: '',
  ngayCapCCCD: '',
  noiCapCCCD: '',
  ngayHetHanCCCD: '',
  noiThuongTru: '',
  noiTamTru: '',
  noiOHienTai: '',
  honNhan: '',
  quanHeVoiNguoiCaiNghien: ''
};

export default function ThamGapDetail({ mode }) {
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
            {isNew ? 'Thêm thăm gặp/mối quan hệ' : isEdit ? 'Chỉnh sửa thăm gặp/mối quan hệ' : 'Xem chi tiết thăm gặp/mối quan hệ'}
          </h1>
          
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
              <div className="col-md-6 mb-3">
                <label className="form-label">Thời gian thăm gặp</label>
                <input
                  {...register('thoiGianThamGap')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên thân nhân *</label>
                <input
                  {...register('tenThanNhan')}
                  className={`form-control ${errors.tenThanNhan ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.tenThanNhan && (
                  <div className="invalid-feedback">{errors.tenThanNhan.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">CCCD thân nhân</label>
                <input
                  {...register('cccdThanNhan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Loại thăm gặp</label>
                <input
                  {...register('loaiThamGap')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Mối quan hệ</label>
                <input
                  {...register('moiQuanHe')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Họ, chữ đệm và tên khai sinh *</label>
                <input
                  {...register('hoTen')}
                  className={`form-control ${errors.hoTen ? 'is-invalid' : ''}`}
                  disabled={isView}
                />
                {errors.hoTen && (
                  <div className="invalid-feedback">{errors.hoTen.message}</div>
                )}
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tên gọi khác</label>
                <input
                  {...register('tenKhac')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Ngày, tháng, năm sinh</label>
                <input
                  {...register('ngaySinh')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Giới tính</label>
                <select
                  {...register('gioiTinh')}
                  className="form-control"
                  disabled={isView}
                >
                  <option value="">Chọn</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                  <option value="Khác">Khác</option>
                </select>
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Quê quán</label>
                <input
                  {...register('queQuan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Dân tộc</label>
                <input
                  {...register('danToc')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tôn giáo</label>
                <input
                  {...register('tonGiao')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Quốc tịch</label>
                <input
                  {...register('quocTich')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nhóm máu</label>
                <input
                  {...register('nhomMau')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Ngày cấp CCCD</label>
                <input
                  {...register('ngayCapCCCD')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nơi cấp CCCD</label>
                <input
                  {...register('noiCapCCCD')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Ngày hết hạn CCCD</label>
                <input
                  {...register('ngayHetHanCCCD')}
                  type="date"
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nơi thường trú</label>
                <input
                  {...register('noiThuongTru')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nơi tạm trú</label>
                <input
                  {...register('noiTamTru')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Nơi ở hiện tại</label>
                <input
                  {...register('noiOHienTai')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Tình trạng hôn nhân</label>
                <input
                  {...register('honNhan')}
                  className="form-control"
                  disabled={isView}
                />
              </div>

              <div className="col-md-6 mb-3">
                <label className="form-label">Quan hệ với người cai nghiện</label>
                <input
                  {...register('quanHeVoiNguoiCaiNghien')}
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