# Bản đồ UI — cho smoke worker và người viết checklist

> Phần giữa hai marker `ui-map:generated` do `ui-map-scaffold.py` sinh, **đừng sửa tay**; chạy lại khi đổi router.
> Các mục dưới marker end ghi tay và được giữ nguyên qua mọi lần sinh. Repo có model quyền/user trong code thì thay scaffold bằng generator riêng (xem SKILL.md agy-cook, mục bản đồ UI).

<!-- ui-map:generated:start -->
## Route (nhận diện: react-router)
| Route | Tên / tiêu đề / component | Quyền (gợi ý từ code) | Nguồn |
|---|---|---|---|
| `/bi-mat-phim-f-j` | Bí mật phím F và J |  | `src/components/RelatedGuides.tsx:22` |
| `/bi-mat-phim-f-j` |  |  | `src/pages/FjRidgeGuide.tsx:11` |
| `/huong-dan-telex` | Cách gõ Telex |  | `src/components/RelatedGuides.tsx:20` |
| `/huong-dan-telex` |  |  | `src/pages/TelexGuide.tsx:86` |
| `/huong-dan-vni` | Cách gõ VNI |  | `src/components/RelatedGuides.tsx:21` |
| `/huong-dan-vni` |  |  | `src/pages/VniGuide.tsx:76` |
| `/tu-the-go-phim` | Tư thế ngồi & cách đặt tay |  | `src/components/RelatedGuides.tsx:19` |
| `/tu-the-go-phim` |  |  | `src/pages/PostureGuide.tsx:11` |

_Sinh bởi ui-map-scaffold.py — 8 route. Route lồng nhau (children) hiện đường dẫn tương đối như trong code; ghép với cha khi viết checklist._
<!-- ui-map:generated:end -->

## Đăng nhập và đổi người dùng (ghi tay)

- `/login`: ô <nhãn>, tài khoản thử: `<user>` / `<mật khẩu>`. Đăng nhập xong → `<route>`.
- Đổi user: <cách, hoặc "đăng xuất rồi đăng nhập lại">.

## Tài khoản theo vai trò (ghi tay)

| Vai | Tài khoản | Vào được | Bị chặn ở |
|---|---|---|---|

## Đường đi và bẫy (ghi tay)

- <màn hình>: đường tới dialog/tab, thứ tự bước bắt buộc, state không persist, nút không có toast…
