# Bản đồ UI — cho smoke worker và người viết checklist

> Phần giữa hai marker `ui-map:generated` do `ui-map-scaffold.py` sinh, **đừng sửa tay**; chạy lại khi đổi router.
> Các mục dưới marker end ghi tay và được giữ nguyên qua mọi lần sinh. Repo có model quyền/user trong code thì thay scaffold bằng generator riêng (xem SKILL.md agy-cook, mục bản đồ UI).

<!-- ui-map:generated:start -->
## Route (nhận diện: react-router)
| Route | Tên / tiêu đề / component | Quyền (gợi ý từ code) | Nguồn |
|---|---|---|---|
| `/bang-go-telex` | Bảng gõ Telex (in được) |  | `src/components/RelatedGuides.tsx:23` |
| `/bang-go-telex` |  |  | `src/pages/TelexTable.tsx:12` |
| `/bang-go-vni` | Bảng gõ VNI (in được) |  | `src/components/RelatedGuides.tsx:24` |
| `/bang-go-vni` |  |  | `src/pages/VniTable.tsx:12` |
| `/bi-mat-phim-f-j` | Bí mật phím F và J |  | `src/components/RelatedGuides.tsx:22` |
| `/bi-mat-phim-f-j` |  |  | `src/pages/FjRidgeGuide.tsx:11` |
| `/huong-dan-telex` | Cách gõ Telex |  | `src/components/RelatedGuides.tsx:20` |
| `/huong-dan-telex` |  |  | `src/pages/TelexGuide.tsx:51` |
| `/huong-dan-vni` | Cách gõ VNI |  | `src/components/RelatedGuides.tsx:21` |
| `/huong-dan-vni` |  |  | `src/pages/VniGuide.tsx:43` |
| `/tap-go-10-ngon-cho-be` | Tập gõ 10 ngón cho bé |  | `src/components/RelatedGuides.tsx:25` |
| `/tap-go-10-ngon-cho-be` |  |  | `src/pages/KidsRoadmap.tsx:45` |
| `/tu-the-go-phim` | Tư thế ngồi & cách đặt tay |  | `src/components/RelatedGuides.tsx:19` |
| `/tu-the-go-phim` |  |  | `src/pages/PostureGuide.tsx:11` |

_Sinh bởi ui-map-scaffold.py — 14 route. Route lồng nhau (children) hiện đường dẫn tương đối như trong code; ghép với cha khi viết checklist._
<!-- ui-map:generated:end -->

## Đăng nhập và đổi người dùng (ghi tay)

- **Không có đăng nhập.** Site tĩnh, mọi route mở tự do, không có tài khoản, không có quyền.

## Tài khoản theo vai trò (ghi tay)

Không áp dụng — site không có người dùng.

## Đường đi và bẫy (ghi tay)

- Bảng route ở trên bị **lặp mỗi route 2 dòng** (một dòng từ `RelatedGuides.tsx`, một dòng từ file trang). Số route thật = một nửa con số scaffold in ra. Route thật: `/`, `/tu-the-go-phim`, `/huong-dan-telex`, `/huong-dan-vni`, `/bi-mat-phim-f-j`, `/bang-go-telex`, `/bang-go-vni` (+ `/tap-go-10-ngon-cho-be` sau phase 04). Scaffold **không** liệt kê `/` — nó là route index trong `src/routes.tsx`.
- **Tool luyện gõ là desktop-only.** Ở viewport ≤768px, `HomeView` thay tool bằng `DesktopNudge` ("mở trên máy tính"). Muốn smoke phần luyện gõ thì đặt viewport ≥1024px.
- **Mở thẳng một bài học:** `/?mode=<id>` (hoặc `/?open=<id>`). `HomeView` đọc query sau khi mount, id phải có trong `LESSON_MODES`; id sai thì vẫn vào màn practice với bài mặc định. Id dùng được: `basic_home`, `basic_top`, `basic_bottom`, `vietnamese_telex`, `vietnamese_vni`, `vietnamese_words`, `vietnamese_words_vni`, `sentences`, `custom`, `totoro_chase` (game).
- **Nav đầu trang chủ** là nguồn điều hướng chính giữa các trang nội dung. Ở 375px nav xuống 2 hàng — đúng thiết kế, không phải lỗi.
- **Bẫy layout:** mọi `<table>` phải nằm trong `<div style={{ overflowX: 'auto' }}>` và wrapper trang phải có `width: '100%'` cạnh `maxWidth: '800px'`. Thiếu một trong hai thì cả trang cuộn ngang ở 375px (đã xảy ra với 2 guide, sửa 06/09). Kỳ vọng smoke chuẩn: `document.documentElement.scrollWidth === window.innerWidth` ở mọi route.
- **Trang bảng gõ** (`/bang-go-telex`, `/bang-go-vni`) có nút "In bảng này" gọi `window.print()`. **Đừng bấm nút này khi smoke** — hộp thoại in của trình duyệt chặn mọi lệnh tiếp theo. Muốn kiểm bản in thì dùng `agent-browser` với emulate media `print`, không bấm nút.
