async function getContacts(req, res) {
  try {
    res.status(200).json({ message: "Get All contacts" });
  } catch (error) {
    console.log(error);
  }
}

async function getContact(req, res) {
  try {
    res.status(200).json({ message: `Get Contact with id ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
}

async function addContact(req, res) {
  try {
    console.log(req.body)
    res.status(201).json({ message: "Added new contact" });
  } catch (error) {
    console.log(error);
  }
}

async function updateContact(req, res) {
  try {
    res
      .status(200)
      .json({ message: `Updated Contact with id ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
}

async function deleteContact(req, res) {
  try {
    res
      .status(200)
      .json({ message: `Deleted Contact with id ${req.params.id}` });
  } catch (error) {
    console.log(error);
  }
}

export default {
  getContacts,
  getContact,
  addContact,
  updateContact,
  deleteContact,
};
