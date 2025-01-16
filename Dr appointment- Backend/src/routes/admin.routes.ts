import { Router } from "express";
import { addDoctorHandler } from "../controllers/admin.controllers.js";
import { upload } from "../middlewares/multer.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createDoctorSchema } from "../schema/admin.schema.js";

const route = Router();

route.post("/doctor", [validateRequest(createDoctorSchema), upload.single('image')], addDoctorHandler)

export default route;