import { ObjectId } from 'mongoose';

export interface ContactEditHistoryPayload {
    data: Object,
    contact: ObjectId
}

export interface ContactEditHistoryQueryPayload {
    contact: string,
    page: number,
    limit: number
}
