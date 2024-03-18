import { ErrorMessage } from "@/middlewares/error-message";
import FoldersRepository from "./folders.repository";
import { ObjectId, Types } from "mongoose";
import { FolderModel, FolderModelInnerFolder, FolderModelOutputDTO, NewFolderInputDTO } from "./models/folder.model";
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
      const folderOutputDTO = await this.createFolderOutputDTO(foundFolder);
      
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

  public async delete(_id: string): Promise<boolean> {
    try {
      const foundFolder = await this.foldersRepository.findById(_id);
      const response = await this.foldersRepository.delete(_id);
      
      if (response.deletedCount <= 0) {
        throw new Error('Movie not found');
      }
      

      await this.removeFolderFromParentFolder(_id, foundFolder!.parentFolderId);
      
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

      parentFolder.folders?.push(_folderId);

      const updatedFolder = await this.foldersRepository.update(parentFolder);

      return updatedFolder;

    } catch (error) {
      throw new Error("Method not implemented.");
    }
  }

  private async removeFolderFromParentFolder(_folderId: string, _parentFolderId: string): Promise<any> {
    try {
      const parentFolder = await this.foldersRepository.findById(_parentFolderId);

      const filteredFolders = parentFolder?.folders.filter(x => {
        if (x.toString() !== _folderId) {
          return x;
        }
      });
      parentFolder!.folders = [...filteredFolders as Types.ObjectId[]];

      await this.foldersRepository.update(parentFolder);

    } catch (error) {
      throw new Error('Error while removing folder from parent');
    }
  }

  private async createFolderOutputDTO(folder: FolderModel): Promise<FolderModelOutputDTO> {
    const folderOutputDTO: FolderModelOutputDTO = {
      _id: folder._id,
      favorites: new Array<FileModel>(),
      title: folder.title,
      path: folder.path,
      folders: new Array<FolderModelInnerFolder>(),
      parentFolderId: folder?.parentFolderId || ''
    };
    
    const foldersPromises = folder.folders.map(_folderId => this.foldersRepository.findById(_folderId, { _id: 1, title: 1 }));
    const foldersWithTitle = await Promise.all(foldersPromises);

    const filesPromises = folder.files.map(_fileId => this.filesRepository.findById(_fileId));
    const files = await Promise.all(filesPromises);
    
    foldersWithTitle.forEach(_folder => {
      const tempInnerFolderObj = _folder;
      folderOutputDTO!.folders!.push({
        _id: tempInnerFolderObj!._id,
        title: tempInnerFolderObj!.title,
        parentFolderInfo: {
          _id: folder._id || '',
          title: folder.title || ''
        }
      });
    });

    files.forEach(_file => {
      const tempInnerFileObj: FileModel = _file!.toObject();
      folderOutputDTO!.favorites!.push(tempInnerFileObj);
    });

    return folderOutputDTO;
  }
}