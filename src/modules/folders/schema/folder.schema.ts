import { model, Schema, Types } from 'mongoose';

import { FolderModel } from '../models/folder.model';

const folderMongoSchema = new Schema<FolderModel>({
  files: { 
    type: [Types.ObjectId],
    required: false,
    default: undefined
  },
  folders: {
    type: [Types.ObjectId],
    required: false,
    default: undefined
  },
  title: {
    type: String,
    required: true
  },
  path: {
    type: String,
    required: false,
    default: undefined
  },
  parentFolderId: {
    type: String,
    required: true,
    default: undefined
  }
},
{
  versionKey: false
});

export const FolderSchema = model<FolderModel>('Folder', folderMongoSchema);
