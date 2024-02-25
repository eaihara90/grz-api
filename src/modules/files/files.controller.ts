import { Request, Response } from 'express';
import { route, GET, POST, DELETE, PUT } from 'awilix-express';
import FilesService from './files.service';

@route('/files')
export default class FilesController {
  constructor(private filesService: FilesService) { }

  @route('')
  @GET()
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const files = await this.filesService.findAll();
      res.status(200).json({ files });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @route('/:id')
  @GET()
  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const file = await this.filesService.findById(req.params.id);
      res.status(200).json({ file });
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).send(error.message);
        return;
      }

      res.status(500).send(error);
    }
  }

  @route('/folder/:folderId')
  @GET()
  public async getFilesByFolderId(req: Request, res: Response): Promise<void> {
    try {
      const files = await this.filesService.findByFolderId(req.params.folderId);
      res.status(200).json({ files });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @route('')
  @POST()
  public async save(req: Request, res: Response): Promise<void> {
    try {
      const file = await this.filesService.save(req.body);
      res.status(200).json({ file });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @route('/:id')
  @DELETE()
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.filesService.delete(req.params.id);
      res.status(200).json({ deleted });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @route('')
  @PUT()
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const file = await this.filesService.update(req.body);
      res.status(200).json({ file });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }
}