import moment from "moment";
import { appointmentSchema, authSchema, customerSchema } from "./schemas.js";

const states = ["AM", "AC", "AL", "AP", "BA", "CE", "DF", "ES", "GO", "MA", "MT", "MS", "MG", "PA", "PB", "PR", "PE", "PI", "RJ", "RN", "RS", "RO", "RR", "SC", "SP", "SE", "TO"];

const validateForm = (schema, obj, errors) => {
    const validation = schema.validate(
        obj,
        { abortEarly: false }
    );
    if (validation.error) {
        validation.error.details.forEach((e) => {
            errors = { ...errors, [e.context.key]: e.message };
        });
    };
    return errors;
}

export const validateAuth = (obj) => {
    let errors = {};
    const validateErrors = validateForm(authSchema, obj, errors);
    errors = { ...errors, ...validateErrors };
    return { isValid: Object.keys(errors).length === 0, errors: errors };
}

export const validateCustomer = (obj) => {
    let errors = {};
    if (!validateCPF(obj?.cpf)) {
        errors = { ...errors, cpf: "CPF inválido" };
    }
    if (!validateState(obj?.state)) {
        errors = { ...errors, state: "Estado inválido" };
    }
    const validateErrors = validateForm(customerSchema, obj, errors);
    errors = { ...errors, ...validateErrors };
    return { isValid: Object.keys(errors).length === 0, errors: errors };
}

export const validateAppointment = (obj) => {
    let errors = {};

    const validateErrors = validateForm(appointmentSchema, obj, errors);

    if (moment(obj.initialDate).isBefore(moment(Date.now()))) {
        errors = { ...errors, initialDate: "Data não pode ser anterior a data atual" };
    }
    if (moment(obj.endDate).date !== moment(obj.endDate).date) {
        errors = { ...errors, endDate: "Os horários devem ser no mesmo dia" };
    }
    if (!errors.initialDate && !errors.endDate && moment(obj.initialDate).isSameOrAfter(moment(obj.endDate))) {
        errors = { ...errors, endDate: "Horário de término deve ser posterior ao de início" };
    }

    errors = { ...errors, ...validateErrors };
    return {
        isValid: Object.keys(errors).length === 0,
        errors: errors
    };
}

export const validateCPF = (value) => {
    if (typeof value !== 'string') {
        return false;
    }

    value = value.replace(/[^\d]+/g, '');

    if (value.length !== 11 || !!value.match(/(\d)\1{10}/)) {
        return false;
    }

    const values = value.split('').map(el => +el);
    const rest = (count) => (values.slice(0, count - 12).reduce((soma, el, index) => (soma + el * (count - index)), 0) * 10) % 11 % 10;

    return rest(10) === values[9] && rest(11) === values[10];
}

export const validateState = (value) => {
    return states.includes(value);
}

export const validateTime = (value) => {
    if (!value || value.length !== 5 || value[2] !== ":") return false;
    const time = value.split(":");
    if (time[0] > 23 || time[0] > 59) return false;
    return true;
}