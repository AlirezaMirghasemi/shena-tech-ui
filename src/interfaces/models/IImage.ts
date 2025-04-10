import { ImageType } from "@/constants/data/Type";

export interface IImage {
  id?: string;
  title: string;
  type: ImageType;
  directory: string;
  createdAt: number;
  updatedAt: number;
}
export type ImageFormValues = Pick<IImage, "title" | "type" | "directory">;
