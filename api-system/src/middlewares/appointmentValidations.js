import Joi from "joi";

const appointmentSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .required()
        .messages({
            "string.pattern.base": "Nome com formato inválido",
        }),
    initialDate: Joi.date().required(),
    endDate: Joi.date().required(),
    customerId: Joi.number().integer().required(),
});

export async function appointmentValidation(req, res, next) {
    const { name, initialDate, endDate, customerId } = req.body;

    if (!name || !initialDate || !endDate || !customerId) {
        throw { text: "", status: 422 };
    }

    const appointment = { name, initialDate, endDate, customerId }

    const validation = appointmentSchema.validate(appointment, { abortEarly: false });
    if (validation.error) {
        throw { text: validation.error.details.map((e) => e.message).join(", "), status: 422 };
    }

    res.locals.body = { appointment };
    next();
}
