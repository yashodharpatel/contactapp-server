// @desc Get ALL Contacts
// @route GET /contact/get-contacts
// @access PUBLIC
const getContacts = async (req, res) => {
  try {
    res.status(200).json({ message: "Get All contacts" });
  } catch (error) {
    console.log(error);
  }
};

// @desc Get single contact
// @route GET /contact/get-contact/:id
// @access PUBLIC
const getContact = async (req, res) => {
  try {
    res.status(200).json({ message: `Get Contact with id ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
};

// @desc Add new contact
// @route POST /contact/add-contact
// @access PUBLIC
const addContact = async (req, res) => {
  try {
    console.log(req.body);
    res.status(201).json({ message: "Added new contact" });
  } catch (error) {
    console.log(error);
  }
};

// @desc Update Contact
// @route PUT /contact/update-contact/:id
// @access PUBLIC
const updateContact = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: `Updated Contact with id ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
};

// @desc Delete Contact
// @route DELETE /contact/delete-contact/:id
// @access PUBLIC
const deleteContact = async (req, res) => {
  try {
    res
      .status(200)
      .json({ message: `Deleted Contact with id ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
};

export default {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
