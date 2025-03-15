import { FaHourglassHalf } from "react-icons/fa6";

export default function DescriptionLoading() {
    return(
<div className="relative">
  <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
    <div className="flex">
      <div className="shrink-0">
        <FaHourglassHalf className="shrink-0 size-4 text-blue-600 mt-0.5" width="24" height="24" />
      </div>
      <div className="ms-3">
        <h3 className="text-sm text-blue-800 font-medium">
          لطفا صبور باشید.
        </h3>
        <div className="text-sm text-blue-700 mt-2">
          <span className="font-semibold">اطلاعات در حال بارگذاری هستند.</span>
        </div>
      </div>
    </div>
  </div>

  <div className="absolute top-0 start-0 size-full bg-white/50 rounded-lg dark:bg-neutral-800/40"></div>

  <div className="absolute top-1/2 start-1/2 transform -translate-x-1/2 -translate-y-1/2">
    <div className="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-full dark:text-blue-500" role="status" aria-label="loading">
      <span className="sr-only">در حال بارگذاری اطلاعات</span>
    </div>
  </div>
</div>
    );
}
