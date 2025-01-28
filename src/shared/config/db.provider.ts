import * as mongoose from 'mongoose';

export const databaseProviders = [
  {
    provide: JSON.stringify(process.env.DB_PROVIDER),
    useFactory: (): Promise<typeof mongoose> =>
      mongoose.connect(JSON.stringify(process.env.DB_URL)).then((instance) => {
        instance.connection.on('open', () => {
            console.log('Database connection succeeded');
        });
        instance.connection.on('error', (error) => {
          console.error('Database connection error:', error);
        });
        return instance;
      }),
  },
];