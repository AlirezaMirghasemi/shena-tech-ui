export const getInputClass = (touched: boolean, error: string | undefined) =>
    `py-2.5 sm:py-3 px-4 block w-full rounded-lg sm:text-sm dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 ${
      touched && error
        ? "border-red-500 focus:border-red-500 focus:ring-red-500 dark:border-red-500"
        : "border-teal-500 focus:border-teal-500 focus:ring-teal-500"
    }`;
