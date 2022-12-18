import contactFactory from './factories/contact';
import request from 'supertest';
import { app } from '../src/app';
import mongoose from 'mongoose';
import { Contact } from '../src/models/contact';
import { ContactEditHistory } from '../src/models/contact-edit-history';

describe('contact ', () => {
  it('returns a 404 if the contact edit history is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .get(`/api/contact-edit-history/${id}`)
      .expect(404);
  });

  it('returns the contact edit history if the contact is found', async () => {
    const contact = await contactFactory();
    const contactId = contact._id.toString();

    await request(app)
      .put(`/api/contact/${contactId}`)
      .send({ firstName: "Moses" })
      .expect(200);

    const response = await request(app)
      .get(`/api/contact-edit-history?contact=${contactId}`)
      .expect(200);

    expect(response.body.status).toBe('success');
    expect(response.body.data.total).toEqual(1);
  });


  it('creates a contact edit history when a contact with valid inputs is created', async () => {
    let contacts = await Contact.find({});
    expect(contacts.length).toEqual(0);

    const contact = await contactFactory();
    const contactId = contact._id.toString();

    await request(app)
      .put(`/api/contact/${contactId}`)
      .send({ firstName: "Moses" })
      .expect(200);

    await request(app)
      .get('/api/contact-edit-history')
      .expect(200);

    const contactEditHistories = await ContactEditHistory.find({});
    expect(contactEditHistories.length).toEqual(1);
    const id = contactEditHistories[0].contact.toString()
    expect(id).toEqual(contactId);
  });
});

