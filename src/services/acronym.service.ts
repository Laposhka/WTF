import { IAcronym } from 'interfaces/acronym.interface';
import { HttpException } from '@exceptions/HttpException';
import AcronymModel from '@/models/acronym.model';
import { isEmpty } from '@utils/util';

class AcronymService {
  public async getAllData(): Promise<IAcronym[]> {
    const docs: IAcronym[] = await AcronymModel.find();
    return docs;
  }

  public async searchAcronym(
    from: number,
    limit: number,
    search: string,
  ) {
    console.log(from, limit, search);

    let findAcronyms: IAcronym[] = await AcronymModel.find({
      acronym: {
        $regex: new RegExp(`${search}`),
      },
    });

    findAcronyms = [...findAcronyms.slice(from, from + limit)];
    console.log(findAcronyms.length);

    return findAcronyms;
  }

  public async createAcronym(newData: IAcronym): Promise<IAcronym> {
    if (isEmpty(newData))
      throw new HttpException(400, 'newData is empty');

    const findAcronym: IAcronym = await AcronymModel.findOne({
      acronym: newData.acronym,
    });
    if (findAcronym) {
      throw new HttpException(
        409,
        `This acronym ${newData.acronym} already exists`,
      );
    }

    const newAcronym = new AcronymModel(newData);
    await newAcronym.save();
    return newData;
  }

  public async updateAcronym(
    acronym: string,
    definition: string,
  ): Promise<IAcronym[]> {
    if (isEmpty(definition)) {
      throw new HttpException(400, 'newData is empty');
    }

    console.log('found', acronym);

    const findAcronyms = await AcronymModel.find({
      acronym: acronym,
    });
    if (findAcronyms.length == 0) {
      throw new HttpException(
        409,
        `This acronym ${acronym} doesn't exist`,
      );
    }

    findAcronyms.forEach(ele => {
      ele.definition = definition;
    });

    await AcronymModel.updateMany(
      {
        acronym: acronym,
      },
      {
        definition: definition,
      },
    );
    return findAcronyms;
  }

  public async deleteAcronym(acronym: string): Promise<IAcronym[]> {
    const findAcronyms = await AcronymModel.find({
      acronym: acronym,
    });
    if (findAcronyms.length == 0) {
      throw new HttpException(
        409,
        `This acronym ${acronym} doesn't exist`,
      );
    }

    await AcronymModel.deleteMany({
      acronym: acronym,
    });

    return findAcronyms;
  }
}

export default AcronymService;
