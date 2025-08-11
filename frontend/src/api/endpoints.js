// API Endpoints cho hệ thống quản lý cơ sở cai nghiện

// 1. API Đăng nhập hệ thống
export const AUTH_ENDPOINTS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  CHANGE_PASSWORD: '/api/auth/change-password',
};

// 2. API Quản lý tài khoản
export const ACCOUNTS_ENDPOINTS = {
  LIST: '/api/accounts',
  DETAIL: (id) => `/api/accounts/${id}`,
  CREATE: '/api/accounts',
  UPDATE: (id) => `/api/accounts/${id}`,
  DELETE: (id) => `/api/accounts/${id}`,
};

// 3. API Quản lý học viên
export const STUDENTS_ENDPOINTS = {
  LIST: '/api/students',
  DETAIL: (id) => `/api/students/${id}`,
  CREATE: '/api/students',
  UPDATE: (id) => `/api/students/${id}`,
  DELETE: (id) => `/api/students/${id}`,
};

// 4. API Quản lý hồ sơ học viên
export const STUDENT_PROFILES_ENDPOINTS = {
  LIST: '/api/student-profiles',
  DETAIL: (id) => `/api/student-profiles/${id}`,
  CREATE: '/api/student-profiles',
  UPDATE: (id) => `/api/student-profiles/${id}`,
  DELETE: (id) => `/api/student-profiles/${id}`,
};

// 5. API Quản lý lớp học
export const CLASSES_ENDPOINTS = {
  LIST: '/api/classes',
  DETAIL: (id) => `/api/classes/${id}`,
  CREATE: '/api/classes',
  UPDATE: (id) => `/api/classes/${id}`,
  DELETE: (id) => `/api/classes/${id}`,
};

// 6. API Quản lý lịch học
export const SCHEDULES_ENDPOINTS = {
  LIST: '/api/schedules',
  DETAIL: (id) => `/api/schedules/${id}`,
  CREATE: '/api/schedules',
  UPDATE: (id) => `/api/schedules/${id}`,
  DELETE: (id) => `/api/schedules/${id}`,
};

// 7. API Quản lý giáo viên
export const TEACHERS_ENDPOINTS = {
  LIST: '/api/teachers',
  DETAIL: (id) => `/api/teachers/${id}`,
  CREATE: '/api/teachers',
  UPDATE: (id) => `/api/teachers/${id}`,
  DELETE: (id) => `/api/teachers/${id}`,
};

// 8. API Quản lý nhân viên
export const STAFF_ENDPOINTS = {
  LIST: '/api/staff',
  DETAIL: (id) => `/api/staff/${id}`,
  CREATE: '/api/staff',
  UPDATE: (id) => `/api/staff/${id}`,
  DELETE: (id) => `/api/staff/${id}`,
};

// 9. API Quản lý thuốc
export const MEDICINES_ENDPOINTS = {
  LIST: '/api/medicines',
  DETAIL: (id) => `/api/medicines/${id}`,
  CREATE: '/api/medicines',
  UPDATE: (id) => `/api/medicines/${id}`,
  DELETE: (id) => `/api/medicines/${id}`,
};

// 10. API Quản lý vật tư
export const SUPPLIES_ENDPOINTS = {
  LIST: '/api/supplies',
  DETAIL: (id) => `/api/supplies/${id}`,
  CREATE: '/api/supplies',
  UPDATE: (id) => `/api/supplies/${id}`,
  DELETE: (id) => `/api/supplies/${id}`,
};

// 11. API Quản lý tài sản
export const ASSETS_ENDPOINTS = {
  LIST: '/api/assets',
  DETAIL: (id) => `/api/assets/${id}`,
  CREATE: '/api/assets',
  UPDATE: (id) => `/api/assets/${id}`,
  DELETE: (id) => `/api/assets/${id}`,
};

// 12. API Quản lý tài chính
export const FINANCES_ENDPOINTS = {
  LIST: '/api/finances',
  DETAIL: (id) => `/api/finances/${id}`,
  CREATE: '/api/finances',
  UPDATE: (id) => `/api/finances/${id}`,
  DELETE: (id) => `/api/finances/${id}`,
};

// 13. API Quản lý kho
export const WAREHOUSES_ENDPOINTS = {
  LIST: '/api/warehouses',
  DETAIL: (id) => `/api/warehouses/${id}`,
  CREATE: '/api/warehouses',
  UPDATE: (id) => `/api/warehouses/${id}`,
  DELETE: (id) => `/api/warehouses/${id}`,
};

// 14. API Quản lý thực đơn
export const MENUS_ENDPOINTS = {
  LIST: '/api/menus',
  DETAIL: (id) => `/api/menus/${id}`,
  CREATE: '/api/menus',
  UPDATE: (id) => `/api/menus/${id}`,
  DELETE: (id) => `/api/menus/${id}`,
};

// 15. API Quản lý chế độ ăn
export const DIETS_ENDPOINTS = {
  LIST: '/api/diets',
  DETAIL: (id) => `/api/diets/${id}`,
  CREATE: '/api/diets',
  UPDATE: (id) => `/api/diets/${id}`,
  DELETE: (id) => `/api/diets/${id}`,
};

// 16. API Quản lý kỷ luật
export const DISCIPLINE_ENDPOINTS = {
  LIST: '/api/discipline',
  DETAIL: (id) => `/api/discipline/${id}`,
  CREATE: '/api/discipline',
  UPDATE: (id) => `/api/discipline/${id}`,
  DELETE: (id) => `/api/discipline/${id}`,
};

// 17. API Quản lý khen thưởng
export const REWARDS_ENDPOINTS = {
  LIST: '/api/rewards',
  DETAIL: (id) => `/api/rewards/${id}`,
  CREATE: '/api/rewards',
  UPDATE: (id) => `/api/rewards/${id}`,
  DELETE: (id) => `/api/rewards/${id}`,
};

// 18. API Quản lý sức khỏe
export const HEALTH_ENDPOINTS = {
  LIST: '/api/health',
  DETAIL: (id) => `/api/health/${id}`,
  CREATE: '/api/health',
  UPDATE: (id) => `/api/health/${id}`,
  DELETE: (id) => `/api/health/${id}`,
};

// 19. API Quản lý xét nghiệm
export const TESTS_ENDPOINTS = {
  LIST: '/api/tests',
  DETAIL: (id) => `/api/tests/${id}`,
  CREATE: '/api/tests',
  UPDATE: (id) => `/api/tests/${id}`,
  DELETE: (id) => `/api/tests/${id}`,
};

// 20. API Quản lý kết quả học tập
export const RESULTS_ENDPOINTS = {
  LIST: '/api/results',
  DETAIL: (id) => `/api/results/${id}`,
  CREATE: '/api/results',
  UPDATE: (id) => `/api/results/${id}`,
  DELETE: (id) => `/api/results/${id}`,
};

// 21. API Quản lý báo cáo thống kê
export const REPORTS_ENDPOINTS = {
  LIST: '/api/reports',
  DETAIL: (id) => `/api/reports/${id}`,
  CREATE: '/api/reports',
  UPDATE: (id) => `/api/reports/${id}`,
  DELETE: (id) => `/api/reports/${id}`,
};

// Tổng hợp tất cả endpoints
export const API_ENDPOINTS = {
  AUTH: AUTH_ENDPOINTS,
  ACCOUNTS: ACCOUNTS_ENDPOINTS,
  STUDENTS: STUDENTS_ENDPOINTS,
  STUDENT_PROFILES: STUDENT_PROFILES_ENDPOINTS,
  CLASSES: CLASSES_ENDPOINTS,
  SCHEDULES: SCHEDULES_ENDPOINTS,
  TEACHERS: TEACHERS_ENDPOINTS,
  STAFF: STAFF_ENDPOINTS,
  MEDICINES: MEDICINES_ENDPOINTS,
  SUPPLIES: SUPPLIES_ENDPOINTS,
  ASSETS: ASSETS_ENDPOINTS,
  FINANCES: FINANCES_ENDPOINTS,
  WAREHOUSES: WAREHOUSES_ENDPOINTS,
  MENUS: MENUS_ENDPOINTS,
  DIETS: DIETS_ENDPOINTS,
  DISCIPLINE: DISCIPLINE_ENDPOINTS,
  REWARDS: REWARDS_ENDPOINTS,
  HEALTH: HEALTH_ENDPOINTS,
  TESTS: TESTS_ENDPOINTS,
  RESULTS: RESULTS_ENDPOINTS,
  REPORTS: REPORTS_ENDPOINTS,
}; 