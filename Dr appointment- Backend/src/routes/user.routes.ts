import { Router } from "express";
import { userLoginHandler } from "../controllers/user.controllers.js";
import validateRequest from "../middlewares/validateAndSanitizeData.middleware.js";
import { AdminLoginSchema } from "../schema/admin.schema.js";

const route = Router();

route.post("/login", validateRequest(AdminLoginSchema), userLoginHandler)

export default route;