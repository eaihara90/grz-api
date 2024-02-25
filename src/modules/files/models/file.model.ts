export class FileModel {
  _id?: any;
  description?: string;
  thumbnailUrl?: string;
  title!: string;
  url!: string;
}

export class NewFileDTO {
  description?: string;
  thumbnailUrl?: string;
  title!: string;
  url!: string;
  folderId!: string;
}