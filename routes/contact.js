import express from "express";
import contactController from "#controllers/contact";

const router = express.Router();
router.get("/get-contacts", contactController.getContacts);
router.get("/get-contact/:id", contactController.getContact);
router.post("/add-contact", contactController.addContact);
router.put("/update-contact/:id", contactController.updateContact);
router.delete("/delete-contact/:id", contactController.deleteContact);

export default router;