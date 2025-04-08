import {
  IPermission,
  PermissionFormValues,
} from "@/interfaces/models/IPermission";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setCurrentPage } from "@/store/slices/permissionSlice";
import {
  createPermissionAsync,
  deletePermissionAsync,
  fetchPermissionByIdAsync,
  fetchPermissionsAsync,
  updatePermissionAsync,
} from "@/store/thunks/permissionsThunk";
import { useCallback } from "react";

/**
 * هوک سفارشی جهت مدیریت عملیات مربوط به مجوز‌ها از قبیل بارگذاری، ایجاد و سایر عملیات
 */
export const usePermissions = () => {
  const dispatch = useAppDispatch();

  // دریافت وضعیت و داده‌های مجوز‌ها از استور ریداکس
  const {
    data: permissions,
    status,
    error,
    currentPage,
    totalPages,
  } = useAppSelector((state) => state.permissions);

  /**
   * تابع بارگذاری تمام مجوز‌ها از API
   */
  const loadAllPermissions = useCallback(
    (page = 1) => {
      dispatch(setCurrentPage(page));
      dispatch(fetchPermissionsAsync({ page, size: 1 }));
    },
    [dispatch]
  );
  const getPermissionById = (id: string) =>
    dispatch(fetchPermissionByIdAsync(id));
  const deletePermission = (id: string) => dispatch(deletePermissionAsync(id));

  /**
   * تابع ایجاد مجوز جدید با استفاده از داده‌های فرم
   * @param formData - داده‌های فرم جهت ایجاد مجوز
   * @returns نتیجه موفقیت یا شکست عملیات
   */
  const createNewPermission = async (formData: PermissionFormValues) => {
    const newPermission: IPermission = {
      ...formData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await dispatch(createPermissionAsync(newPermission)).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ایجاد مجوز:", error);
      return false;
    }
  };
  const updatePermission = async (
    id: string,
    values: Partial<PermissionFormValues>
  ) => {
    try {
      const updatedPermission = {
        ...values,
        updatedAt: Date.now(),
      };
      await dispatch(
        updatePermissionAsync({ id, permission: updatedPermission })
      ).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ویرایش مجوز:", error);
      return false;
    }
  };
  return {
    permissions,
    isLoading: status === "loading",
    error,
    actions: {
      loadAllPermissions,
      createNewPermission,
      getPermissionById,
      updatePermission,
      deletePermission,
    },
    currentPage,
    totalPages,
  };
};
