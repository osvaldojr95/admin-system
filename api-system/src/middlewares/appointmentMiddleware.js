import { validateAppointment } from "../utils/validate.js";

export async function appointmentValidation(req, res, next) {
    const { name, initialDate, endDate, customerId } = req.body;

    if (!name || !initialDate || !endDate || !customerId) {
        throw { text: "", status: 422 };
    }

    const appointment = { name, initialDate, endDate, customerId }

    const { isValid, errors } = validateAppointment(appointment);
    if (!isValid) {
        throw { text: JSON.stringify(errors), status: 422 };
    }

    res.locals.body = { appointment };
    next();
}
