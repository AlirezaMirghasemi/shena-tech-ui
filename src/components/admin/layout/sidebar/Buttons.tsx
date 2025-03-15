import { SidebarButtons } from "@/configs/admin/SidebarButtons";
import ActiveButton from "./ActiveButton";

export default function Buttons() {
  return (
    <>
      {SidebarButtons.map((button) => (
        <li key={button.name}>
          <ActiveButton href={`/admin/${button.href}`} >
            {button.icon}
            {button.title}
          </ActiveButton>
        </li>
      ))}
    </>
  );
}
