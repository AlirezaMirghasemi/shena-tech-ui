import { NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";
import { IImage } from "@/interfaces/models/IImage";
import { ImageType } from "@/constants/data/Type";

export const config = {
  api: {
    bodyParser: false,
  },
};

// تابع برای تعیین مسیر ذخیره‌سازی بر اساس نوع عکس
function getUploadFolder(imageType: string) {
  switch (imageType) {
    case "profilePicture":
      return path.join(process.cwd(), "public", "images", imageType);
    case "poster":
      return path.join(process.cwd(), "public", "images", "poster");
    case "article":
      return path.join(process.cwd(), "public", "images", "article");
    case "event":
      return path.join(process.cwd(), "public", "images", "event");
    case "video":
      return path.join(process.cwd(), "public", "images", "video");
    default:
      return path.join(process.cwd(), "public", "images", "others");
  }
}

export async function POST(req: Request) {
  try {
    // دریافت داده‌های فرم
    const formData = await req.formData();

    // دریافت فایل از کلید مشخص شده
    const file = formData.get("file") as File;
    if (!file) {
      return NextResponse.json({ error: "فایلی دریافت نشد" }, { status: 400 });
    }

    // دریافت نوع عکس از فرم؛ اگر ارسال نشده باشد مقدار پیش‌فرض "profile" در نظر گرفته می‌شود
    const imageType = formData.get("type")
      ? String(formData.get("type"))
      : "profile";

    // تعیین دایرکتوری ذخیره بر اساس نوع عکس
    const uploadDir = getUploadFolder(imageType);

    // اطمینان از وجود پوشه؛ در صورت عدم وجود، ایجاد شود
    try {
      await fs.access(uploadDir);
    } catch {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // استخراج پسوند فایل از نام فایل اصلی
    const originalFileName =
      file instanceof File && file.name ? file.name : "unknown";
    const ext = path.extname(originalFileName) || "";

    // ایجاد نام یکتای فایل با ترکیب زمان و شناسه
    const uniqueName = `${imageType}-${Date.now()}${ext}`;

    // تبدیل فایل به Buffer جهت ذخیره‌سازی
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const filePath = path.join(uploadDir, uniqueName);
    await fs.writeFile(filePath, buffer);

    // ایجاد رکورد تصویر مطابق با مدل IImage
    // (در این مثال به صورت شبیه‌سازی شده است؛ در یک پیاده‌سازی واقعی، این رکورد باید در بانک اطلاعاتی ذخیره شود)
    const imageRecord :IImage= {
      title: uniqueName,
      type: imageType as ImageType,
      // مسیر عمومی جهت دسترسی به عکس؛ به عنوان مثال ممکن است از public پوشه قابل دسترس باشد
      directory: `/images/${imageType}/${uniqueName}`,
    };

    return NextResponse.json({
      imageRecord: imageRecord,
    });
  } catch (error: unknown) {
    const errorMessage =
      error instanceof Error ? error.message : "Unknown error";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
