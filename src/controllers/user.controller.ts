import { get, param, requestBody } from '@loopback/rest';
import { UserRepository } from '../repositories';
import { repository } from '@loopback/repository';

let moment = require('moment');
let momentTz = require('moment-timezone');
moment.tz.setDefault("Asia/Tokyo");

export class UserController {
  constructor(@repository(UserRepository)
  private UserRepository: UserRepository, ) { }

  @get('/users') async getUsers(): Promise<Object> {
    return this.UserRepository.find()
  }
  @get('/addUser') async addUser(
    @param.query.string('name') name: string,
  ): Promise<Object> {

    const dateTimeNowTz = moment(new Date())
      .clone().tz('Asia/Tokyo')
      .format('YYYY-MM-DDTHH:mm:ss.SSZ');

    const createdUser = await this.UserRepository.create({
      name: name,
      dateAdded: dateTimeNowTz,
    });
    return {
      createdUser: createdUser,
      dateTimeNowTz: dateTimeNowTz
    }
  }
}
