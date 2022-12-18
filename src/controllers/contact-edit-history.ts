import { ResMsg, BadRequestError, resultResMsg } from '../util/index';
import { getAll, getOne } from '../services/contact-edit-history';
import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';

export const fetchContactEditHistories = async (req: Request, res: Response) => {
    try {
        let result = await getAll(req.body);

        return resultResMsg(res, result);

    } catch (err) {
        return ResMsg(res, 500, 'error', 'Invalid Request', err);
    }
}

export const fetchContactEditHistory = async (req: Request, res: Response) => {
    try {
        await check("contactEditHistoryId", "Provide a valid contact edit history id").not().isEmpty().isString().run(req);

        const errors = validationResult(req);

        if (!errors.isEmpty()) {
            return BadRequestError(res, errors.array({ onlyFirstError: true }));
        }

        let result = await getOne(req.params.contactEditHistoryId);

        return resultResMsg(res, result);
    } catch (err) {
        return ResMsg(res, 500, 'error', 'Invalid Request', err);
    }
}