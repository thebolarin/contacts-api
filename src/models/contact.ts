import mongoose from 'mongoose';
import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

// An interface that describes the properties
// that are requried to create a new Contact

interface ContactAttrs {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

// An interface that describes the properties
// that a Contact Model has
interface ContactModel extends mongoose.Model<ContactDoc> {
    build(attrs: ContactAttrs): ContactDoc;
}

// An interface that describes the properties
// that a Contact Document has
interface ContactDoc extends mongoose.Document {
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
}

const contactSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true,
        },
        lastName: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        phoneNumber: {
            type: String,
            required: true,
            unique: true
        }
    },
    {
        timestamps: true,
    }
);

contactSchema.set('versionKey', 'version');
contactSchema.plugin(updateIfCurrentPlugin);

contactSchema.statics.build = (attrs: ContactAttrs) => {
    return new Contact(attrs);
};

const Contact = mongoose.model<ContactDoc, ContactModel>('Contact', contactSchema);

export { Contact };