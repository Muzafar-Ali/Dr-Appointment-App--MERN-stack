import { Request, Response, Router } from "express";
import { addDoctorHandler, loginAdminHandler, logoutAdminHandler } from "../controllers/admin.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createDoctorSchema } from "../schema/admin.schema.js";
import isAuthenticated from "../middlewares/isAuthenticated..middleware.js";
import authorizedRoles from "../middlewares/roleAuth.middleware.js";
import validateAndSanitizeData from "../middlewares/validateAndSanitizeData.middleware.js";

const route = Router();

route.post("/doctor", [upload.single('image'), validateAndSanitizeData(createDoctorSchema) ], addDoctorHandler)
route.post("/login", loginAdminHandler);
route.post("/logout", logoutAdminHandler);
route.get("/check",[isAuthenticated, authorizedRoles("doctor")], (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: "Admin is authenticated",
    user: req.user
  })
})

export default route;