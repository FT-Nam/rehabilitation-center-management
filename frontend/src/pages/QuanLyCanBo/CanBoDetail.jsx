import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createCanBo, fetchCanBoById, updateCanBo } from '../../features/canBo/canBoSlice';

const schema = yup.object({
  maCanBo: yup.string().required('Bắt buộc'),
  tenCanBo: yup.string().required('Bắt buộc'),
});

const defaultValues = { maCanBo: '', tenCanBo: '', cccd: '', ngaySinh: '', gioiTinh: '', queQuan: '', danToc: '', tonGiao: '', quocTich: '', noiOHienTai: '', phongBan: '', hocVi: '', hocHam: '', capBac: '', chucVu: '', chucDanh: '', trangThai: '', batDau: '', ketThuc: '' };

export default function CanBoDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.canBo);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchCanBoById(id));
    } else {
      reset(defaultValues);
    }
  }, [dispatch, id, isNew, reset]);

  useEffect(() => {
    if (current && !isNew) {
      reset(current);
    }
  }, [current, isNew, reset]);

  const onSubmit = async (values) => {
    if (isNew) {
      const res = await dispatch(createCanBo(values));
      if (createCanBo.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateCanBo({ id, payload: values }));
      if (updateCanBo.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm cán bộ nhân viên' : isEdit ? 'Chỉnh sửa cán bộ nhân viên' : 'Xem chi tiết cán bộ nhân viên'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Mã cán bộ *</label>
            <input {...register('maCanBo')} disabled={isView || loading || isSubmitting} />
            {errors.maCanBo && <div className="form-err">{errors.maCanBo.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên cán bộ *</label>
            <input {...register('tenCanBo')} disabled={isView || loading || isSubmitting} />
            {errors.tenCanBo && <div className="form-err">{errors.tenCanBo.message}</div>}
          </div>
          <div className="form-group">
            <label>Số CCCD</label>
            <input {...register('cccd')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Ngày, tháng, năm sinh</label>
            <input type="date" {...register('ngaySinh')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Giới tính</label>
            <select {...register('gioiTinh')} disabled={isView || loading || isSubmitting}>
              <option value="">Chọn</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
          </div>
          <div className="form-group">
            <label>Quê quán</label>
            <input {...register('queQuan')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Dân tộc</label>
            <input {...register('danToc')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Tôn giáo</label>
            <input {...register('tonGiao')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Quốc tịch</label>
            <input {...register('quocTich')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Nơi ở hiện tại</label>
            <input {...register('noiOHienTai')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Phòng ban</label>
            <input {...register('phongBan')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Học vị</label>
            <input {...register('hocVi')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Học hàm</label>
            <input {...register('hocHam')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Cấp bậc</label>
            <input {...register('capBac')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Chức vụ</label>
            <input {...register('chucVu')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Chức danh</label>
            <input {...register('chucDanh')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Trạng thái</label>
            <input {...register('trangThai')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Thời gian bắt đầu làm việc</label>
            <input type="date" {...register('batDau')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Thời gian kết thúc làm việc</label>
            <input type="date" {...register('ketThuc')} disabled={isView || loading || isSubmitting} />
          </div>
        </div>
        <div className="form-footer">
          <button type="button" className="form-btn back-btn" onClick={() => nav(-1)}>Quay lại</button>
          {!isView && (
            <button type="submit" className="form-btn save-btn" disabled={loading || isSubmitting}>
              {isNew ? 'Thêm mới' : 'Lưu'}
            </button>
          )}
        </div>
      </form>
    </div>
  );
}