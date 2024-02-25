import { model, Schema, Types } from 'mongoose';

import { FileModel } from '../models/file.model';


const fileMongoSchema = new Schema<FileModel>({
  description: { type: String, required: false },
  thumbnailUrl: { type: String, required: false },
  title: { type: String, required: true },
  url: { type: String, required: false },
},
{
  versionKey: false
});

export const FileSchema = model<FileModel>('File', fileMongoSchema);
