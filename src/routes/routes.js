import express from "express";
import jwtAuth from "../middleware/jwtAuth.js";
import validate from "../validators/validator.js";

import authController from "../controllers/authController.js";
import eventsController from "../controllers/eventsController.js";
import birdsController from "../controllers/birdsController.js";
import registrationsController from "../controllers/registrationsController.js";
import userController from "../controllers/userController.js";

import { createEventSchema, updateEventSchema } from "../validators/eventsValidator.js";
import { createBirdSchema, updateBirdSchema } from "../validators/birdsValidator.js";
import { createRegistrationSchema, updateRegistrationSchema } from "../validators/registrationsValidator.js";
import userValidator from "../validators/userValidator.js";

const router = express.Router();

// Auth
router.post("/login", authController.login);

// Events
router.get("/events", eventsController.getAll);
router.get("/events/:id", eventsController.getById);
router.post("/events", jwtAuth, validate(createEventSchema), eventsController.create);
router.put("/events/:id", jwtAuth, validate(updateEventSchema), eventsController.update);
router.delete("/events/:id", jwtAuth, eventsController.destroy);

// Birds
router.get("/birds", birdsController.getAll);
router.get("/birds/:id", birdsController.getById);
router.post("/birds", jwtAuth, validate(createBirdSchema), birdsController.create);
router.put("/birds/:id", jwtAuth, validate(updateBirdSchema), birdsController.update);
router.delete("/birds/:id", jwtAuth, birdsController.destroy);

// Registrations
router.get("/registrations",  registrationsController.getAll);
router.get("/registrations/:id", registrationsController.getById);
router.post("/registrations", jwtAuth, validate(createRegistrationSchema), registrationsController.create);
router.put("/registrations/:id", jwtAuth, validate(updateRegistrationSchema), registrationsController.update);
router.delete("/registrations/:id", jwtAuth, registrationsController.destroy);

// Users
router.get("/users", jwtAuth, userController.getAllUsers);
router.get("/users/:id", jwtAuth, userController.getUserById);
router.post("/users", jwtAuth, validate(userValidator.createValidation), userController.createUser);
router.put("/users/:id", jwtAuth, validate(userValidator.updateValidation), userController.updateUser);
router.delete("/users/:id", jwtAuth, userController.deleteUser);

export default router;