// Configuration file for the application
export const config = {
  // Set to true to use mock data, false to use real API
  USE_MOCK_DATA: true,
  
  // API base URL
  API_BASE_URL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3001/api',
  
  // Mock data delay simulation (ms)
  MOCK_DELAY: 500,
  
  // Pagination defaults
  DEFAULT_PAGE_SIZE: 10,
  DEFAULT_PAGE: 1,
};

export default config;

