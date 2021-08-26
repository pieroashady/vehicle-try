import express from 'express';
import { VehicleYearController } from '../controllers/vehicle-year-controller';
import { adminAuth } from '../middlewares/admin-auth';
import { validateRequest } from '../middlewares/validate-request';
import { VehicleYearRules } from '../validation/vehicle-year-rules';

const router = express.Router();

router.get('/', VehicleYearController.show);
router.get('/:id', VehicleYearController.showById);
router.post('/', adminAuth, validateRequest(VehicleYearRules.create), VehicleYearController.create);
router.put('/:id', adminAuth, validateRequest(VehicleYearRules.update), VehicleYearController.update);
router.delete('/:id', adminAuth, VehicleYearController.delete);

export { router as VehicleYearRouter };
