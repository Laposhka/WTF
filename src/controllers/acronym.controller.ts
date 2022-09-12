import { NextFunction, Request, Response } from 'express';
import { CreateAcronymDto } from '@dtos/acronym.dto';
import { Acronym } from '@interfaces/acronym.interface';
import AcronymService from '@services/acronym.service';
import { readFileSync, writeFileSync } from 'fs';
import { DB_FILE_URL } from '@/config';
import { convertToObject } from '@/utils/acronym';

class AcronymController {
  public acronymService = new AcronymService();

  private updateDB = async () => {
    const results: Object[] = convertToObject(this.acronymService.allData)
    writeFileSync(DB_FILE_URL, JSON.stringify(results))
  }

  public searchAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    let from: number = 0;
    let limit: number = this.acronymService.allData.length
    let search = ''

    if (req.query.from)
      from = Number(req.query.from)
    if (req.query.limit)
      limit = Number(req.query.limit)
    if (req.query.search)
      search = String(req.query.search)
    
    try {
      const findAcronyms: Acronym[] = await this.acronymService.searchAcronym(from, limit, search)

      this.updateDB()
      res.status(200).json({data: convertToObject(findAcronyms), message: 'find'})
    } catch (error) {
      next(error)
    }
  }

  public createAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const acronymData: CreateAcronymDto = req.body;
      const createAcronymData: Acronym = await this.acronymService.createAcronym(acronymData);

      this.updateDB()
      res.status(201).json({ data: convertToObject([createAcronymData]), message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { acronym } = req.params;
      const { definition } = req.body;
      const updateAcronymData: Acronym[] = await this.acronymService.updateAcronym(acronym, definition);

      this.updateDB()
      res.status(200).json({ data: convertToObject(updateAcronymData), message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteAcronym = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { acronym } = req.params;
      const deleteAcronymData: Acronym[] = await this.acronymService.deleteAcronym(acronym);
      
      this.updateDB()
      res.status(200).json({ data: convertToObject(deleteAcronymData), message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default AcronymController;
