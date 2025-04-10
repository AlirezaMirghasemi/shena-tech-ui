import { IImage } from "@/interfaces/models/IImage";
import { IUser, UserFormValues } from "@/interfaces/models/IUser";
import { deleteFile } from "@/services/common/deleteFile";
import { uploadFile } from "@/services/common/uploadFile";
import {
  createImage,
  deleteImage,
  fetchImageById,
} from "@/services/imageServices/ImageServices";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentPage } from "@/store/slices/userSlice";
import {
  createUserAsync,
  deleteUserAsync,
  fetchUserByIdAsync,
  fetchUsersAsync,
  updateUserAsync,
} from "@/store/thunks/usersThunk";
import { useCallback } from "react";

/**
 * هوک سفارشی جهت مدیریت عملیات کاربران
 */
export const useUsers = () => {
  const dispatch = useAppDispatch();
  const {
    data: users,
    status,
    error,
    currentPage,
    totalPages,
  } = useAppSelector((state) => state.users);

  const loadAllUsers = useCallback(
    (page = 1) => {
      dispatch(setCurrentPage(page));
      dispatch(fetchUsersAsync({ page, size: 1 }));
    },
    [dispatch]
  );
  const getUserById = (id: string) => dispatch(fetchUserByIdAsync(id));
  const deleteUser = (id: string) => dispatch(deleteUserAsync(id));

  /**
   * تابع ایجاد کاربر جدید (برای create)
   */
  const createNewUser = async (formData: UserFormValues) => {
    let imageRecord: IImage | null = null;
    if (
      formData.profilePicture &&
      typeof formData.profilePicture === "object" &&
      formData.profilePicture instanceof File
    ) {
      try {
        // آپلود فایل و دریافت اطلاعات اولیه عکس
        const uploadResult: IImage = await uploadFile(
          formData.profilePicture,
          "profilePicture"
        );
        // ثبت رکورد عکس در بانک اطلاعاتی
        imageRecord = await createImage({
          title: uploadResult.title,
          type: uploadResult.type,
          directory: uploadResult.directory,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
      } catch (uploadError) {
        console.error("خطا در آپلود عکس:", uploadError);
        return false;
      }
    }

    const newUser: IUser = {
      ...formData,
      imageId: imageRecord?.id || "",
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };

    try {
      delete newUser.profilePicture;
      await dispatch(createUserAsync(newUser)).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ایجاد کاربر:", error);
      return false;
    }
  };

  /**
   * تابع ویرایش کاربر.
   * اگر عکس جدیدی انتخاب شده باشد:
   * 1. اگر کاربر عکس قبلی داشته باشد، آن را حذف کن.
   * 2. عکس جدید را آپلود و ثبت کرده و شناسه آن را دریافت کن.
   * 3. شناسه عکس جدید را به جای عکس قبلی در رکورد کاربر قرار بده.
   */
  const updateUser = async (
    id: string,
    values: Partial<
      UserFormValues & { imageId?: string; profilePicture?: File }
    >
  ) => {
    // چک کردن اینکه آیا کاربر عکس جدیدی انتخاب کرده است یا خیر
    if (
      values.profilePicture &&
      typeof values.profilePicture === "object" &&
      values.profilePicture instanceof File
    ) {
      // اگر کاربر قبلاً یک عکس داشته باشد (در رکورد فعلی کاربر ثبت شده)، آن را حذف کن.
      // فرض بر این است که اطلاعات کاربر دریافت شده شامل فیلد imageId است.
      // (در فرم ویرایش، اگر عکس قبلی وجود دارد، مقدار imageId به عنوان رشته‌ای نگهداری می‌شود)
      if (
        values.imageId &&
        typeof values.imageId === "string" &&
        values.imageId !== ""
      ) {
        try {
          const oldImage = await fetchImageById({
            id: values.imageId as string,
          });
          await deleteFile(oldImage.directory); // یا به جای "profile" از مقدار متناسب با ImageType استفاده کنید.
          if (oldImage.id) {
            await deleteImage({ id: oldImage.id });
          } else {
            console.error("خطا: شناسه عکس قبلی معتبر نیست.");
          }
          // در صورت نیاز، می‌توان درخواست حذف فایل از سرور را نیز ارسال کرد.
        } catch (deleteError) {
          console.error("خطا در حذف عکس قبلی:", deleteError);
        }
      }
      try {
        // آپلود عکس جدید
        const uploadResult: IImage = await uploadFile(
          values.profilePicture,
          "profilePicture"
        );
        // ثبت عکس جدید در بانک اطلاعاتی
        const newImageRecord = await createImage({
          title: uploadResult.title,
          type: uploadResult.type,
          directory: uploadResult.directory,
          createdAt: Date.now(),
          updatedAt: Date.now(),
        });
        // به‌روزرسانی شناسه عکس در داده‌های کاربر
        values.imageId = newImageRecord.id;
      } catch (uploadError) {
        console.error("خطا در آپلود عکس جدید:", uploadError);
        return false;
      }
    }
    // حذف فیلد profilePicture (که شامل شیء File است) از داده‌های نهایی
    delete values.profilePicture;

    try {
      const updatedUser = {
        ...values,
        updatedAt: Date.now(),
      };
      await dispatch(updateUserAsync({ id, user: updatedUser })).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ویرایش کاربر:", error);
      return false;
    }
  };

  return {
    users,
    isLoading: status === "loading",
    error,
    actions: {
      loadAllUsers,
      createNewUser,
      getUserById,
      updateUser,
      deleteUser,
    },
    currentPage,
    totalPages,
  };
};
