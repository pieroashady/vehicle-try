import express from 'express';
import { VehicleBrandController } from '../controllers/vehicle-brand-controller';
import { adminAuth } from '../middlewares/admin-auth';
import { validateRequest } from '../middlewares/validate-request';
import { VehicleBrandRules } from '../validation/vehicle-brand-rules';

const router = express.Router();

router.get('/', VehicleBrandController.show);
router.get('/eager-load', VehicleBrandController.showWithEagerLoad);
router.get('/:id', VehicleBrandController.showById);
router.get('/:id/eager-load', VehicleBrandController.showByIdWithEagerLoad);
router.post('/', adminAuth, validateRequest(VehicleBrandRules.create), VehicleBrandController.create);
router.put('/:id', adminAuth, validateRequest(VehicleBrandRules.update), VehicleBrandController.update);
router.delete('/:id', adminAuth, VehicleBrandController.delete);

export { router as VehicleBrandRouter };
