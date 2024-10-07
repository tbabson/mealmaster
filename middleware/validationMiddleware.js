import { body, param, validationResult } from 'express-validator';
import { BadRequestError, NotFoundError } from '../errors/customError.js';

const withValidationErrors = (validateValues) => {
    return [
        validateValues, (req, res, next) => {
            const errors = validationResult(req)
            if (!errors.isEmpty()) {
                const errorMessages = errors.array().map((error) => error.msg);
                if (errorMessages[0].startsWith('no food')) {
                    throw new NotFoundError(errorMessages)
                }
                throw new BadRequestError(errorMessages)
            }
            next()
        },
    ]
}