const fs = require("fs").promises;
const path = require("path");
const { v4: uuidv4 } = require("uuid");

const contactsPath = path.join(__dirname, "contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactsPath);
  const contacts = JSON.parse(data);
  return contacts;
};

const getContactById = async (contactId) => {
  const contacs = await listContacts();
  const result = contacs.find((item) => item.id === contactId);
  if (!result) {
    return null;
  }
  return result;
};

const removeContact = async (contactId) => {
  const contacs = await listContacts();
  const idx = contacs.findIndex((item) => item.id === contactId);
  if (idx === -1) {
    return null;
  }
  const [result] = contacs.splice(idx, 1);
  await fs.writeFile(contactsPath, JSON.stringify(contacs, null, 2));
  return result;
};

const addContact = async (name, email, phone) => {
  const contacs = await listContacts();
  const newContact = {
    id: uuidv4(),
    name,
    email,
    phone,
  };
  contacs.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacs, null, 2));
  return newContact;
};

const updateContact = async (id, body) => {
  const contacts = await listContacts();
  const idx = contacts.findIndex(
    (contacts) => String(contacts.id) === String(id)
  );
  if (idx === -1) {
    return null;
  }
  contacts[idx] = { id, ...body };
  fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts[idx];
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
};
