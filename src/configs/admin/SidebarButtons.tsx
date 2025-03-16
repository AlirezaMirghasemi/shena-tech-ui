import { ISidebarButton } from "@/interfaces/initials/admin/ISidebarButton";
import { FaCalendarDay, FaComments, FaFilm, FaGear, FaHashtag, FaNewspaper, FaScrewdriverWrench, FaUserTie } from "react-icons/fa6";
export const SidebarButtons:ISidebarButton[]=[
{title:"کاربران",name:"users",icon:<FaUserTie/>,href:"users"},
{title:"نقش ها",name:"roles",icon:<FaScrewdriverWrench/>,href:"roles"},
{title:"رویداد ها",name:"event",icon:<FaCalendarDay/>,href:"events"},
{title:"مقالات",name:"articles",icon:<FaNewspaper/>,href:"articles"},
{title:"فیلم ها",name:"videos",icon:<FaFilm/>,href:"videos"},
{title:"هشتگ ها",name:"tags",icon:<FaHashtag/>,href:"tags"},
{title:"اسلاگ ها",name:"slugs",icon:<FaGear/>,href:"slugs"},
{title:"نظرات",name:"comments",icon:<FaComments/>,href:"comments"}



];
