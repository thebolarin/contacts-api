import contactFactory from './factories/contact';
import request from 'supertest';
import { app } from '../src/app';
import mongoose from 'mongoose';
import { Contact } from '../src/models/contact';
import { ContactEditHistory } from '../src/models/contact-edit-history';
import faker from 'faker';

describe('contact ', () => {
  it('returns a 404 if the contact edit history is not found', async () => {
    const id = new mongoose.Types.ObjectId().toHexString();

    await request(app)
      .get(`/api/contact-edit-history/${id}`)
      .expect(404);
  });

  it('returns the contact edit history if the contact is found', async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const phoneNumber = faker.phone.phoneNumber('+48 91 ### ## ##')

    const contact = await request(app)
      .post('/api/contact')
      .send({ firstName, lastName, email, phoneNumber })
      .expect(201);

    const contactId = contact.body.data._id.toString();
    await request(app)
      .put(`/api/contact/${contactId}`)
      .send({ firstName: "Moses" })
      .expect(200);

    const response = await request(app)
      .get(`/api/contact-edit-history?contact=${contactId}`)
      .expect(200);

    expect(response.body.status).toBe('success');
    expect(response.body.data.total).toEqual(2);
  });


  it('creates a contact edit history when a contact with valid inputs is created', async () => {
    const firstName = faker.name.firstName();
    const lastName = faker.name.lastName();
    const email = faker.internet.email();
    const phoneNumber = faker.phone.phoneNumber('+48 91 ### ## ##')

    const contact = await request(app)
      .post('/api/contact')
      .send({ firstName, lastName, email, phoneNumber })
      .expect(201);

    const contactId = contact.body.data._id.toString();

    await request(app)
      .put(`/api/contact/${contactId}`)
      .send({ firstName: "Moses" })
      .expect(200);

    await request(app)
      .get('/api/contact-edit-history')
      .expect(200);

    const contactEditHistories = await ContactEditHistory.find({});
    expect(contactEditHistories.length).toEqual(2);
    const id = contactEditHistories[0].contact.toString()
    expect(id).toEqual(contactId);
  });
});