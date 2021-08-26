import express, { Request, Response } from 'express';
import { Op } from 'sequelize';
import { VehicleTypeController } from '../controllers/vehicle-type-controller';
import { BadRequestError } from '../errors/bad-request-error';
import { adminAuth } from '../middlewares/admin-auth';
import { validateRequest } from '../middlewares/validate-request';
import { VehicleType } from '../models/vehicletype';
import { VehicleTypeRules } from '../validation/vehicle-type-rules';

const router = express.Router();

router.get('/', VehicleTypeController.show);
router.get('/:id', VehicleTypeController.showById);
router.post('/', adminAuth, validateRequest(VehicleTypeRules.create), VehicleTypeController.create);
router.put('/:id', adminAuth, validateRequest(VehicleTypeRules.update), VehicleTypeController.update);
router.delete('/:id', adminAuth, VehicleTypeController.delete);

export { router as VehicleTypeRouter };
