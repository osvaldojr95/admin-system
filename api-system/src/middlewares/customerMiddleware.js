import fs from 'fs';
import path from 'path';
import { validateCustomer } from "../utils/validate.js";

export async function customerValidation(req, res, next) {
    const { name, address, city, state, cep, phone, cpf } = req.body;

    if (!name || !address || !city || !state || !cep || !phone || !cpf) {
        throw { text: "", status: 422 };
    }

    const uploadDir = path.resolve('src/uploads');
    if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
    }

    const customer = { name, address, city, state, cep, phone, cpf }

    const { isValid, errors } = validateCustomer(customer);
    if (!isValid) {
        throw { text: JSON.stringify(errors), status: 422 };
    }

    res.locals.body = { customer };
    next();
}
