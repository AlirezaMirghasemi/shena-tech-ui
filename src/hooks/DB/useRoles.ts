import { IRole, RoleFormValues } from "@/interfaces/models/IRole";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { createRoleAsync, fetchRoleByIdAsync, fetchRolesAsync, updateRoleAsync } from "@/store/thunks/rolesThunk";


/**
 * هوک سفارشی جهت مدیریت عملیات مربوط به نقش‌ها از قبیل بارگذاری، ایجاد و سایر عملیات
 */
export const useRoles = () => {
  const dispatch = useAppDispatch();

  // دریافت وضعیت و داده‌های نقش‌ها از استور ریداکس
  const {
    data: roles = [],
    status,
    error,
  } = useAppSelector((state) => state.roles);

  /**
   * تابع بارگذاری تمام نقش‌ها از API
   */
  const loadAllRoles = () => dispatch(fetchRolesAsync());

  const getRoleById = (id: string) => dispatch(fetchRoleByIdAsync(id));

  /**
   * تابع ایجاد نقش جدید با استفاده از داده‌های فرم
   * @param formData - داده‌های فرم جهت ایجاد نقش
   * @returns نتیجه موفقیت یا شکست عملیات
   */
  const createNewRole = async (formData: RoleFormValues) => {
    const newRole: IRole = {
      ...formData,
      createdAt: Date.now(),
      updatedAt: Date.now(),
    };
    try {
      await dispatch(createRoleAsync(newRole)).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ایجاد نقش:", error);
      return false;
    }
  };
  const updateRole = async (id: string, values: Partial<RoleFormValues>) => {
    try {
      await dispatch(updateRoleAsync({id, role: values})).unwrap();
      return true;
    } catch (error) {
      console.error("خطا در ویرایش نقش:", error);
      return false;
    }
  };
  return {
    roles,
    isLoading: status === "loading",
    error,
    actions: {
      loadAllRoles,
      createNewRole,
      getRoleById,
      updateRole
    },
  };
};
