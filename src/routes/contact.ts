import express from 'express'
import { fetchContacts, createContact, updateContact, deleteContact, fetchContact } from '../controllers/contact';

const Router = express.Router();

Router.get('/', fetchContacts);
Router.get('/:contactId', fetchContact);
Router.post('/', createContact);
Router.put('/:contactId', updateContact);
Router.delete('/:contactId', deleteContact);

export default Router;