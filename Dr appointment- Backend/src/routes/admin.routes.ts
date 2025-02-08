import { Request, Response, Router } from "express";
import { addDoctorHandler, getAllDoctorsHAndler, adminLoginHandler, adminLogoutHandler, getAllAppointmentsAdminHandler, cancelAppointmentAdminHandler, adminDashboardHandler } from "../controllers/admin.controllers.js";
import { upload } from "../middlewares/multer.middleware.js";
import { createDoctorSchema } from "../schema/admin.schema.js";
import isAuthenticated from "../middlewares/isAuthenticated..middleware.js";
import authorizedRoles from "../middlewares/roleAuth.middleware.js";
import validateAndSanitizeData from "../middlewares/validateAndSanitizeData.middleware.js";
import { updateAvailability } from "../controllers/doctor.controllers.js";
import isAdminAuthenticated from "../middlewares/isAdminAuthenticated.middleware.js";

const route = Router();

route.post("/doctor", [upload.single('image'), validateAndSanitizeData(createDoctorSchema), isAuthenticated], addDoctorHandler);
route.get("/doctors", [isAdminAuthenticated, authorizedRoles("admin")], getAllDoctorsHAndler);
route.patch("/doctors", [isAdminAuthenticated, authorizedRoles("admin")], updateAvailability);
route.post("/login", adminLoginHandler);
route.post("/logout", adminLogoutHandler);
route.get("/appointments", [isAdminAuthenticated, authorizedRoles("admin")], getAllAppointmentsAdminHandler)
route.patch("/appointments/cancel", [isAdminAuthenticated, authorizedRoles("admin")], cancelAppointmentAdminHandler)
route.get("/dashboard", [isAdminAuthenticated, authorizedRoles("admin")], adminDashboardHandler)

export default route;