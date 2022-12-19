import { ContactEditHistory } from '../models/contact-edit-history';
import { createContactEditHistory } from './contact-edit-history';
import { ContactPayload, ContactQueryPayload } from '../interfaces/contact.interface';
import { Contact } from '../models/contact';

export const getAll = async (queryString: ContactQueryPayload) => {
  try {
    let pageOptions = {
      page: queryString.page || 0,
      limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25)
    }

    let query: ContactQueryPayload;

    if (queryString.firstName && queryString.firstName != '') query.firstName = queryString.firstName;
    if (queryString.lastName && queryString.lastName != '') query.lastName = queryString.lastName;
    if (queryString.email && queryString.email != '') query.email = queryString.email;

    const contactsCount = await Contact.countDocuments(query).exec();

    const contacts = await Contact.find(query)
      .sort({ createdAt: -1 })
      .skip(pageOptions.page * pageOptions.limit)
      .limit(pageOptions.limit * 1)
      .exec();

    return {
      status: "success",
      statusCode: 200,
      message: "Contacts record fetched successfully.",
      data: {
        contacts,
        total: contactsCount,
        pages: Math.ceil(contactsCount / pageOptions.limit),
        page: pageOptions.page,
        limit: pageOptions.limit
      }
    }

  } catch (err) {
    return {
      status: "error",
      statusCode: 500,
      message: "Invalid Request",
      data: err
    }
  }
}

export const create = async (payload: ContactPayload) => {
  try {
    const { firstName, lastName, email, phoneNumber } = payload;

    const contact = Contact.build({
      firstName,
      lastName,
      email: email.toLowerCase(),
      phoneNumber
    });

    await contact.save();

    await createContactEditHistory({ data: JSON.parse(JSON.stringify(contact)), contact: contact._id })

    return {
      status: "success", statusCode: 201, message: "Contact created successfully",
      data: contact
    }
  } catch (err) {
    return {
      status: "error", statusCode: 500, message: "Invalid Request",
      data: err
    }
  }
}

export const getOne = async (contactId: string) => {
  try {
    const contact = await Contact.findOne({ _id: contactId });

    if (!contact) {
      return { status: "error", statusCode: 404, message: "Contact not found" };
    }

    const contactEditHistory = await ContactEditHistory.find({ contact: contactId })
      .sort({ createdAt: -1 })
      .exec();

    return {
      status: "success", statusCode: 200, message: "Contact fetched successfully",
      data: { contact, contactEditHistory }
    };

  } catch (err) {
    return {
      status: "error",
      statusCode: 500,
      message: "Invalid Request",
      data: err
    }
  }
}

export const update = async (contactId: string, payload: ContactPayload) => {
  const { firstName, lastName, phoneNumber, email } = payload;
  try {
    const contact = await Contact.findOne({ _id: contactId });

    if (!contact) {
      return { status: "error", statusCode: 400, message: "Contact not found" };
    }

    let contactUpdateObj: any = {};

    if (firstName && firstName !== '') contactUpdateObj.firstName = firstName;
    if (lastName && lastName !== '') contactUpdateObj.lastName = lastName;
    if (phoneNumber && phoneNumber !== '') contactUpdateObj.phoneNumber = phoneNumber;
    if (email && email !== '') contactUpdateObj.email = email.toLowerCase();

    contact.set(contactUpdateObj);
    await contact.save();

    await createContactEditHistory({ data: JSON.parse(JSON.stringify(contact)), contact: contact._id })

    return { status: "success", statusCode: 200, message: "Contact updated successfully", data: contact };
  } catch (err) {
    console.log(err)
    return { status: "error", statusCode: 500, message: "Invalid Request", data: err }
  }
}

export const remove = async (contactId: string) => {
  try {
    const contact = await Contact.findOne({ _id: contactId });

    if (!contact) {
      return { status: "error", statusCode: 400, message: "Contact not found" };
    }

    await contact.remove();

    return { status: "success", statusCode: 200, message: "Contact deleted successfully" };
  } catch (err) {
    return { status: "error", statusCode: 500, message: "Invalid Request", data: err }
  }
}