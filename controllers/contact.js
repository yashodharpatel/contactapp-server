import asyncHandler from "express-async-handler";
import Contact from "#models/contact";

// @desc Get ALL Contacts
// @route GET /contact/get-contacts
// @access PRIVATE
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find({ user_id: req.user.id });
  res.status(200).json(contacts);
});

// @desc Get single contact
// @route GET /contact/get-contact/:id
// @access PRIVATE
const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to view other user contacts");
  }

  res.status(200).json(contact);
});

// @desc Add new contact
// @route POST /contact/add-contact
// @access PRIVATE
const addContact = asyncHandler(async (req, res) => {
  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandotary");
  }

  const contact = await Contact.create({
    name,
    email,
    phone,
    user_id: req.user.id,
  });

  res
    .status(201)
    .json({ message: "Contact created successfully", contact: contact });
});

// @desc Update Contact
// @route PUT /contact/update-contact/:id
// @access PRIVATE
const updateContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  const { name, email, phone } = req.body;
  if (!name || !email || !phone) {
    res.status(400);
    throw new Error("All fields are mandotary");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const newContact = await Contact.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res
    .status(200)
    .json({ message: "Contact updated successfully", contact: newContact });
});

// @desc Delete Contact
// @route DELETE /contact/delete-contact/:id
// @access PRIVATE
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  if (contact.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to delete other user contacts");
  }

  await Contact.deleteOne({ _id: id });

  res.status(200).json({ message: "Contact deleted successfully" });
});

export default {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};