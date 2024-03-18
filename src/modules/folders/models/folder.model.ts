import { Types } from "mongoose";
import { FileModel } from "../../files/models/file.model";

export class FolderModel {
  _id?: any;
  files!: string[];
  folders!: Array<Types.ObjectId | string>;
  title!: string;
  path?: string;
  parentFolderId!: string;
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
  _id!: any;
  favorites?: FileModel[];
  folders?: FolderModelInnerFolder[];
  title!: string;
  path?: string;
  parentFolderId!: string;
}

export class FolderModelInnerFolder {
  _id!: string;
  title!: string;
  parentFolderInfo!: FolderModelParentFolderInfo;
}

export class FolderModelParentFolderInfo {
  _id!: string;
  title!: string;
}