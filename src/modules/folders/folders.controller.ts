import { Request, Response } from 'express';
import { route, GET, POST, DELETE, PUT } from 'awilix-express';
import FoldersService from './folders.service';

@route('/folders')
export default class FoldersController {
  constructor(private foldersService: FoldersService) { }

  @route('')
  @GET()
  public async getAll(req: Request, res: Response): Promise<void> {
    try {
      const folders = await this.foldersService.findAll();
      res.status(200).json({ folders });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @route('/:id')
  @GET()
  public async getById(req: Request, res: Response): Promise<void> {
    try {
      const folder = await this.foldersService.findById(req.params.id);
      res.status(200).json({ folder });
    } catch (error: any) {
      if (error.status && error.message) {
        res.status(error.status).send(error.message);
        return;
      }

      res.status(500).send(error);
    }
  }

  @route('')
  @POST()
  public async save(req: Request, res: Response): Promise<void> {
    try {
      const folder = await this.foldersService.save(req.body);
      res.status(200).json({ folder });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @route('/:id')
  @DELETE()
  public async delete(req: Request, res: Response): Promise<void> {
    try {
      const deleted = await this.foldersService.delete(req.params.id);
      res.status(200).json({ deleted });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }

  @route('')
  @PUT()
  public async update(req: Request, res: Response): Promise<void> {
    try {
      const folder = await this.foldersService.update(req.body);
      res.status(200).json({ folder });
    } catch (error) {
      res.status(500).send('Internal server error');
    }
  }
}