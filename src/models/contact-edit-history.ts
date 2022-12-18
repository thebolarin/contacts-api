import mongoose from 'mongoose';
// import { updateIfCurrentPlugin } from 'mongoose-update-if-current';

interface ContactEditHistoryAttrs {
    data: Object;
    contact: mongoose.ObjectId;
}

interface ContactEditHistoryDoc extends mongoose.Document {
    data:   Object;
    contact: mongoose.ObjectId
}

interface ContactEditHistoryModel extends mongoose.Model<ContactEditHistoryDoc> {
    build(attrs: ContactEditHistoryAttrs): ContactEditHistoryDoc;
}

const contactEditHistorySchema = new mongoose.Schema(
    {
        data: {
            type: Object,
            required: true,
        },
        contact: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Contact",
            required: true,
        },
    },
    {
        timestamps: true,
    }
);
 
contactEditHistorySchema.statics.build = (attrs: ContactEditHistoryAttrs) => {
    return new ContactEditHistory(attrs);
};

const ContactEditHistory = mongoose.model<ContactEditHistoryDoc, ContactEditHistoryModel>('ContactEditHistory', contactEditHistorySchema);

export { ContactEditHistory };