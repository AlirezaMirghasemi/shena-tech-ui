import React, { useEffect } from "react";
import Image from "next/image";
import { FaUser } from "react-icons/fa6";

interface FileUploaderProps {
  field: { name: string };
  form: { setFieldValue: (field: string, value: File) => void };
  title: string;
  previewOld?: string;
}

const FileUploader: React.FC<FileUploaderProps> = ({
  field,
  form,
  title,
  previewOld,
}) => {
  const [preview, setPreview] = React.useState<string | null>(null);

  useEffect(() => {
    if (previewOld) {
      setPreview(previewOld);
    }
  }, []);
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setFieldValue(field.name, file); // ذخیره فایل در حالت Formik
      const reader = new FileReader();
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPreview(reader.result); // بروزرسانی پیش‌نمایش تصویر
        }
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center space-x-4 max-w-sm">
      <label htmlFor={field.name} className="cursor-pointer">
        <span className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
          انتخاب {title}
        </span>
      </label>
      <input
        type="file"
        id={field.name}
        name={field.name}
        accept="image/*"
        onChange={handleFileChange}
        style={{ display: "none" }}
      />
      {preview ? (
        <Image
          src={preview}
          alt="Preview"
          width={80}
          height={80}
          className="rounded-full object-cover"
        />
      ) : (
        <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
          <FaUser className="w-8 h-8 text-gray-400" />
        </div>
      )}
    </div>
  );
};

export default FileUploader;
