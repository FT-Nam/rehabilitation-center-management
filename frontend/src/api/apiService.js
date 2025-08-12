import { config } from '../config/config';
import apiClient from './apiClient';
import { 
  mockData, 
  simulateApiDelay, 
  generateId 
} from '../utils/mockData';

// Generic API service that handles both mock and real data
export class ApiService {
  constructor(endpoint, mockDataKey) {
    this.endpoint = endpoint;
    this.mockDataKey = mockDataKey;
    this.mockData = mockData[mockDataKey] || [];
  }

  // Fetch all items
  async fetchAll(params = {}) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      
      // Simulate filtering and pagination
      let filteredData = [...this.mockData];
      
      // Apply search filter if provided
      if (params.search) {
        const searchTerm = params.search.toLowerCase();
        filteredData = filteredData.filter(item => 
          Object.values(item).some(value => 
            String(value).toLowerCase().includes(searchTerm)
          )
        );
      }
      
      // Apply pagination
      const page = params.page || 1;
      const limit = params.limit || 10;
      const startIndex = (page - 1) * limit;
      const endIndex = startIndex + limit;
      const paginatedData = filteredData.slice(startIndex, endIndex);
      
      return {
        data: paginatedData,
        total: filteredData.length,
        page,
        limit,
        totalPages: Math.ceil(filteredData.length / limit)
      };
    } else {
      return apiClient.get(this.endpoint, { params });
    }
  }

  // Fetch item by ID
  async fetchById(id) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      const item = this.mockData.find(item => item.id == id);
      if (!item) {
        throw new Error('Item not found');
      }
      return { data: item };
    } else {
      return apiClient.get(`${this.endpoint}/${id}`);
    }
  }

  // Create new item
  async create(data) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      const newItem = {
        id: generateId(),
        ...data,
        ngayTao: new Date().toISOString().split('T')[0],
        ngayCapNhat: new Date().toISOString().split('T')[0]
      };
      this.mockData.push(newItem);
      return { data: newItem };
    } else {
      return apiClient.post(this.endpoint, data);
    }
  }

  // Update item
  async update(id, data) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      const index = this.mockData.findIndex(item => item.id == id);
      if (index === -1) {
        throw new Error('Item not found');
      }
      const updatedItem = {
        ...this.mockData[index],
        ...data,
        ngayCapNhat: new Date().toISOString().split('T')[0]
      };
      this.mockData[index] = updatedItem;
      return { data: updatedItem };
    } else {
      return apiClient.put(`${this.endpoint}/${id}`, data);
    }
  }

  // Delete item
  async delete(id) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      const index = this.mockData.findIndex(item => item.id == id);
      if (index === -1) {
        throw new Error('Item not found');
      }
      this.mockData.splice(index, 1);
      return { message: 'Item deleted successfully' };
    } else {
      return apiClient.delete(`${this.endpoint}/${id}`);
    }
  }

  // Bulk operations
  async bulkDelete(ids) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      ids.forEach(id => {
        const index = this.mockData.findIndex(item => item.id == id);
        if (index !== -1) {
          this.mockData.splice(index, 1);
        }
      });
      return { message: 'Items deleted successfully' };
    } else {
      return apiClient.post(`${this.endpoint}/bulk-delete`, { ids });
    }
  }

  // Export data
  async export(params = {}) {
    if (config.USE_MOCK_DATA) {
      await simulateApiDelay();
      return { data: this.mockData };
    } else {
      return apiClient.get(`${this.endpoint}/export`, { params });
    }
  }
}

// Create service instances for each module
export const buongPhongService = new ApiService('/buong-phong', 'buongPhong');
export const lichSuLuuTruService = new ApiService('/lich-su-luu-tru', 'lichSuLuuTru');
export const serialService = new ApiService('/serial', 'serial');
export const danhMucTaiSanService = new ApiService('/danh-muc-tai-san', 'danhMucTaiSan');
export const thuocTinhService = new ApiService('/thuoc-tinh', 'thuocTinh');
export const hocVienService = new ApiService('/hoc-vien', 'hocVien');
export const canBoService = new ApiService('/can-bo', 'canBo');
export const phongBanService = new ApiService('/phong-ban', 'phongBan');
export const thuocVatTuService = new ApiService('/thuoc-vat-tu', 'thuocVatTu');
export const nhaCungCapService = new ApiService('/nha-cung-cap', 'nhaCungCap');
export const donViTinhService = new ApiService('/don-vi-tinh', 'donViTinh');
export const taiSanService = new ApiService('/tai-san', 'taiSan');
export const khoService = new ApiService('/kho', 'kho');
export const banGiaoService = new ApiService('/ban-giao', 'banGiao');
export const daoTaoNgheService = new ApiService('/dao-tao-nghe', 'daoTaoNghe');
export const giaoDucTuVanService = new ApiService('/giao-duc-tu-van', 'giaoDucTuVan');
export const laoDongTriLieuService = new ApiService('/lao-dong-tri-lieu', 'laoDongTriLieu');

export default ApiService;

