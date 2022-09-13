import request from 'supertest';
import App from '@/app';
import { CreateAcronymDto } from '@dtos/acronym.dto';
import { Acronym } from '@interfaces/acronym.interface';
import acronymModel from '@models/acronym.model';
import AcronymRoute from '@routes/acronym.route';
import AcronymService from '@services/acronym.service';
import { convertToObject } from '@/utils/acronym';

// describe('Testing Acronym Controller', () => {
//   describe('[GET] /acronym', () => {
//     it('response status 200, return all acronyms', () => {
//       const allData: Acronym[] = acronymModel;
//       const acronymRoute = new AcronymRoute();
//       const app = new App([acronymRoute]);

//       return request(app.getServer())
//         .get(`${acronymRoute.path}`)
//         .expect(200, {
//           data: convertToObject(allData),
//           message: 'find',
//         });
//     });
//   });

//   describe('[GET] /acronym?from=5&limit=5&search=0', () => {
//     it('response status 200, return 5 acronyms', () => {
//       const allData: Acronym[] = acronymModel;
//       const acronymRoute = new AcronymRoute();
//       const app = new App([acronymRoute]);
//       const from = 5;
//       const limit = 5;
//       const search = '0';

//       const expectData: Acronym[] = allData
//         .filter(ele => ele.acronym.includes('0'))
//         .slice(from, from + limit);

//       return request(app.getServer())
//         .get(
//           `${acronymRoute.path}?from=${from}&limit=${limit}&search=${search}`,
//         )
//         .expect(200, {
//           data: convertToObject(expectData),
//           message: 'find',
//         });
//     });
//   });

//   describe('[POST] /acronym', () => {
//     it('reponse status 201, created', async () => {
//       const newData: CreateAcronymDto = {
//         acronym: 'KCU',
//         definition: 'Kong Children Union',
//       };
//       const acronymRoute = new AcronymRoute();
//       const app = new App([acronymRoute]);

//       await request(app.getServer())
//         .post(`${acronymRoute.path}`)
//         .send(newData)
//         .expect(201);

//       await request(app.getServer())
//         .delete(
//           `${acronymRoute.path}/${newData.acronym}`,
//         )
//         .expect(200);
//     });
//   });

//   describe('[PUT] /acronym/:acronym', () => {
//     it('response status 200, update', async () => {
//       const newData: CreateAcronymDto = {
//         acronym: 'UCK',
//         definition: 'Kong Children Union',
//       };
//       const acronymRoute = new AcronymRoute();
//       const app = new App([acronymRoute]);

//       await request(app.getServer())
//         .post(`${acronymRoute.path}`)
//         .send(newData)
//         .expect(201);

//       newData.definition = 'Kim Chol Un';

//       await request(app.getServer())
//         .put(
//           `${acronymRoute.path}/${newData.acronym}`,
//         )
//         .send(newData)
//         .expect(200, {
//           data: convertToObject([newData]),
//           message: 'updated',
//         });

//       await request(app.getServer())
//         .delete(
//           `${acronymRoute.path}/${newData.acronym}`,
//         )
//         .expect(200);
//     });
//   });

//   describe('[DELETE] /acronym/:acronym', () => {
//     it('response status 200, deleted', async () => {
//       const newData: CreateAcronymDto = {
//         acronym: 'KCU',
//         definition: 'Kong Children Union',
//       };
//       const acronymRoute = new AcronymRoute();
//       const app = new App([acronymRoute]);

//       await request(app.getServer())
//         .post(`${acronymRoute.path}`)
//         .send(newData)
//         .expect(201);

//       await request(app.getServer())
//         .delete(
//           `${acronymRoute.path}/${newData.acronym}`,
//         )
//         .expect(200);
//     });
//   });
// });

describe('Testing Acronym Service', () => {
  describe('Search Acronym', () => {
    it('Should return right acronyms', async () => {
      const acronymService = new AcronymService();
      const allData: Acronym[] = acronymModel;
      const from = 5;
      const limit = 5;
      const search = '0';

      const expectData: Acronym[] = allData
        .filter(ele => ele.acronym.includes(search))
        .slice(from, from + limit);

      console.log(
        await acronymService.searchAcronym(from, limit, search),
      );
    });
  });
});
