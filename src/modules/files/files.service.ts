import { Types } from "mongoose";
import { ErrorMessage } from "@/middlewares/error-message";
import { FileModel, NewFileDTO } from "./models/file.model";
import FilesRepository from "./files.repository";
import FoldersRespository from "../folders/folders.repository";

export default class FilesService {
  constructor(private filesRepository: FilesRepository, private foldersRepository: FoldersRespository) { }
  
  public async findAll(): Promise<any[]> {
    try {
      const response = await this.filesRepository.findAll();
      // const movies = response.map(x => MovieOutputDTO.toMovieOutputDTO(x));
      // const movies = response.map(x => MovieModel.toMovieModel(x));
      return response;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async findById(id: string): Promise<any> {
    try {
      const response = await this.filesRepository.findById(id);
      
      if (!response) {
        throw new ErrorMessage('Movie not found', 404);
      }

      // const movie = MovieOutputDTO.toMovieOutputDTO(response);
      // const movie = MovieModel.toMovieModel(response);
      return response;
    } catch (error) {
      throw error;
    }
  }

  public async findByFolderId(folderId: string): Promise<any> {
    try {
      const response = await this.filesRepository.findByFolderId(folderId);
      
      if (!response) {
        throw new ErrorMessage('Movie not found', 404);
      }

      return response;
    } catch (error) {
      throw error;
    }
  }

  public async save(file: NewFileDTO): Promise<FileModel> {
    try {
      const folderIdToSave = file.folderId;
      const newFile = await this.filesRepository.save(file);

      if (!newFile) {
        throw new Error('Error while saving new file');
      }

      await this.saveFileToFolder(folderIdToSave, newFile.toObject()._id);

      // const movie = MovieOutputDTO.toMovieOutputDTO(response);
      // const movie = MovieModel.toMovieModel(response);
      return newFile.toObject();
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const response = await this.filesRepository.delete(id);
      
      if (response.deletedCount <= 0) {
        throw new Error('Movie not found');
      }
      
      return true;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async update(model: any): Promise<any> {
    try {
      model._id = new Types.ObjectId(model.id);
      const response = await this.filesRepository.update(model);

      if (!response) {
        throw new Error('Movie not found');
      }

      // const movie = MovieOutputDTO.toMovieOutputDTO(response);
      // const movie = MovieModel.toMovieModel(response);
      return response;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async saveFileToFolder(_folderId: string, _fileId: string): Promise<any> {
    try {
      const folder = await this.foldersRepository.findById(_folderId);
      
      if (!folder) {
        throw new Error('Folder not found');
      }

      const folderObject = folder.toObject();
      folderObject.files?.push(_fileId);

      const updatedFolder = await this.foldersRepository.update(folderObject);
      console.log(updatedFolder);

      return updatedFolder;

    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }
}