// utils/authHelper.js
import bcrypt from 'bcryptjs';
const saltRounds = 12;

// تابع هش کردن رمز عبور
export async function hashPassword(password:string) {
  try {
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(password, salt);
    return hash;
  } catch (err) {
    throw new Error(err as string);
  }
}

// تابع مقایسه رمز عبور
export async function comparePassword(password:string, hash:string) {
  try {
    return await bcrypt.compare(password, hash);
  } catch (err) {
    throw new Error(err as string);
  }
}
