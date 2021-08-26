import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import { PricelistController } from '../controllers/pricelist-controller';
import { BadRequestError } from '../errors/bad-request-error';
import { adminAuth } from '../middlewares/admin-auth';
import { validateRequest } from '../middlewares/validate-request';
import { Pricelist } from '../models/pricelist';
import { VehicleModel } from '../models/vehiclemodel';
import { VehicleYear } from '../models/vehicleyear';
import { PricelistRules } from '../validation/pricelist-rules';

const router = express.Router();

router.get('/', PricelistController.show);
router.get('/:id', PricelistController.showById);
router.post('/', adminAuth, validateRequest(PricelistRules.create), PricelistController.create);
router.put('/:id', adminAuth, validateRequest(PricelistRules.update), PricelistController.update);
router.delete('/:id', adminAuth, PricelistController.delete);

export { router as PricelistRouter };
