import { get, param, requestBody } from '@loopback/rest';
import { UserRepository } from '../repositories';
import { repository } from '@loopback/repository';

let moment = require('moment');
let momentTz = require('moment-timezone');
moment.tz.setDefault("Asia/Tokyo");

export class UserController {
  constructor(@repository(UserRepository)
  private UserRepository: UserRepository, ) { }

  @get('/users/{id}') async getUserById(@param.path.number('id') id: number): Promise<Object> {
    let result = await this.UserRepository.findById(id);
    let newResult = {
      id: result.id,
      name: result.name,
      dateAdded: moment(result.dateAdded).format('YYYY-MM-DDTHH:mm:ss.SSZ'),
      // dateAdded: result.dateAdded.toLocaleDateString()
      //             + ' '
      //             + result.dateAdded.toLocaleTimeString(),
    }

    return newResult;
  }

  @get('/users') async getUsers(): Promise<Object> {
    return await this.UserRepository.find()
  }
  @get('/addUser') async addUser(
    @param.query.string('name') name: string,
  ): Promise<Object> {

    const dateTimeNowTz = moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSZ');
    // const dateTimeNowTz = new Date().toLocaleDateString()
    //                       + ' '
    //                       + new Date().toLocaleTimeString();

    const createdUser = await this.UserRepository.create({
      name: name,
      dateAdded: moment(new Date()).format('YYYY-MM-DDTHH:mm:ss.SSZ'),
      // dateAdded: new Date().toLocaleDateString()
      //             + ' '
      //             + new Date().toLocaleTimeString(),
    });
    return {
      createdUser: createdUser,
      dateTimeNowTz: dateTimeNowTz
    }
  }
}
