import { ContactEditHistoryPayload, ContactEditHistoryQueryPayload } from '../interfaces/contact-edit-history.interface';
import { ContactEditHistory } from '../models/contact-edit-history';

export const getAll = async (queryString: any) => {
    try {
        let query: ContactEditHistoryQueryPayload;
        const contactEditHistoriesCount = await ContactEditHistory.countDocuments(query).exec();

        const contactEditHistories = await ContactEditHistory.find(query)
            .sort({ createdAt: -1 })
            .exec();

        return {
            status: "success",
            statusCode: 200,
            message: "Contact Edit History record fetched successfully.",
            data: {
                contactEditHistories,
                total: contactEditHistoriesCount
            }
        }

    } catch (err) {
        return {
            status: "error", statusCode: 500,
            message: "Invalid Request",
            data: err
        }
    }
}

export const createContactEditHistory = async (payload: ContactEditHistoryPayload) => {
    try {
        const { data, contact } = payload;

        const contactEditHistory = ContactEditHistory.build({
            data,
            contact
        });

        await contactEditHistory.save();

        return {
            status: "success", statusCode: 201,
            message: "Contact Edit History created successfully",
            data: contactEditHistory
        }

    } catch (err) {
        return {
            status: "error", statusCode: 500, message: "Invalid Request",
            data: err
        }
    }
}

export const getOne = async (contactEditHistoryId: string) => {
    try {
        const contactEditHistory = await ContactEditHistory.findOne({ _id: contactEditHistoryId });

        if (!contactEditHistory) {
            return { status: "error", statusCode: 404, message: "Contact Edit History not found" };
        }

        return {
            status: "success", statusCode: 200,
            message: "Contact Edit History fetched successfully",
            data: contactEditHistory
        };


    } catch (err) {
        return {
            status: "error", statusCode: 500, message: "Invalid Request",
            data: err
        }
    }
}
