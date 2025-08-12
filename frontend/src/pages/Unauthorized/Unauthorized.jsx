import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Unauthorized() {
  const navigate = useNavigate();

  return (
    <div className="min-vh-100 d-flex align-items-center justify-content-center bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-6 text-center">
            <div className="card shadow">
              <div className="card-body p-5">
                <div className="mb-4">
                  <h1 className="display-1 text-danger">403</h1>
                  <h2 className="text-danger mb-3">Truy cập bị từ chối</h2>
                  <p className="text-muted">
                    Bạn không có quyền truy cập vào trang này.
                    <br />
                    Vui lòng liên hệ quản trị viên để được cấp quyền.
                  </p>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                  <button
                    className="btn btn-primary me-md-2"
                    onClick={() => navigate('/dashboard')}
                  >
                    Về trang chủ
                  </button>
                  <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate(-1)}
                  >
                    Quay lại
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
