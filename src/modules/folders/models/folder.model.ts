import { FileModel } from "../../files/models/file.model";

export class FolderModel {
  _id?: any;
  files!: string[];
  folders!: string[];
  title!: string;
  path?: string;
}

export class NewFolderInputDTO {
  _id?: any;
  files?: string[];
  folders?: string[];
  title!: string;
  path!: string;
  parentFolderId!: string;
}

export class FolderModelOutputDTO {
  _id?: any;
  favorites?: FileModel[];
  folders?: { _id: string, title: string }[];
  title!: string;
  path?: string;
}