import express,{Router} from "express"

import { validateSchema } from "../middlewares/validation.js"
import { registerSchema } from "../validations/auth.js"
import { register } from "../controllers/auth.js"

const router:Router = express.Router()

router.post("/register",validateSchema(registerSchema),register)


export default router