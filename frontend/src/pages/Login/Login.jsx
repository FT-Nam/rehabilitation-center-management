import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { login, clearError, clearSuccess } from '../../features/auth/authSlice';

const schema = yup.object({
  username: yup.string().required('Tên đăng nhập là bắt buộc'),
  password: yup.string().required('Mật khẩu là bắt buộc').min(6, 'Mật khẩu phải có ít nhất 6 ký tự'),
});

const defaultValues = {
  username: '',
  password: '',
};

export default function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, success, isAuthenticated } = useSelector(state => state.auth);
  const [showPassword, setShowPassword] = useState(false);

  // Add CSS to remove focus border
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      .form-control:focus {
        border-color: transparent !important;
        box-shadow: none !important;
        outline: none !important;
      }
      .input-group:focus-within {
        box-shadow: 0 2px 10px rgba(0,0,0,0.1) !important;
      }
    `;
    document.head.appendChild(style);
    
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    dispatch(clearError());
    dispatch(clearSuccess());
  }, [dispatch]);

  const onSubmit = (data) => {
    dispatch(login(data));
  };

  const handleDemoLogin = (role) => {
    let credentials;
    switch (role) {
      case 'admin':
        credentials = { username: 'admin', password: 'admin123' };
        break;
      case 'user':
        credentials = { username: 'user', password: 'user123' };
        break;
      case 'manager':
        credentials = { username: 'manager', password: 'manager123' };
        break;
      default:
        return;
    }
    dispatch(login(credentials));
  };

  return (
    <div 
      className="position-fixed w-100 h-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url(https://tl.cdnchinhphu.vn/344445545208135680/2023/9/8/cong-an-169415159817343818636.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        top: 0,
        left: 0,
        zIndex: 9999,
        minHeight: '100vh'
      }}
    >
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-10 col-lg-8">
            <div className="card shadow-lg border-0" style={{ 
              borderRadius: '20px', 
              backgroundColor: 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)'
            }}>
              <div className="card-body p-0">
                <div className="row g-0">
                  {/* Left Panel - Logo */}
                  <div className="col-md-5 d-flex align-items-center justify-content-center p-5" style={{ 
                    backgroundColor: '#f8f9fa',
                    borderRadius: '20px 0 0 20px',
                    borderRight: '1px solid #e9ecef',
                    position: 'relative',
                    overflow: 'hidden'
                  }}>
                    <div className="text-center position-relative" style={{ zIndex: 2 }}>
                      <div className="mb-4">
                        <img 
                          src="https://cdn.thuvienphapluat.vn/uploads/tintuc/2023/11/13/bo-truong-bo-cong-an.png" 
                          alt="Quốc huy" 
                          style={{ 
                            width: '300px', 
                            height: '180px',
                            filter: 'drop-shadow(0 6px 12px rgba(0,0,0,0.15))'
                          }}
                        />
                      </div>
                      <div style={{ 
                        borderRadius: '15px',
                        padding: '20px',
                        color: 'white',
                        position: 'relative'
                      }}>
                      </div>
                    </div>
                    <div style={{
                      position: 'absolute',
                      top: '-50%',
                      right: '-50%',
                      width: '200%',
                      height: '200%',
                      background: 'radial-gradient(circle, rgba(0,123,255,0.1) 0%, transparent 70%)',
                      zIndex: 1
                    }}></div>
                  </div>

                  {/* Right Panel - Login Form */}
                  <div className="col-md-7 p-5">
                    <div className="text-center mb-5">
                      <h4 className="text-muted mb-2" style={{ fontSize: '16px', fontWeight: '500' }}>XIN CHÀO BẠN QUAY LẠI</h4>
                      <h5 style={{ fontSize: '18px', color: '#8B0000'}}>PHẦN MỀM QUẢN LÝ TRUNG TÂM CAI NGHIỆN</h5>
                    </div>

                    {error && (
                      <div className="alert alert-danger" role="alert">
                        {error}
                      </div>
                    )}

                    {success && (
                      <div className="alert alert-success" role="alert">
                        {success}
                      </div>
                    )}

                    <form onSubmit={handleSubmit(onSubmit)}>
                      <div className="mb-4">
                        <div className="input-group" style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                          <span className="input-group-text bg-light border-0" style={{ borderRight: '1px solid #e9ecef' }}>
                            <i className="fas fa-arrow-right text-muted"></i>
                          </span>
                          <input
                            type="text"
                            className={`form-control border-0 ${errors.username ? 'is-invalid' : ''}`}
                            placeholder="mcc_phongkcs"
                            {...register('username')}
                            style={{ 
                              padding: '15px',
                              fontSize: '14px',
                              backgroundColor: '#f8f9fa'
                            }}
                          />
                        </div>
                        {errors.username && (
                          <div className="invalid-feedback d-block mt-2">
                            {errors.username.message}
                          </div>
                        )}
                      </div>

                      <div className="mb-5">
                        <div className="input-group" style={{ borderRadius: '10px', overflow: 'hidden', boxShadow: '0 2px 10px rgba(0,0,0,0.1)' }}>
                          <span className="input-group-text bg-light border-0" style={{ borderRight: '1px solid #e9ecef' }}>
                            <i className="fas fa-lock text-muted"></i>
                          </span>
                          <input
                            type={showPassword ? 'text' : 'password'}
                            className={`form-control border-0 ${errors.password ? 'is-invalid' : ''}`}
                            placeholder="Abc@123"
                            {...register('password')}
                            style={{ 
                              padding: '15px',
                              fontSize: '14px',
                              backgroundColor: '#f8f9fa'
                            }}
                          />
                                                     <button
                             type="button"
                             onClick={() => setShowPassword(!showPassword)}
                             style={{ 
                               borderLeft: '1px solid #e9ecef',
                               backgroundColor: '#f8f9fa',
                               border: 'none',
                               padding: '15px',
                               cursor: 'pointer',
                               transition: 'none'
                             }}
                           >
                             <i className={`fas ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
                           </button>
                        </div>
                        {errors.password && (
                          <div className="invalid-feedback d-block mt-2">
                            {errors.password.message}
                          </div>
                        )}
                      </div>

                                             <button
                         type="submit"
                         className="btn btn-primary w-100 mb-4"
                         disabled={loading}
                         style={{ 
                           borderRadius: '10px',
                           padding: '15px',
                           fontSize: '16px',
                           fontWeight: '600',
                           border: 'none',
                           transition: 'none'
                         }}
                         onMouseOver={(e) => {
                           e.target.style.transform = 'none';
                           e.target.style.boxShadow = 'none';
                         }}
                       >
                        {loading ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                            Đang đăng nhập...
                          </>
                        ) : (
                          'ĐĂNG NHẬP'
                        )}
                      </button>
                    </form>

                                          <div className="text-center">
                        <p className="text-muted mb-3 small">Hoặc đăng nhập nhanh với tài khoản demo:</p>
                                                 <div style={{ display: 'grid', gap: '8px' }}>
                           <button
                             type="button"
                             onClick={() => handleDemoLogin('admin')}
                             disabled={loading}
                             style={{ 
                               borderRadius: '8px', 
                               padding: '8px 12px',
                               border: '1px solid #8B0000',
                               backgroundColor: 'transparent',
                               color: '#8B0000',
                               cursor: 'pointer',
                               fontSize: '14px',
                               transition: 'none'
                             }}
                           >
                             Admin (admin/admin123)
                           </button>
                           <button
                             type="button"
                             onClick={() => handleDemoLogin('manager')}
                             disabled={loading}
                             style={{ 
                               borderRadius: '8px', 
                               padding: '8px 12px',
                               border: '1px solid #28a745',
                               backgroundColor: 'transparent',
                               color: '#28a745',
                               cursor: 'pointer',
                               fontSize: '14px',
                               transition: 'none'
                             }}
                           >
                             Manager (manager/manager123)
                           </button>
                           <button
                             type="button"
                             onClick={() => handleDemoLogin('user')}
                             disabled={loading}
                             style={{ 
                               borderRadius: '8px', 
                               padding: '8px 12px',
                               border: '1px solid #17a2b8',
                               backgroundColor: 'transparent',
                               color: '#17a2b8',
                               cursor: 'pointer',
                               fontSize: '14px',
                               transition: 'none'
                             }}
                           >
                             User (user/user123)
                           </button>
                         </div>
                      </div>

                    <div className="mt-4 text-center">
                      <small className="text-muted">
                        <strong>Lưu ý:</strong> Đây là hệ thống demo với dữ liệu giả.
                        <br />
                        Khi backend hoàn thành, dữ liệu thật sẽ thay thế dữ liệu demo.
                      </small>
                    </div>

                    <div className="mt-3 text-center">
                      <small className="text-muted">© 2025 - Designed by HiNova</small>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
