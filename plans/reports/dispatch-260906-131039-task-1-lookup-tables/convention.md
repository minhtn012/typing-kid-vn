# Quy ước code Vue 3 + TypeScript (worker `agy`)

> Nạp tự động vào prompt khi spec đụng `.vue`/`.ts` (dispatch-agent-task.sh). Coordinator review diff theo đúng các mục này.
> Xung đột với AGENTS.md hoặc spec của repo → AGENTS.md/spec thắng. Mỗi mục là 1 điều review sẽ soi; vi phạm phải có lý do ghi trong `Concerns`.

## 1. Component

- `<script setup lang="ts">` cho mọi component. Thứ tự khối: `<script setup>` → `<template>` → `<style>` (chỉ khi thật sự cần, ưu tiên không có).
- Props/emits khai bằng generic TypeScript, không runtime validation: `defineProps<{ id: string; disabled?: boolean }>()`, `defineEmits<{ submit: [id: string]; cancel: [] }>()`. Cấm `defineProps({ ... })`, `PropType`, `defineEmits(['x'])`.
- `v-model` dùng `defineModel<T>()` (có tên: `defineModel<string>('search')`). Cấm tự viết cặp `modelValue` + `update:modelValue`.
- `const props = defineProps…` chỉ khi script dùng `props.`; không dùng thì bỏ `const props =`.
- Một component ≤ ~200 dòng. Có ≥ 3 vùng UI độc lập hoặc ≥ 2 trách nhiệm → tách sub-component vào `components/` của entity.
- Không `index.vue`. Tên file mô tả đúng vai: `{entity}-{list|detail|wizard}.vue`, `*-dialog.vue` (confirm / form ngắn), `*-drawer.vue` (form ≥ 5 field), `*-table.vue`, `*-chip.vue`. Cấm hậu tố `*-modal.vue`.

## 2. Đặt file và ranh giới import

- Đọc `docs/architecture/domain-boundaries.md` (nếu repo có) trước khi tạo file. Cây quyết định: dùng ở ≥ 2 domain → `src/shared/`; ≥ 2 entity trong 1 domain → `modules/<domain>/shared/`; còn lại → `modules/<domain>/<entity>/`.
- Chiều import: `modules/*` → `src/shared/`, `src/components/ui/` được. `src/shared/` → `modules/*` **cấm**. Cross-domain (`modules/a` ↔ `modules/b`) **cấm**; cần chung thì đẩy lên `src/shared/`.
- Entity sibling chỉ import public API (page dialog/drawer top-level, `stores/*`, `types.ts`); không import `components/*`, `composables/*` của entity khác.
- Composable `use-<verb>-<noun>.ts`; store `<entity>-store.ts` export `use<Entity>Store()`; helper thuần vào `lib/`; type riêng entity vào `types.ts`.
- Không sửa `src/components/ui/*` trừ khi spec cho phép đích danh.

## 3. Dữ liệu và state

- Dữ liệu chỉ qua lớp dữ liệu của repo (store Pinia hoặc cổng dữ liệu `src/shared/data`); component **không** import seed/mock thô, không giữ bản sao cục bộ của dữ liệu dùng chung rồi tự sync.
- Store Pinia dạng setup (`defineStore('x', () => { … })`). Đọc state ở component qua `storeToRefs()`; đổi state chỉ qua action của store, không gán `store.items = …` từ component.
- Composable trả về `ref`/`computed`/hàm, phơi `loading`/`error`; **không** gọi toast, dialog, router bên trong composable — component quyết định UI.
- Composable viết inline trong component trước; chỉ tách ra `composables/` khi ≥ 2 component dùng.

## 4. Reactivity

- Không destructure `props` hay object `reactive()` (mất reactivity); dùng `toRefs`/`computed`.
- Giá trị suy ra → `computed`, không `watch` + gán tay. `watch` phải có source rõ (`watch(() => props.id, …)`), không `deep: true` trên mảng lớn trừ khi không còn cách khác.
- Không `async` trong `computed`. Side effect bất đồng bộ đặt trong `watch`/`onMounted`, dọn trong `onUnmounted`/`onScopeDispose`.
- `v-for` bắt buộc `:key` là id ổn định; cấm `:key="index"`. Không `v-if` và `v-for` trên cùng phần tử.

## 5. Type

- Cấm `any`, `as unknown as`, `@ts-ignore`, `@ts-expect-error`, `!` non-null khi chưa có guard. Không rõ kiểu → hỏi qua `Concerns`, không nới lỏng.
- Type khớp đúng contract dữ liệu: field có thể thiếu phải `?`; không tạo type song song gần giống type đã có trong `src/shared/lib`.
- Trạng thái nghiệp vụ: union type + bảng meta (`X_STATUS_META: Record<XStatus, { label, variant }>`) là nguồn duy nhất cho nhãn/màu; template không hardcode chuỗi trạng thái, không `if (status === 'approved')` rải rác — dùng helper hoặc meta.

## 6. Template và style

- Text hiển thị 100% tiếng Việt có dấu, giọng ngắn gọn; không để lẫn tiếng Anh, không placeholder `TODO`/`lorem`.
- Dùng primitive `src/components/ui/*` (Button, Input, Dialog, Sheet, Table…) thay vì `<button>`/`<input>` thô. Icon từ `lucide-vue-next`, kích thước theo pattern của repo.
- Biểu thức trong template ≤ 1 phép; phức tạp hơn → `computed`. Class có điều kiện dùng object syntax.
- Màu chỉ qua CSS var/token của repo (`docs/ui-patterns.md`); cấm hex/rgb/oklch/`!important`/`style="color:…"` trong component.

## 7. Router và async

- Route `component: () => import(...)`, có `name`; điều hướng bằng `{ name, params }`, không ghép chuỗi path. Guard đặt ở router, không ở component.
- Thao tác async: trạng thái `loading`/`error` rõ ràng, thông báo qua toast của repo (`vue-sonner`); cấm `catch {}` nuốt lỗi, cấm `console.log` để lại.

## 8. Không lách lỗi

- Cấm `eslint-disable`, `void <biến>`, tham số/biến tiền tố `_` để né unused, `if (!x) return null` chỉ để né noUnusedParameters. Hàm không còn ai gọi thì xoá.
- `npm run typecheck` (và test/build nếu spec yêu cầu) phải sạch thật; còn lỗi → dán nguyên văn vào `Verify`, báo `DONE_WITH_CONCERNS`/`BLOCKED`.

