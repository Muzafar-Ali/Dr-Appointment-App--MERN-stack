import { Request, Response, Router } from "express";
import { addDoctorHandler, loginAdminHandler } from "../controllers/admin.controllers.js";
import { upload } from "../middlewares/multer.js";
import validateRequest from "../middlewares/validateRequest.js";
import { createDoctorSchema } from "../schema/admin.schema.js";
import isAuthenticated from "../middlewares/isAuthenticated..middleware.js";
import authorizedRoles from "../middlewares/roleAuth.middleware.js";

const route = Router();

route.post("/doctor", [validateRequest(createDoctorSchema), upload.single('image')], addDoctorHandler)
route.post("/login", loginAdminHandler);
route.get("/check",[isAuthenticated, authorizedRoles("doctor")], (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Admin is authenticated",
    user: req.user
  })
})

export default route;