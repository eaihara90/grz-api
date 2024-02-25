import { ErrorMessage } from "@/middlewares/error-message";
import FoldersRepository from "./folders.repository";
import { Types } from "mongoose";
import { FolderModel, FolderModelOutputDTO, NewFolderInputDTO } from "./models/folder.model";
import { FileModel } from "../files/models/file.model";
import FilesRepository from "../files/files.repository";

export default class FoldersService {
  constructor(private foldersRepository: FoldersRepository, private filesRepository: FilesRepository) { }
  
  public async findAll(): Promise<any[]> {
    try {
      const response = await this.foldersRepository.findAll();
      // const movies = response.map(x => MovieOutputDTO.toMovieOutputDTO(x));
      // const movies = response.map(x => MovieModel.toMovieModel(x));
      return response;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async findById(id: string): Promise<FolderModelOutputDTO> {
    try {
      const foundFolder = id !== 'root' ? await this.foldersRepository.findById(id) : await this.foldersRepository.findRootFolder();
      
      if (!foundFolder) {
        throw new ErrorMessage('Movie not found', 404);
      }

      const foundFolderObj: FolderModel = foundFolder.toObject();
      const folderOutputDTO = await this.createFolderOutputDTO(foundFolderObj);
      
      return folderOutputDTO;
    } catch (error) {
      throw error;
    }
  }

  public async save(folder: NewFolderInputDTO): Promise<any> {
    try {
      const parentFolderId: string = folder.parentFolderId;
      const response = await this.foldersRepository.save(folder);

      if (!response) {
        throw new Error('Movie not found');
      }

      await this.saveFolderToFolder(parentFolderId, response.toObject()._id);

      // const movie = MovieOutputDTO.toMovieOutputDTO(response);
      // const movie = MovieModel.toMovieModel(response);
      return response;
    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  public async delete(id: string): Promise<boolean> {
    try {
      const response = await this.foldersRepository.delete(id);
      
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
      const response = await this.foldersRepository.update(model);

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

  public async saveFolderToFolder(_parentFolderId: string, _folderId: string): Promise<any> {
    try {
      const parentFolder = await this.foldersRepository.findById(_parentFolderId);
      
      if (!parentFolder) {
        throw new Error('Folder not found');
      }

      const parentFolderObject = parentFolder.toObject();
      parentFolderObject.folders?.push(_folderId);

      const updatedFolder = await this.foldersRepository.update(parentFolderObject);
      console.log(updatedFolder);

      return updatedFolder;

    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  private async createFolderOutputDTO(folder: FolderModel): Promise<FolderModelOutputDTO> {
    const folderOutputDTO: FolderModelOutputDTO = {
      _id: folder._id,
      favorites: new Array<FileModel>(),
      title: folder.title,
      path: folder.path,
      folders: new Array<{ _id: string, title: string }>()
    };
    
    const foldersPromises = folder.folders.map(_folderId => this.foldersRepository.findById(_folderId, { _id: 1, title: 1 }));
    const foldersWithTitle = await Promise.all(foldersPromises);

    const filesPromises = folder.files.map(_fileId => this.filesRepository.findById(_fileId));
    const files = await Promise.all(filesPromises);
    
    foldersWithTitle.forEach(_folder => {
      const tempInnerFolderObj = _folder!.toObject();
      folderOutputDTO!.folders!.push({ _id: tempInnerFolderObj!._id, title: tempInnerFolderObj!.title });
    });

    files.forEach(_file => {
      const tempInnerFileObj: FileModel = _file!.toObject();
      folderOutputDTO!.favorites!.push(tempInnerFileObj);
    });

    return folderOutputDTO;
  }
}