import { createContainer, InjectionMode, asClass, asValue } from 'awilix';

import dbConnection from '@/db/db-connection';

import FoldersController from '@/modules/folders/folders.controller';
import FoldersService from '@/modules/folders/folders.service';
import FoldersRepository from '@/modules/folders/folders.repository';
import FilesController from '@/modules/files/files.controller';
import FilesService from '@/modules/files/files.service';
import FilesRepository from '@/modules/files/files.repository';

export const container = createContainer({
  injectionMode: InjectionMode.CLASSIC
})
.register({
  foldersController: asClass(FoldersController),
  foldersService: asClass(FoldersService),
  foldersRepository: asClass(FoldersRepository),
  filesController: asClass(FilesController),
  filesService: asClass(FilesService),
  filesRepository: asClass(FilesRepository),
  db: asValue(dbConnection)
});
