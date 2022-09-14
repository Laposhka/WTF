import { Router } from 'express';
import AcronymController from '@controllers/acronym.controller';
import { CreateAcronymDto } from '@dtos/acronym.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';

class AcronymRoute implements Routes {
  public path = '/acronym';
  public router = Router();
  public acronymController = new AcronymController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(
      `${this.path}`,
      this.acronymController.searchAcronym,
    );
    this.router.post(
      `${this.path}`,
      validationMiddleware(CreateAcronymDto, 'body'),
      this.acronymController.createAcronym,
    );
    this.router.put(
      `${this.path}/:acronym`,
      this.acronymController.updateAcronym,
    );
    this.router.delete(
      `${this.path}/:acronym`,
      this.acronymController.deleteAcronym,
    );
  }
}

export default AcronymRoute;
