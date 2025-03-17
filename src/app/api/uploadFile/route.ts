// app/api/upload/route.ts
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";
import path from "path";
import fs from "fs/promises";

export const config = {
  api: {
    bodyParser: false,
  },
};

const uploadDir = path.join(process.cwd(), "public","images", "profilePicture");

export async function POST(req: Request) {
  try {
    // دریافت FormData از درخواست
    const formData = await req.formData();
    const file = formData.get("profilePicture") as File;

    if (!file) {
      return NextResponse.json({ error: "فایلی دریافت نشد" }, { status: 400 });
    }

    // استخراج پسوند فایل از نام اصلی فایل
    const originalFileName = file instanceof File && file.name ? file.name : "unknown";
    const ext = path.extname(originalFileName) || "";
    const uniqueName = `${Date.now()}-${uuidv4()}${ext}`;

    // تبدیل فایل (Blob) به Buffer
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    // اطمینان از وجود پوشه آپلود
    try {
      await fs.access(uploadDir);
    } catch (error) {
      await fs.mkdir(uploadDir, { recursive: true });
    }

    // ذخیره فایل در پوشه مورد نظر
    const filePath = path.join(uploadDir, uniqueName);
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({ filename: uniqueName });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
