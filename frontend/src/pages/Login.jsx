import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { loginThunk } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const schema = yup.object({
  username: yup.string().required('Vui lòng nhập tài khoản'),
  password: yup.string().required('Vui lòng nhập mật khẩu'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, token } = useSelector((state) => state.auth);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { username: '', password: '' },
  });

  useEffect(() => {
    if (token) {
      navigate('/', { replace: true });
    }
  }, [token, navigate]);

  const onSubmit = (values) => {
    dispatch(loginThunk(values));
  };

  return (
    <div className="login-page">
      {/* Header giống với header chính */}
      <header className="header">
        <div className="header-left">
          <img src="/logo1.png" alt="Bộ Công An" className="logo" />
        </div>
        <div className="header-title">
          HỆ THỐNG QUẢN LÝ TRUNG TÂM CAI NGHIỆN
        </div>
        <div className="header-right">
          <div className="user-info">
            <div className="user-name">Đăng nhập hệ thống</div>
            <div className="user-role">Vui lòng nhập thông tin tài khoản</div>
          </div>
        </div>
      </header>

      {/* Form đăng nhập */}
      <div className="login-container">
        <div className="login-card">
          <div className="login-header">
            <h2 className="login-title">ĐĂNG NHẬP HỆ THỐNG</h2>
            <p className="login-subtitle">Quản lý trung tâm cai nghiện</p>
          </div>
          
          <form onSubmit={handleSubmit(onSubmit)} className="login-form">
            <div className="form-group">
              <label className="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
                  <circle cx="12" cy="7" r="4"/>
                </svg>
                Tài khoản
              </label>
              <input 
                className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                placeholder="Nhập tài khoản của bạn"
                {...register('username')}
              />
              {errors.username && <div className="invalid-feedback">{errors.username.message}</div>}
            </div>

            <div className="form-group">
              <label className="form-label">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2"/>
                  <circle cx="12" cy="16" r="1"/>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
                </svg>
                Mật khẩu
              </label>
              <input 
                type="password"
                className={`form-control ${errors.password ? 'is-invalid' : ''}`}
                placeholder="Nhập mật khẩu của bạn"
                {...register('password')}
              />
              {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
            </div>

            {error && (
              <div className="alert alert-danger">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {error}
              </div>
            )}

            <button 
              className="btn btn-primary login-btn" 
              type="submit" 
              disabled={loading}
            >
              {loading ? (
                <>
                  <svg className="spinner" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M21 12a9 9 0 11-6.219-8.56"/>
                  </svg>
                  Đang đăng nhập...
                </>
              ) : (
                <>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"/>
                    <polyline points="10 17 15 12 10 7"/>
                    <line x1="15" y1="12" x2="3" y2="12"/>
                  </svg>
                  Đăng nhập
                </>
              )}
            </button>
          </form>

          <div className="login-footer">
            <p>© 2024 Bộ Công An - Hệ thống quản lý trung tâm cai nghiện</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

