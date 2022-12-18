import { Contact } from '../models/contact';
import { CustomValidator } from "express-validator";

export const isValidEmail: CustomValidator = async (value, { req }) => {
  return Contact.findOne({ _id: { $ne: req.params.contactId }, email: value }).then(contact => {
    if (contact) {
      return Promise.reject('Contact with email already exists');
    }
  });
};

export const isValidPhoneNumber: CustomValidator = async (value, { req }) => {
  return Contact.findOne({ _id: { $ne: req.params.contactId }, phoneNumber: value }).then(contact => {
    if (contact) {
      return Promise.reject('Contact with phone number already exists');
    }
  });
};