import { Acronym } from 'interfaces/acronym.interface';
import { HttpException } from '@exceptions/HttpException';
import acronymModel from '@models/acronym.model';
import { isEmpty } from '@utils/util';

class AcronymService {
  public allData: Array<Acronym> = acronymModel;

  public async getAllData(): Promise<Acronym[]> {
    const acronyms: Acronym[] = this.allData;
    return acronyms;
  }

  public async searchAcronym(
    from: number,
    limit: number,
    search: string,
  ) {
    console.log(from, limit, search);
    const findAcronyms: Array<Acronym> =
      this.allData
        .filter(element =>
          element.acronym.includes(search),
        )
        .slice(from, from + limit);

    console.log(findAcronyms);
    return findAcronyms;
  }

  public async createAcronym(
    newData: Acronym,
  ): Promise<Acronym> {
    if (isEmpty(newData))
      throw new HttpException(
        400,
        'newData is empty',
      );

    const findAcronym: Acronym =
      this.allData.find(
        element =>
          element.acronym === newData.acronym,
      );
    if (findAcronym)
      throw new HttpException(
        409,
        `This acronym ${newData.acronym} already exists`,
      );

    this.allData = [...this.allData, newData];

    return newData;
  }

  public async updateAcronym(
    acronym: string,
    definition: string,
  ): Promise<Acronym[]> {
    if (isEmpty(definition))
      throw new HttpException(
        400,
        'newData is empty',
      );

    const findAcronym: Acronym =
      this.allData.find(
        element => element.acronym === acronym,
      );
    if (!findAcronym)
      throw new HttpException(
        409,
        `This acronym ${acronym} doesn't exist`,
      );

    const toUpdate: Acronym[] =
      this.allData.filter(
        (ele: Acronym) => ele.acronym === acronym,
      );

    const updatedAcronyms: Acronym[] =
      toUpdate.map(ele => {
        ele.definition = definition;
        return ele;
      });

    return updatedAcronyms;
  }

  public async deleteAcronym(
    acronym: string,
  ): Promise<Acronym[]> {
    const findAcronym: Acronym =
      this.allData.find(
        element => element.acronym === acronym,
      );
    if (!findAcronym)
      throw new HttpException(
        409,
        `This acronym ${acronym} doesn't exist`,
      );

    const deleteAcronymData: Acronym[] =
      this.allData.filter(
        element => element.acronym !== acronym,
      );
    return deleteAcronymData;
  }
}

export default AcronymService;
