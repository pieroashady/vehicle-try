import express from 'express';
import 'express-async-errors';
import * as dotenv from 'dotenv';
import { db } from './src/models';
import { DatabaseError } from './src/errors/database-error';
import { UserAuthRouter } from './src/routes/user-auth';
import { errorHandler } from './src/middlewares/error-handler';
import { VehicleBrandRouter } from './src/routes/vehicle-brand';
import { VehicleTypeRouter } from './src/routes/vehicle-type';
import { NotFoundError } from './src/errors/not-found-error';
import { userAuth } from './src/middlewares/user-auth';
import { VehicleModelRouter } from './src/routes/vehicle-model';
import { VehicleYearRouter } from './src/routes/vehicle-year';
import { PricelistRouter } from './src/routes/pricelist';

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.json());

app.get('/', (req, res) => res.send('server is up'));
app.use('/auth', UserAuthRouter);
app.use('/vehicle-brand', userAuth, VehicleBrandRouter);
app.use('/vehicle-type', userAuth, VehicleTypeRouter);
app.use('/vehicle-model', userAuth, VehicleModelRouter);
app.use('/vehicle-year', userAuth, VehicleYearRouter);
app.use('/pricelist', userAuth, PricelistRouter);

app.all('*', async (req, res) => {
  throw new NotFoundError();
});

app.use(errorHandler);

db.sequelize
  .authenticate()
  .then(() => console.log('DB Connected..'))
  .catch(() => {
    throw new DatabaseError('Error connecting to db');
  });

app.listen(PORT, () => console.log(`Server listening on port ${PORT}`));
