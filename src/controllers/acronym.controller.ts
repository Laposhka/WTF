import { NextFunction, Request, Response } from 'express';
import { CreateAcronymDto } from '@dtos/acronym.dto';
import { IAcronym } from '@interfaces/acronym.interface';
import AcronymService from '@services/acronym.service';
import { readFileSync, writeFileSync } from 'fs';
import { DB_FILE_URL } from '@/config';
import { convertToObject } from '@/utils/acronym';

class AcronymController {
  public acronymService = new AcronymService();

  public searchAcronym = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    let from = 0;
    let limit: number = (await this.acronymService.getAllData())
      .length;
    let search = '';

    if (req.query.from) from = Number(req.query.from);
    if (req.query.limit) limit = Number(req.query.limit);
    if (req.query.search) search = String(req.query.search);

    try {
      const findAcronyms: IAcronym[] =
        await this.acronymService.searchAcronym(from, limit, search);

      res.status(200).json({
        data: convertToObject(findAcronyms),
        message: 'find',
      });
    } catch (error) {
      next(error);
    }
  };

  public createAcronym = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const acronymData: IAcronym = req.body;
      console.log(acronymData);
      const createAcronymData: IAcronym =
        await this.acronymService.createAcronym(acronymData);

      res.status(201).json({
        data: convertToObject([createAcronymData]),
        message: 'created',
      });
    } catch (error) {
      next(error);
    }
  };

  public updateAcronym = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { acronym } = req.params;
      const { definition } = req.body;
      const updateAcronymData: IAcronym[] =
        await this.acronymService.updateAcronym(acronym, definition);

      res.status(200).json({
        data: convertToObject(updateAcronymData),
        message: 'updated',
      });
    } catch (error) {
      next(error);
    }
  };

  public deleteAcronym = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<void> => {
    try {
      const { acronym } = req.params;
      const deleteAcronymData: IAcronym[] =
        await this.acronymService.deleteAcronym(acronym);

      res.status(200).json({
        data: convertToObject(deleteAcronymData),
        message: 'deleted',
      });
    } catch (error) {
      next(error);
    }
  };
}

export default AcronymController;
