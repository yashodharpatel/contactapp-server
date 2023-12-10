import express from "express";
import contactController from "#controllers/contact";
import authenticateToken from "#middleware/authenticateToken";

const router = express.Router();

router.use(authenticateToken); // will be used for all routes
router.get("/get-contacts", contactController.getContacts);
router.get("/get-contact/:id", contactController.getContact);
router.post("/add-contact", contactController.addContact);
router.put("/update-contact/:id", contactController.updateContact);
router.delete("/delete-contact/:id", contactController.deleteContact);

export default router;