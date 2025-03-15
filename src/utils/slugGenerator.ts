export const generateSlug = (str: string): string => {
    return str
      .normalize('NFD') // تجزیه کاراکترهای ترکیبی
      .replace(/[\u0300-\u036f]/g, '') // حذف اعراب
      .replace(/[^\p{L}\d\s-]/gu, '') // پذیرش تمام حروف (شامل فارسی)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '-') // جایگزینی فاصله با خط تیره
      .replace(/-+/g, '-') // حذف خط تیره‌های تکراری
      .replace(/^-+/, '') // حذف خط تیره از ابتدا
      .replace(/-+$/, ''); // حذف خط تیره از انتها
  };
