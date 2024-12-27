import Joi from "joi";

export const authSchema = Joi.object({
    email: Joi.string()
        .email({ tlds: { allow: false } })
        .required()
        .messages({
            "string.email": "Email inválido",
            "string.empty": "Email é obrigatório",
        }),
    password: Joi.string().min(3).required().messages({
        "string.min": "Senha inválida",
        "string.empty": "Senha é obrigatória",
    }),
});

export const customerSchema = Joi.object({
    name: Joi.string()
        .trim()
        .min(3)
        .regex(/^[A-Za-zÀ-ÿ\s]+$/)
        .required()
        .messages({
            "string.empty": "Nome é obrigatório",
            "string.min": "Nome deve ter no mínimo 3 caracteres",
            "string.pattern.base": "Nome com formato inválido",
        }),
    address: Joi.string().required().messages({
        "string.empty": "Endereço é obrigatório",
    }),
    city: Joi.string()
        .trim()
        .required()
        .messages({
            "string.empty": "Cidade é obrigatória",
        }),
    state: Joi.string()
        .trim()
        .regex(/^[A-Za-zÀ-ÿ\s]+$/)
        .required()
        .messages({
            "string.empty": "Nome é obrigatório",
            "string.pattern.base": "Nome com formato inválido",
        }),
    cep: Joi.string()
        .trim()
        .pattern(/^\d{5}-\d{3}$/)
        .required()
        .messages({
            "string.empty": "CEP é obrigatório",
            "string.pattern.base": "CEP com formato inválido",
        }),
    phone: Joi.string()
        .pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)
        .required()
        .messages({
            "string.empty": "Telefone é obrigatório",
            "string.pattern.base": "Telefone com formato inválido",
        }),
    cpf: Joi.string()
        .pattern(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
        .required()
        .messages({
            "string.empty": "CPF é obrigatório",
            "string.pattern.base": "CPF com formato inválido",
        })
});