import { ContactEditHistoryPayload, ContactEditHistoryQueryPayload } from '../interfaces/contact-edit-history.interface';
import { ContactEditHistory } from '../models/contact-edit-history';

export const getAll = async (queryString: ContactEditHistoryQueryPayload) => {
    try {
        let pageOptions = {
            page: queryString.page || 0,
            limit: (queryString.limit ? (queryString.limit > 100 ? 100 : queryString.limit) : 25)
        }

        let query: ContactEditHistoryQueryPayload;

        if (queryString.contact && queryString.contact != '') query.contact = queryString.contact;

        const contactEditHistoriesCount = await ContactEditHistory.countDocuments(query).exec();

        const contactEditHistories = await ContactEditHistory.find({})
            .sort({ createdAt: -1 })
            .skip(pageOptions.page * pageOptions.limit)
            .limit(pageOptions.limit * 1)
            .exec();

        return {
            status: "success",
            statusCode: 200,
            message: "Contact Edit History record fetched successfully.",
            data: {
                contactEditHistories,
                total: contactEditHistoriesCount,
                pages: Math.ceil(contactEditHistoriesCount / pageOptions.limit),
                page: pageOptions.page,
                limit: pageOptions.limit
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
