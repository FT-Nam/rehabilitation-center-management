import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';

const defaultValues = {
    maThuocTinh: '',
    tenThuocTinh: '',
    moTaThuocTinh: '',
    maGiaTri: '',
    tenGiaTri: '',
    moTaGiaTri: '',
    trangThai: '',
};

export default function ThuocTinhDetail({ mode }) {
    const { id } = useParams();
    const nav = useNavigate();
    const loc = useLocation();
    const isNew = mode === 'add' || loc.pathname.endsWith('/new');
    const isEdit = mode === 'edit' || loc.pathname.endsWith('/edit');
    const isView = !isNew && !isEdit;
    const [values, setValues] = useState(defaultValues);
    const [err, setErr] = useState('');

    useEffect(() => {
        if (!isNew && id) {
            // TODO: fetch data by id
            setValues({ maThuocTinh: 'TT001', tenThuocTinh: 'Hoạt chất', moTaThuocTinh: 'Thành phần chính', maGiaTri: 'GT001', tenGiaTri: 'Paracetamol', moTaGiaTri: 'Giảm đau, hạ sốt', trangThai: 'Đang sử dụng' });
        } else {
            setValues(defaultValues);
        }
        setErr('');
    }, [id, isNew]);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues(v => ({ ...v, [name]: value }));
        setErr('');
    };
    const handleSubmit = e => {
        e.preventDefault();
        if (!values.maThuocTinh || !values.tenThuocTinh) {
            setErr('Vui lòng nhập đủ thông tin bắt buộc.');
            return;
        }
        // TODO: Lưu dữ liệu
        nav(-1);
    };
    return (
        <div>
            <h1 style={{ color: '#111', fontSize: 24, fontWeight: 700, marginBottom: 18 }}>{isNew ? 'Thêm thuộc tính' : isEdit ? 'Chỉnh sửa thuộc tính' : 'Xem chi tiết thuộc tính'}</h1>
            <form className="hv-grid-form" onSubmit={handleSubmit}>
                <div className="hv-grid" style={{ gridTemplateColumns: 'repeat(2, 1fr)' }}>
                    <div className="form-group">
                        <label>Mã thuộc tính *</label>
                        <input name="maThuocTinh" value={values.maThuocTinh} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên thuộc tính *</label>
                        <input name="tenThuocTinh" value={values.tenThuocTinh} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mô tả thuộc tính</label>
                        <input name="moTaThuocTinh" value={values.moTaThuocTinh} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mã giá trị thuộc tính *</label>
                        <input name="maGiaTri" value={values.maGiaTri} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Tên giá trị thuộc tính *</label>
                        <input name="tenGiaTri" value={values.tenGiaTri} onChange={handleChange} required disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Mô tả giá trị thuộc tính</label>
                        <input name="moTaGiaTri" value={values.moTaGiaTri} onChange={handleChange} disabled={isView} />
                    </div>
                    <div className="form-group">
                        <label>Trạng thái *</label>
                        <input name="trangThai" value={values.trangThai} onChange={handleChange} required disabled={isView} />
                    </div>
                </div>
                {err && <div className="form-err" style={{ marginTop: 8 }}>{err}</div>}
                <div style={{ display: 'flex', gap: 12, justifyContent: 'flex-end', marginTop: 18 }}>
                    <button type="button" onClick={() => nav(-1)}>Quay lại</button>
                    {!isView && <button type="submit" style={{ background: '#8B0000', color: '#fff', border: 'none', borderRadius: 3, padding: '7px 18px', fontWeight: 600 }}>Lưu</button>}
                </div>
            </form>
        </div>
    );
} 