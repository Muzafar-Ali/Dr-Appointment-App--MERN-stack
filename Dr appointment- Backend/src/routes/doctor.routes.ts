import { Router } from "express";
import { listOfDoctors } from "../controllers/doctor.controllers.js";

const route = Router();

route.get("/list", listOfDoctors);

export default route;