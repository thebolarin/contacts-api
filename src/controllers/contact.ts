import { isValidPhoneNumber } from './../util/modelValidator';
import { getAll, getOne, update, remove, create } from '../services/contact';
import { ResMsg, BadRequestError, resultResMsg } from '../util/index';
import express, { Request, Response } from 'express';
import { check, body, validationResult } from 'express-validator';
import { isValidEmail } from '../util/modelValidator';

type CustomRequest = Request & { [key: string]: any }

export const fetchContacts = async (req: CustomRequest, res: Response) => {
    try {
        let result = await getAll(req.query);

        return resultResMsg(res, result);

    } catch (err) {
        return ResMsg(res, 500, 'error', 'Invalid Request', err);
    }
}

export const fetchContact = async (req: Request, res: Response) => {
    try {
        await check("contactId", "Provide a valid contact id").not().isEmpty().isString().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return BadRequestError(res, errors.array({ onlyFirstError: true }));
        }

        let result = await getOne(req.params.contactId);

        return resultResMsg(res, result);
    } catch (err) {
        return ResMsg(res, 500, 'error', 'Invalid Request', err);
    }
}

export const createContact = async (req: Request, res: Response) => {
    try {
        await check("firstName", "Provide a valid first name").not().isEmpty().isString().run(req);
        await check("lastName", "Provide a valid last name").not().isEmpty().isString().run(req);
        await check("email", "Provide a valid email").not().isEmpty().isEmail().custom(isValidEmail).run(req);
        await check("phoneNumber", "Provide a valid phone number").not().isEmpty().isString()
        .matches(/^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/)
        .custom(isValidPhoneNumber).run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return BadRequestError(res, errors.array({ onlyFirstError: true }));
        }

        const result = await create(req.body);

        return resultResMsg(res, result);
    } catch (err) {
        return ResMsg(res, 500, 'error', 'Invalid Request', err);
    }
}

export const updateContact = async (req: Request, res: Response) => {
    try {
        await check("firstName", "Provide a valid first name").optional().isString().run(req);
        await check("lastName", "Provide a valid last name").optional().isString().run(req);
        await check("email", "Provide a valid email").optional().isEmail().custom(isValidEmail).run(req);
        await check("phoneNumber", "Provide a valid phone number").optional().isString()
        .matches(/^(\+|00)[1-9][0-9 \-\(\)\.]{7,32}$/)
        .custom(isValidPhoneNumber).run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return BadRequestError(res, errors.array({ onlyFirstError: true }));
        }

        let result = await update(req.params.contactId, req.body);

        return resultResMsg(res, result);

    } catch (err) {
        return ResMsg(res, 500, 'error', 'Invalid Request', err);
    }
}

export const deleteContact = async (req: Request, res: Response) => {
    try {
        await check("contactId", "Provide a valid contact id").not().isEmpty().isString().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return BadRequestError(res, errors.array({ onlyFirstError: true }));
        }

        let result = await remove(req.params.contactId);

        return resultResMsg(res, result);
    } catch (err) {
        return ResMsg(res, 500, 'error', 'Invalid Request', err);
    }
}
