import { ImageType } from "@/constants/data/Type";

export interface IImage {
  id: string | null;
  title: string;
  type: ImageType;
  directory: string;
}
