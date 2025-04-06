import { FaX } from "react-icons/fa6";
import { useEffect, useRef } from "react";

interface ConfirmDeleteProps {
  isOpen: boolean;
  onClose: () => void;
  ariaControls: string;
  title: string;
  message: string;
  confirmHandler: (id: string) => void;
  deletedItemId: string;
}

export default function ConfirmDelete({
  isOpen,
  onClose,
  ariaControls,
  title,
  message,
  confirmHandler,
  deletedItemId,
}: ConfirmDeleteProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  const lastActiveElement = useRef<HTMLElement | null>(null);

  // مدیریت فوکوس و تعاملات
  useEffect(() => {
    if (isOpen) {
      // 1. ذخیره المان فعال فعلی
      lastActiveElement.current = document.activeElement as HTMLElement;

      // 2. قفل اسکرول صفحه
      document.body.style.overflow = 'hidden';

      // 3. فعال کردن pointer-events برای محتوای مودال
      if (modalRef.current) {
        modalRef.current.style.pointerEvents = 'auto';
      }
    } else {
      // 4. بازگردانی اسکرول صفحه
      document.body.style.overflow = 'auto';

      // 5. بازگردانی فوکوس به المان قبلی
      if (lastActiveElement.current) {
        lastActiveElement.current.focus();
      }
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  // مدیریت کلیک خارج از مودال
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      ref={modalRef}
      id={ariaControls}
      onClick={handleBackdropClick}
      className={`fixed top-0 left-0 w-full h-full z-[999]
        ${isOpen ? 'visible' : 'invisible'}
        ${isOpen ? 'bg-black/50' : 'bg-transparent'}
        transition-all duration-300`}
    >
      <div
        className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2
          bg-white dark:bg-neutral-800 rounded-xl shadow-2xs
          ${isOpen ? 'scale-100 opacity-100' : 'scale-95 opacity-0'}
          transition-all duration-300`}
      >
        <div className="bg-white border border-gray-200 rounded-xl shadow-2xs dark:bg-neutral-800 dark:border-neutral-700">
          <div className="flex justify-between items-center py-3 px-4 border-b dark:border-neutral-700">
            <h3 className="font-bold text-gray-800 dark:text-white">{title}</h3>
            <button
              type="button"
              className="size-8 inline-flex justify-center items-center gap-x-2 rounded-full bg-gray-100 hover:bg-gray-200 dark:bg-neutral-700 dark:hover:bg-neutral-600"
              onClick={onClose}
              aria-label="بستن"
            >
              <FaX className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4">
            <p className="text-gray-800 dark:text-neutral-400">{message}</p>
          </div>

          <div className="flex justify-end gap-x-2 py-3 px-4 border-t dark:border-neutral-700">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-800 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 dark:bg-neutral-800 dark:text-neutral-400 dark:border-neutral-700 dark:hover:bg-neutral-700"
              onClick={onClose}
            >
              انصراف
            </button>
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-red-500 bg-white border border-red-500 rounded-lg hover:bg-red-50 disabled:opacity-50 dark:bg-neutral-800 dark:border-red-500 dark:hover:bg-red-900/20"
              onClick={() => {
                if (deletedItemId) {
                  confirmHandler(deletedItemId);
                  onClose();
                }
              }}
              disabled={!deletedItemId}
            >
              تایید حذف
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
