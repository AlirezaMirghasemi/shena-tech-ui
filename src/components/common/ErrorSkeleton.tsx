import { FaXmark } from "react-icons/fa6";

export default function ErrorSkeleton({message}:{message:string}) {
  return (
    <>
      <div
        className="bg-red-50 border border-red-200 text-sm text-red-800 rounded-lg p-4 dark:bg-red-800/10 dark:border-red-900 dark:text-red-500"
        role="alert"
        tabIndex={-1}
        aria-labelledby="hs-with-list-label"
      >
        <div className="flex">
          <div className="shrink-0">
           <FaXmark/>
          </div>
          <div className="ms-4">
            <h3 id="hs-with-list-label" className="text-sm font-semibold">
              مشکلی پیش آمده.
            </h3>
            <div className="mt-2 text-sm text-red-700 dark:text-red-400">
              <p>{message}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
