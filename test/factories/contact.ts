import { create } from '../../src/services/contact';
import faker from 'faker';

/**
* Generate an object which container attributes needed
* to successfully create a contact instance.
* 
* @param  {Object} props Properties to use for the contact.
* 
* @return {Object}       An object to build the contact from.
*/
const data = async (props = {}) => {
    const defaultProps = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        phoneNumber: faker.phone.phoneNumber(),
    };
    return Object.assign({}, defaultProps, props);
};

/**
* Generates a contact instance from the properties provided.
* 
* @param  {Object} props Properties to use for the contact.
* 
* @return {Object}       A contact instance
*/
export default async (props = {}) => {
    const result = await create(await data(props))
   return result.data
}
