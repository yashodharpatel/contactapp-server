import asyncHandler from "express-async-handler";
import Contact from "#models/contact";

// @desc Get ALL Contacts
// @route GET /contact/get-contacts
// @access PUBLIC
const getContacts = asyncHandler(async (req, res) => {
  const contacts = await Contact.find();
  res.status(200).json(contacts);
});

// @desc Get single contact
// @route GET /contact/get-contact/:id
// @access PUBLIC
const getContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
  }

  res.status(200).json(contact);
});

// @desc Add new contact
// @route POST /contact/add-contact
// @access PUBLIC
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
  });

  res
    .status(201)
    .json({ message: "Contact created successfully", contact: contact });
});

// @desc Update Contact
// @route PUT /contact/update-contact/:id
// @access PUBLIC
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

  const newContact = await Contact.findByIdAndUpdate(req.params.id, req.body);

  res
    .status(200)
    .json({ message: "Contact updated successfully", contact: newContact });
});

// @desc Delete Contact
// @route DELETE /contact/delete-contact/:id
// @access PUBLIC
const deleteContact = asyncHandler(async (req, res) => {
  const id = req.params.id;

  const contact = await Contact.findById(id);

  if (!contact) {
    res.status(404);
    throw new Error("Contact not found");
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