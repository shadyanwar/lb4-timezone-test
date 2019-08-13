import { DefaultCrudRepository } from '@loopback/repository';
import { User, UserRelations } from '../models';
import { Lb4TimezoneDataSource } from '../datasources';
import { inject } from '@loopback/core';

export class UserRepository extends DefaultCrudRepository<
  User,
  typeof User.prototype.id,
  UserRelations
  > {
  constructor(
    @inject('datasources.Lb4Timezone') dataSource: Lb4TimezoneDataSource,
  ) {
    super(User, dataSource);
  }
}
