import { baseRouter, baseValidation } from "../../../vzy-shared/api";
import { AuthController } from "../controllers";
import authValidation from '../validations'

const { POST, router } = baseRouter();


POST('/register', [baseValidation(authValidation.signupUser), AuthController.signUpUser]);
POST('/login', [baseValidation(authValidation.signinUser), AuthController.signInUser]);

export default router;
