## Tiêu đề 
đây là code để test phần giao tiếp với firebase
### Hướng dẫn
- clone code về.
- Vào phần index.js đổi lại config của mình.
- Vào Firestore Database tạo 3 collections ( tương ứng với Car, Driver, Route) và thêm các field (hoặc không cũng được).
- gọi hàm các kiểu ở phần test code trong sample.js ( hoặc tạo file khác rồi import các kiểu vô chạy).
- dùng lệnh 
```
node sample.js
``` 
để chạy.
-check data trên db của mình.
#### Các phần còn thiếu :
##### Xóa,sửa db:
    dự kiến sẽ hoàn thành tối thứ 4 ( dã xong sửa )
##### Các logic nhỏ:
    - status xe,tài xế khi khởi tạo là available, sau khi gán cho .route chuyển thành busy, hết thời gian dự kiến trở về available
    - Tạo dữ liệu ảnh bằng lái và phương thức cập nhật bằng lái của tài xế.
    - Tính toán quãng đường dựa vào begin và end (trong code để tạm tính bằng đường chim bay) .
    - quyền đọc sửa xóa của manager (nằm ở phần rule trên firestore database).
    - chuyển route về json để chứa trên mảng của Driver ( dùng cho history), cập nhật mỗi khi route được gán.
    - Và các thứ khác chưa nhớ ...
#### Các lỗi đang gặp
    - gọi các hàm bên index.js bị đứng .
    - kiểu dữ liệu Date khi store lên db bị lỗi ( đang nghiên cứu chuyển thành timestamp ).
    - Và sẽ tăng lên trong tương lai.

