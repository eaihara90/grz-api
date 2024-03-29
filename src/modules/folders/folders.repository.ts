import { Document, ProjectionType, Types } from 'mongoose';
import { FolderSchema } from './schema/folder.schema';
import { FolderModel } from './models/folder.model';

export default class FoldersRepository {
  public async findAll(): Promise<(Document<unknown, {}, FolderModel>)[]> {
    try {
      return FolderSchema.find().exec();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async findById(id: string | Types.ObjectId, fields?: ProjectionType<FolderModel>): Promise<FolderModel | null> {
    try {
      return FolderSchema.findOne({ _id: id }, fields).lean();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async save(folder: any): Promise<(Document<unknown, {}, FolderModel>)> {
    try {
      return FolderSchema.create(folder);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async delete(id: string): Promise<any> {
    try {
      return FolderSchema.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async update(folder: any): Promise<(Document<unknown, {}, FolderModel>) | null> {
    try {
      return FolderSchema.findByIdAndUpdate(folder._id, folder, { new: true }).exec();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async findRootFolder(): Promise<FolderModel | null> {
    try {
      return FolderSchema.findOne({ path: 'root' }).lean();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}