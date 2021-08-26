import express from 'express';
import { UserController } from '../controllers/user-controller';
import { validateRequest } from '../middlewares/validate-request';
import AuthRules from '../validation/auth-rules';

const router = express.Router();

router.post('/signup', validateRequest(AuthRules.signUp), UserController.signUp);
router.post('/signin', validateRequest(AuthRules.signIn), UserController.signIn);

export { router as UserAuthRouter };
