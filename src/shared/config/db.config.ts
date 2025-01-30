import { MongooseModule } from '@nestjs/mongoose';
import { Connection } from 'mongoose';
import { Logger } from '@nestjs/common';

export const MongoDBConfig = MongooseModule.forRootAsync({
  useFactory: () => ({
    uri: process.env.DB_URL || 'mongodb://localhost:27017/defaultDb',
    connectionFactory: (connection: Connection) => {
      if (connection.readyState === 1) {
        console.log('✅ Successfully connected to MongoDB', 'Database');
      }
      connection.on('connected', () => {
        console.log('✅ MongoDB connection established', 'Database');
      });
      connection.on('error', (err) => {
        console.error('❌ MongoDB connection error: ' + err, '', 'Database');
      });
      return connection;
    },
  }),
});