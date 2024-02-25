import { Document } from 'mongoose';
import { FileSchema } from './schema/file.schema';
import { FileModel } from './models/file.model';

export default class FilesRepository {
  public async findAll(): Promise<(Document<unknown, {}, FileModel>)[]> {
    try {
      return FileSchema.find().exec();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async findById(id: string): Promise<(Document<unknown, {}, FileModel>) | null> {
    try {
      return FileSchema.findOne({ _id: id }).exec();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async findByFolderId(folderId: string): Promise<(Document<unknown, {}, FileModel>[]) | null> {
    try {
      return FileSchema.find({ parentId: folderId }).exec();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async save(folder: any): Promise<(Document<unknown, {}, FileModel>)> {
    try {
      return FileSchema.create(folder);
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async delete(id: string): Promise<any> {
    try {
      return FileSchema.deleteOne({ _id: id }).exec();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async update(movie: any): Promise<(Document<unknown, {}, FileModel>) | null> {
    try {
      return FileSchema.findByIdAndUpdate(movie._id, movie, { new: true }).exec();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}