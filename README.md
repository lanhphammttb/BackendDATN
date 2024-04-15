# BackendDATN

Đồ án tốt nghiệp

# structor db

user (firstName, lastName , email, password)

groupcategorys(namegroup, group_id, category)

category (group_id, date, value, description)

expectedCosts (description, date, category_id, quantity, price, totalAmount, note)

expenses (description, date, category_id, expenseType (Thu nhập và chi tiêu) ,quantity, price, totalAmount, note)

accounts (user_id, accountNumber, balance, accountType (chọn giữa "Tiền mặt"VÀ"Tiền tài khoản"))

# create file .env

MONGO_URL="mongodb+srv://lanhphammttb:lanh123@lanhpham.xs8cpwm.mongodb.net/Test_API",
PORT="8080",
JWT_SECRET="lanhpham"

# acount (theo tiền mặt hoặc tài khoản)

GET /api/v1/accounts: Lấy tất cả các tài khoản của người dùng.
GET /api/v1/accounts/:id: Lấy thông tin một tài khoản cụ thể theo ID.
POST /api/v1/accounts: Tạo một tài khoản mới.
PUT /api/v1/accounts/:id: Cập nhật thông tin một tài khoản theo ID.
DELETE /api/v1/accounts/:id: Xóa một tài khoản theo ID.
GET /api/v1/accounts?keyword=123: Tìm kiếm tất cả các tài khoản có số tài khoản chứa "123".
GET /api/v1/accounts?keyword=Tien%20mat: Tìm kiếm tất cả các tài khoản có loại tài khoản chứa "Tien mat".

# Group Categories:

Lấy tất cả: GET /api/v1/groupcategories
Lấy theo ID: GET /api/v1/groupcategories/:id
Tạo mới: POST /api/v1/groupcategories
Cập nhật: PUT /api/v1/groupcategories/:id
Xóa: DELETE /api/v1/groupcategories/:id

# Categories:

Lấy tất cả: GET /api/v1/categories?group_id=<group_id>
Lấy theo ID: GET /api/v1/categories/:id
Tạo mới: POST /api/v1/categories
Cập nhật: PUT /api/v1/categories/:id
Xóa: DELETE /api/v1/categories/:id

# expectedCosts

Lấy tất cả: GET /api/v1/expectedcosts
Lấy theo ID: GET /api/v1/expectedcosts/:id
Tạo mới: POST /api/v1/expectedcosts
Cập nhật: PUT /api/v1/expectedcosts/:id
Xóa: DELETE /api/v1/expectedcosts/:id
Lấy theo từ khóa: GET /api/v1/expectedcosts/search?keyword=<keyword>

# expenses (chọn theo thu nhập hoặc chi tiêu)

Lấy tất cả: GET /api/v1/expenses
Lấy theo ID: GET /api/v1/expenses/:id
Tạo mới: POST /api/v1/expenses
Cập nhật: PUT /api/v1/expenses/:id
Xóa: DELETE /api/v1/expenses/:id
Lấy theo từ khóa: GET /api/v1/expenses/search?keyword=<keyword>
