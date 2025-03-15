import { FaBomb } from "react-icons/fa6";

export default function ValidatingError({ error }: { error: string }) {
  return (
    <div className="flex">
      <FaBomb className="text-red-600 mt-2 pl-1" />
      <p className="text-sm text-red-600 mt-2">{error}</p>
    </div>
  );
}
