import { Router } from "express";
import { bookAppointmentHandler, cancelAppointmentHandler, getMyAppointmentsHandler, getUserProfileHandler, registerUserHandler, updateUserProfileHandler, userLoginHandler, userLogoutHandler } from "../controllers/user.controllers.js";
import { adminLoginSchema } from "../schema/admin.schema.js";
import validateAndSanitizeData from "../middlewares/validateAndSanitizeData.middleware.js";
import { registerUserSchema, updateUserPrifleSchema } from "../schema/user.schema.js";
import { upload } from "../middlewares/multer.middleware.js";
import isAuthenticated from "../middlewares/isAuthenticated..middleware.js";

const route = Router();

route.post("/register", upload.single('image'), validateAndSanitizeData(registerUserSchema), registerUserHandler)
route.post("/login", validateAndSanitizeData(adminLoginSchema), userLoginHandler)
route.post("/logout", userLogoutHandler)
route.get("/profile", isAuthenticated, getUserProfileHandler)
route.patch("/profile", isAuthenticated, upload.single('image'), validateAndSanitizeData(updateUserPrifleSchema), updateUserProfileHandler)
route.post("/appointment", isAuthenticated, bookAppointmentHandler)
route.get("/appointment", isAuthenticated, getMyAppointmentsHandler)
route.post("/appointment/cancel", isAuthenticated, cancelAppointmentHandler)

export default route;