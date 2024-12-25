import Joi from "joi";

const customerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .regex(/^[A-ZÀ-Ú][a-zà-ú\s]/)
        .required()
        .messages({
            "string.pattern.base": "Nome com formato inválido",
        }),
    address: Joi.string().required(),
    city: Joi.string()
        .trim()
        .regex(/^[A-ZÀ-Ú][a-zà-ú\s]/)
        .required()
        .messages({
            "string.pattern.base": "Cidade com formato inválido",
        }),
    state: Joi.string()
        .length(2)
        .uppercase()
        .required()
        .messages({
            "string.pattern.base": "Estado com formato inválido",
        }),
    cep: Joi.string()
        .trim()
        .pattern(/^\d{5}-\d{3}$/)
        .required()
        .messages({
            "string.pattern.base": "CEP com formato inválido",
        }),
    phone: Joi.string()
        .pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
        .required()
        .messages({
            "string.pattern.base": "Telefone com formato inválido",
        }),
    cpf: Joi.string()
        .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .required()
        .messages({
            "string.pattern.base": "CPF com formato inválido",
        })
});

export async function customerValidation(req, res, next) {
    const { name, address, city, state, cep, phone, cpf } = req.body;

    if (!name || !address || !city || !state || !cep || !phone || !cpf) {
        throw { text: "", status: 422 };
    }

    const customer = { name, address, city, state, cep, phone, cpf }

    const validation = customerSchema.validate(customer, { abortEarly: false });
    if (validation.error) {
        throw { text: validation.error.details.map((e) => e.message).join(", "), status: 422 };
    }

    res.locals.body = { customer };
    next();
}
