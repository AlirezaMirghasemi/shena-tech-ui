import {
  IParentButton,
  ISidebarButton,
} from "@/interfaces/initials/admin/ISidebarButton";
import {
    FaArrowTrendUp,
  FaCalendarDay,
  FaComments,
  FaEnvelopesBulk,
  FaFilm,
  FaGear,
  FaHashtag,
  FaKey,
  FaLock,
  FaNewspaper,
  FaScrewdriverWrench,
  FaUser,
  FaUserTie,
} from "react-icons/fa6";
export const SidebarButtons: ISidebarButton[] = [
  { title: "نظرات", name: "comments", icon: <FaComments />, href: "comments" },
];
export const UserAdminSideButtons: IParentButton = {
  icon: <FaUserTie />,
  ariaControlsName: "UserAdmin",
  name: "UserAdmin",
  title: "مدیریت کاربران",
  groupName: "UserAdminSide",
  children: [
    {
      icon: <FaUser />,
      ariaControlsName: "users",
      name: "users",
      title: "کاربران",
      href: "/admin/users",
    },

    {
      icon: <FaLock />,
      groupName: "accessSide",
      ariaControlsName: "access",
      name: "access",
      title: "مدیریت دسترسی",
      children: [
        {
          icon: <FaScrewdriverWrench />,
          ariaControlsName: "roles",
          name: "roles",
          title: "نقش ها",
          href: "/admin/roles",
        },
        {
          icon: <FaKey />,
          ariaControlsName: "permissions",
          name: "permissions",
          title: "مجوز ها",
          href: "/admin/permissions",
        },
      ],
    },
  ],
};

export const ContentAdminSideButtons: IParentButton = {
    icon: <FaEnvelopesBulk />,
    ariaControlsName: "ContentAdmin",
    name: "ContentAdmin",
    title: "مدیریت محتوا",
    groupName: "ContentAdminSide",
    children: [
      {
        icon: <FaCalendarDay />,
        ariaControlsName: "events",
        name: "events",
        title: "رویداد ها",
        href: "/admin/events",
      },
      {
        icon: <FaNewspaper />,
        ariaControlsName: "articles",
        name: "articles",
        title: "مقالات",
        href: "/admin/articles",
      },
      {
        icon: <FaFilm />,
        ariaControlsName: "videos",
        name: "videos",
        title: "فیلم ها",
        href: "/admin/videos",
      },
      {
        icon: <FaArrowTrendUp />,
        groupName: "seoSide",
        ariaControlsName: "seo",
        name: "seo",
        title: "مدیریت بازدید",
        children: [
          {
            icon: <FaHashtag />,
            ariaControlsName: "tags",
            name: "tags",
            title: "هشتگ ها",
            href: "/admin/tag",
          },
          {
            icon: <FaGear />,
            ariaControlsName: "slugs",
            name: "slugs",
            title: "اسلاگ ها",
            href: "/admin/slugs",
          },
        ],
      },
    ],
  };
