import express from 'express';
import { VehicleModelController } from '../controllers/vehicle-model-controller';
import { adminAuth } from '../middlewares/admin-auth';
import { validateRequest } from '../middlewares/validate-request';
import { VehicleModelRules } from '../validation/vehicle-model-rules';

const router = express.Router();

router.get('/', VehicleModelController.show);
router.get('/:id', VehicleModelController.showById);
router.post('/', adminAuth, validateRequest(VehicleModelRules.create), VehicleModelController.create);
router.put('/:id', adminAuth, validateRequest(VehicleModelRules.update), VehicleModelController.update);
router.delete('/:id', adminAuth, VehicleModelController.delete);

export { router as VehicleModelRouter };
