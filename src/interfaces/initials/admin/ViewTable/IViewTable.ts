import { IComment } from "@/interfaces/models/IComment";
import { IPost } from "@/interfaces/models/IPost";
import { IRole } from "@/interfaces/models/IRole";
import { ITag } from "@/interfaces/models/ITag";
import { IUser } from "@/interfaces/models/IUser";
import * as React from "react";
export interface IViewTable {
  tableHeader: IViewTableHeader;
  tableBody: IViewTableBody;
}
export interface IViewTableHeader {
  title: string;
  description: string;
  buttons: IViewTableButton[] | null;
}
export interface IViewTableButton {
  title: string;
  name: string;
  element: React.ReactElement;
}
export interface IViewTableBody {
  colTitles: string[];
  data: ITag[] | IUser[] | IPost[] | IComment[] | IRole[] | [];
  buttons: IViewTable[] | null;
  viewTHeadTitles: string[];
}
