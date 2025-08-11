# Ma trận quyền hạn của từng Role trong hệ thống

## Danh sách Module chính
1. HOSO_CAI_NGHIEN (Hồ sơ cai nghiện)
2. QUAN_TRANG (Quân trang)
3. TIEN_LUU_KY (Tiền lưu ký)
4. DIEU_TRI (Điều trị cai nghiện)
5. GIAO_DUC_TU_VAN (Giáo dục tư vấn)
6. DAO_TAO_NGHE (Đào tạo nghề)
7. LAO_DONG_TRI_LIEU (Lao động trị liệu)
8. THAM_GAP (Thăm gặp)
9. USER (Người dùng)
10. ROLE (Vai trò)
11. PERMISSION (Quyền)

---

## Ma trận Role → Quyền

| Module / Role         | SYSTEM_ADMIN | CENTER_MANAGER | DEPARTMENT_HEAD | STAFF |
|-----------------------|--------------|----------------|-----------------|-------|
| **HOSO_CAI_NGHIEN**   | CRUD         | CRUD           | CRU             | R     |
| **QUAN_TRANG**        | CRUD         | CRUD           | CRU             | R     |
| **TIEN_LUU_KY**       | CRUD         | CRUD           | CRU             | R     |
| **DIEU_TRI**          | CRUD         | CRUD           | CRU             | R     |
| **GIAO_DUC_TU_VAN**   | CRUD         | CRUD           | CRU             | R     |
| **DAO_TAO_NGHE**      | CRUD         | CRUD           | CRU             | R     |
| **LAO_DONG_TRI_LIEU** | CRUD         | CRUD           | CRU             | R     |
| **THAM_GAP**          | CRUD         | CRUD           | CRU             | R     |
| **USER**              | CRUD         | CRUD           | CRU             | R     |
| **ROLE**              | CRUD         | CRUD           | R               | -     |
| **PERMISSION**        | CRUD         | CRUD           | R               | -     |

---

### Ký hiệu:
- **CRUD** → Create, Read, Update, Delete
- **CRU** → Create, Read, Update (không Delete)
- **R** → chỉ Read
- **-** → không có quyền

---

## Giải thích phân quyền

- **SYSTEM_ADMIN**: Toàn quyền toàn hệ thống.
- **CENTER_MANAGER**: Toàn quyền trong phạm vi trung tâm quản lý.
- **DEPARTMENT_HEAD**: Được thêm/sửa/xem dữ liệu phòng ban phụ trách, nhưng không xoá. Các module khác chỉ xem.
- **STAFF**: Chỉ được xem hầu hết dữ liệu, trừ khi được phân thêm quyền CRU trong một số module được giao.

---

## Nguyên tắc khi gán quyền
- Mỗi quyền trong DB = `{MODULE}:{ACTION}`, ví dụ `HOSO_CAI_NGHIEN:CREATE`.
- Role sẽ chứa tập hợp Permission tương ứng theo bảng trên.
- Kiểm tra quyền trong Service hoặc qua `@PreAuthorize("hasAuthority('MODULE:ACTION')")`.

