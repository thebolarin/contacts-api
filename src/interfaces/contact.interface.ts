export interface ContactPayload {
    _id?: string;
    firstName: string,
    lastName: string,
    email: string,
    phoneNumber: string
}

export interface ContactQueryPayload {
    firstName: string,
    lastName: string,
    email: string,
    page: number,
    limit: number
}