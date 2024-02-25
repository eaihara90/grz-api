import mongoose from 'mongoose';

import config from '@/config/config';

const { db } = config;

export class DbConnection {
  private readonly client: any;

  constructor() {
    
  }

  public async connect(): Promise<void> {
    try {
      const url = `mongodb://${db.HOST}:${db.PORT}/${db.NAME}`;
      await mongoose.connect(url);
      console.log(`Connected to database ${db.NAME}`);
    } catch (error) {
      console.log(`Error while connecting to database ${db.NAME}`);
    }
  }
}

export default new DbConnection();