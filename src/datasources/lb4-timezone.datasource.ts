import { inject } from '@loopback/core';
import { juggler } from '@loopback/repository';
import * as config from './lb4-timezone.datasource.json';

export class Lb4TimezoneDataSource extends juggler.DataSource {
  static dataSourceName = 'Lb4Timezone';

  constructor(
    @inject('datasources.config.Lb4Timezone', { optional: true })
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
