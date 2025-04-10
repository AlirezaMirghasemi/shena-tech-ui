// app/api/deleteFile/route.ts
import { NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs/promises';

export async function DELETE(req: Request) {
  try {
    // استخراج نام فایل و نوع از query params
    const { searchParams } = new URL(req.url);
    const fileDirectory = searchParams.get('fileDirectory');






    if (!fileDirectory) {
      return NextResponse.json({ error: 'مسیر فایل مشخص نشده است' }, { status: 400 });
    }
    const filePath = path.join(process.cwd(), 'public', fileDirectory);

    try {
      await fs.access(filePath);
    } catch {
      return NextResponse.json({ error: 'فایل یافت نشد' }, { status: 404 });
    }

    await fs.unlink(filePath);

    return NextResponse.json({ message: 'فایل با موفقیت حذف شد' });
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'خطای ناشناخته رخ داده است';
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
