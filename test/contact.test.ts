import contactFactory from './factories/contact';
import request from 'supertest';
import { app } from '../src/app';
import mongoose from 'mongoose';
import { Contact } from '../src/models/contact';
import faker from 'faker';

describe('contact ', () => {
    it('can fetch a list of contacts', async () => {
        await contactFactory();
        await contactFactory();
        await contactFactory();

        const response = await request(app)
            .get('/api/contact')
            .expect(200);

        expect(response.body.status).toBe('success');
        expect(response.body.data.total).toEqual(3);
    });

    it('returns a 404 if the contact is not found', async () => {
        const id = new mongoose.Types.ObjectId().toHexString();

        await request(app)
            .get(`/api/contact/${id}`)
            .expect(404);
    });

    it('returns the contact if the contact is found', async () => {
        const contact: any = await contactFactory({ email: "contact@test.com" });

        const contactResponse = await request(app)
            .get(`/api/contact/${contact._id}`)
            .expect(200);

        expect(contactResponse.body.data.email).toEqual("contact@test.com");
        expect(contactResponse.body.data.firstName).toEqual(contact.firstName);
    });

    it('has a route handler listening to /api/contact for post requests', async () => {
        const response = await request(app).post('/api/contact').send({});

        expect(response.status).not.toEqual(404);
    });

    it('returns an error if an invalid input is provided', async () => {
        await request(app)
            .post('/api/contact')
            .send({
                price: 10,
            })
            .expect(400);

    });

    it('creates a contact with valid inputs', async () => {
        let contacts = await Contact.find({});
        expect(contacts.length).toEqual(0);

        const firstName = faker.name.firstName();
        const lastName = faker.name.lastName();
        const email = faker.internet.email();
        const phoneNumber = faker.phone.phoneNumber();

        await request(app)
            .post('/api/contact')
            .send({ firstName, lastName, email, phoneNumber })
            .expect(201);

        contacts = await Contact.find({});
        expect(contacts.length).toEqual(1);
        expect(contacts[0].phoneNumber).toEqual(phoneNumber);
    });
});

