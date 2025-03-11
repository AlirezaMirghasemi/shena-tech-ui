import flowbite from "flowbite-react/tailwind";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    flowbite.content(),
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1D4ED8", // رنگ اصلی برای دکمه‌ها، لینک‌ها و ...
        secondary: "#6B7280", // رنگ ثانویه جهت حالت hover و ...
        background: "#FFFFFF", // رنگ پس‌زمینه حالت نرمال
        text: "#1F2937", // رنگ متن اصلی
        border: "#E5E7EB", // رنگ مرزها
      },
    },
  },
  plugins: [flowbite.plugin],
};
