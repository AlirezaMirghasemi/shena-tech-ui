export enum Type {
  ARTICLE = "article",
  EVENT = "event",
  VIDEO = "video",
}
export enum Image {
  PROFILE = "profilePicture",
  POSTER = "poster",
}
export type ImageType = Type | Image;
