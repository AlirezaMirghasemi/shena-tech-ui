export interface IPagination {
  currentPage: number; // صفحه فعلی
  totalPages: number; // تعداد کل صفحات
  onPageChange: (page: number) => void; // هندلر تغییر صفحه
  onPageSizeChange?: (size: number) => void; // هندلر تغییر سایز صفحه (اختیاری)
}
