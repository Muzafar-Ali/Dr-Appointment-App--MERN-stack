import { Router } from "express";
import { completeAppointmentHandler, doctorAppointmentsHandler, doctorDashboardHandler, doctorLoginHandler, doctorLogoutHandler, doctorProfileHandler, getAllDoctorsHandler, getDoctorHandler } from "../controllers/doctor.controllers.js";
import isDoctorAuthenticated from "../middlewares/iasDoctorAuthenticated.middleware.js";

const route = Router();

route.get("/list", getAllDoctorsHandler);
route.get("/appointments", isDoctorAuthenticated, doctorAppointmentsHandler)
route.patch("/appointments/complete", isDoctorAuthenticated, completeAppointmentHandler)
route.post("/login", doctorLoginHandler);
route.post("/logout", doctorLogoutHandler);
route.get("/dashboard", isDoctorAuthenticated, doctorDashboardHandler)
route.get("/profile", isDoctorAuthenticated, doctorProfileHandler)
route.get("/:id", getDoctorHandler);

export default route;