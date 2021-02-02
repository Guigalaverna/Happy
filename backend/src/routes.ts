import { Router } from "express";
import multer from "multer";

import uploadConfig from "./config/upload";

import OrphanagesController from "./controllers/OrphanagesController";
import UserController from "./controllers/UserController";
import User from "./models/User";

const routes = Router();
const upload = multer(uploadConfig);

routes.get("/orphanages", OrphanagesController.index);
routes.get("/orphanages/:id", OrphanagesController.show);
routes.post("/orphanages", upload.array("images"), OrphanagesController.create);

routes.get("/users", UserController.index);
routes.get("/users/:id", UserController.show);
routes.post("/users", UserController.create);

export default routes;
