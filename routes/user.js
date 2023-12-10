import express from "express";
import userController from "#controllers/user";
import authenticateToken from "#middleware/authenticateToken";

const router = express.Router();

router.post("/register", userController.register);
router.post("/login", userController.login);
router.get("/user-profile", authenticateToken, userController.getCurrentUser);
router.get("/logout", authenticateToken, userController.logout);

export default router;