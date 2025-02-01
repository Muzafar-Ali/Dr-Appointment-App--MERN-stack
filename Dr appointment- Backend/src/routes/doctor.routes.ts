import { Router } from "express";
import { getAllDoctorsHandler, getDoctorHandler } from "../controllers/doctor.controllers.js";

const route = Router();

route.get("/list", getAllDoctorsHandler);
route.get("/:id", getDoctorHandler);

export default route;