// app/api/deleteFile/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function DELETE(req: Request) {
  try {
    // استخراج نام فایل از query params
    const { searchParams } = new URL(req.url);
    const filename = searchParams.get('filename');

    if (!filename) {
      return NextResponse.json({ error: 'نام فایل ارائه نشده است' }, { status: 400 });
    }

    // مسیر فایل در پوشه public/profilePicture
    const filePath = path.join(process.cwd(), 'public', 'images','profilePicture', filename);

    // بررسی وجود فایل
    try {
      await fs.access(filePath);
    } catch (error) {
      return NextResponse.json({ error: 'فایل یافت نشد' }, { status: 404 });
    }

    // حذف فایل
    await fs.unlink(filePath);

    return NextResponse.json({ message: 'فایل با موفقیت حذف شد' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
