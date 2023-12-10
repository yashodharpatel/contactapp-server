import asyncHandler from "express-async-handler";

// @desc Get ALL Contacts
// @route GET /contact/get-contacts
// @access PUBLIC
const getContacts = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get All contacts" });
});

// @desc Get single contact
// @route GET /contact/get-contact/:id
// @access PUBLIC
const getContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Get Contact with id ${req.params.id}` });
});

// @desc Add new contact
// @route POST /contact/add-contact
// @access PUBLIC
const addContact = asyncHandler(async (req, res) => {
  const { name, email } = req.body;
  if (!name || !email) {
    res.status(400);
    throw new Error("All fields are mandotary");
  }
  res.status(201).json({ message: "Added new contact" });
});

// @desc Update Contact
// @route PUT /contact/update-contact/:id
// @access PUBLIC
const updateContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Updated Contact with id ${req.params.id}` });
});

// @desc Delete Contact
// @route DELETE /contact/delete-contact/:id
// @access PUBLIC
const deleteContact = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Deleted Contact with id ${req.params.id}` });
});

export default {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};