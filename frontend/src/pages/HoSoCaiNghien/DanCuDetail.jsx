import React, { useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { createHocVien, fetchHocVienById, updateHocVien } from '../../features/hocVien/hocVienSlice';

const schema = yup.object({
  cccd: yup.string().required('Bắt buộc').matches(/^\d{12}$/, 'CCCD phải đủ 12 số'),
  hoTen: yup.string().required('Bắt buộc'),
  ngaySinh: yup.string().required('Bắt buộc'),
  gioiTinh: yup.string().required('Bắt buộc'),
});

const defaultValues = {
  cccd: '', hoTen: '', tenKhac: '', ngaySinh: '', gioiTinh: '', noiSinh: '', noiDangKyKhaiSinh: '', queQuan: '', danToc: '', tonGiao: '', quocTich: '', nhomMau: '', ngayCapCCCD: '', noiCapCCCD: '', ngayHetHanCCCD: '', noiThuongTru: '', noiTamTru: '', noiOHienTai: '', honNhan: '', cmnd9: ''
};

export default function DanCuDetail({ mode }) {
  const { id } = useParams();
  const nav = useNavigate();
  const loc = useLocation();
  const dispatch = useDispatch();
  const { current, loading } = useSelector((s) => s.hocVien);

  const isNew = mode === 'add' || loc.pathname.endsWith('/new');
  const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
  const isView = !isNew && !isEdit;

  const { register, handleSubmit, reset, formState: { errors, isSubmitting } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (!isNew && id) {
      dispatch(fetchHocVienById(id));
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
      const res = await dispatch(createHocVien(values));
      if (createHocVien.fulfilled.match(res)) nav(-1);
    } else if (isEdit) {
      const res = await dispatch(updateHocVien({ id, payload: values }));
      if (updateHocVien.fulfilled.match(res)) nav(-1);
    }
  };

  return (
    <div>
      <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm thông tin dân cư' : isEdit ? 'Chỉnh sửa thông tin dân cư' : 'Xem chi tiết dân cư'}</h1>
      <form className="hv-grid-form" onSubmit={handleSubmit(onSubmit)}>
        <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
          <div className="form-group">
            <label>Số CCCD *</label>
            <input {...register('cccd')} disabled={isView || loading || isSubmitting} />
            {errors.cccd && <div className="form-err">{errors.cccd.message}</div>}
          </div>
          <div className="form-group">
            <label>Họ, chữ đệm và tên khai sinh *</label>
            <input {...register('hoTen')} disabled={isView || loading || isSubmitting} />
            {errors.hoTen && <div className="form-err">{errors.hoTen.message}</div>}
          </div>
          <div className="form-group">
            <label>Tên gọi khác</label>
            <input {...register('tenKhac')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Ngày, tháng, năm sinh *</label>
            <input type="date" {...register('ngaySinh')} disabled={isView || loading || isSubmitting} />
            {errors.ngaySinh && <div className="form-err">{errors.ngaySinh.message}</div>}
          </div>
          <div className="form-group">
            <label>Giới tính *</label>
            <select {...register('gioiTinh')} disabled={isView || loading || isSubmitting}>
              <option value="">Chọn</option>
              <option value="Nam">Nam</option>
              <option value="Nữ">Nữ</option>
              <option value="Khác">Khác</option>
            </select>
            {errors.gioiTinh && <div className="form-err">{errors.gioiTinh.message}</div>}
          </div>
          <div className="form-group">
            <label>Nơi sinh</label>
            <input {...register('noiSinh')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Nơi đăng ký khai sinh</label>
            <input {...register('noiDangKyKhaiSinh')} disabled={isView || loading || isSubmitting} />
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
            <label>Nhóm máu</label>
            <input {...register('nhomMau')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Ngày cấp CCCD</label>
            <input type="date" {...register('ngayCapCCCD')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Nơi cấp CCCD</label>
            <input {...register('noiCapCCCD')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Ngày hết hạn CCCD</label>
            <input type="date" {...register('ngayHetHanCCCD')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Nơi thường trú</label>
            <input {...register('noiThuongTru')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Nơi tạm trú</label>
            <input {...register('noiTamTru')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Nơi ở hiện tại</label>
            <input {...register('noiOHienTai')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Tình trạng hôn nhân</label>
            <input {...register('honNhan')} disabled={isView || loading || isSubmitting} />
          </div>
          <div className="form-group">
            <label>Số CMND 9 số</label>
            <input {...register('cmnd9')} disabled={isView || loading || isSubmitting} />
          </div>
        </div>
        <div className="form-footer">
          <button type="button" onClick={() => nav(-1)} className="form-btn back-btn">Quay lại</button>
          {!isView && <button type="submit" disabled={loading || isSubmitting} className="form-btn save-btn">{isNew ? 'Thêm mới' : 'Lưu'}</button>}
        </div>
      </form>
    </div>
  );
}