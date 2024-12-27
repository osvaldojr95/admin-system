import { authSchema, customerSchema } from "./schemas";
import moment from "moment";

const states = [
    "Acre",
    "Alagoas",
    "Amapá",
    "Amazonas",
    "Bahia",
    "Ceará",
    "Distrito Federal",
    "Espírito Santo",
    "Goiás",
    "Maranhão",
    "Mato Grosso",
    "Mato Grosso do Sul",
    "Minas Gerais",
    "Pará",
    "Paraíba",
    "Paraná",
    "Pernambuco",
    "Piauí",
    "Rio de Janeiro",
    "Rio Grande do Norte",
    "Rio Grande do Sul",
    "Rondônia",
    "Roraima",
    "Santa Catarina",
    "São Paulo",
    "Sergipe",
    "Tocantins",
];

const validateForm = (schema, obj, setError) => {
    const validation = schema.validate(
        obj,
        { abortEarly: false }
    );
    if (validation.error) {
        setError && validation.error.details.forEach((e) => {
            setError((prev) => ({ ...prev, [e.context.key]: e.message }));
        });
        return false;
    };
    return true;
}

export const validateAuth = (obj, setError = null) => {
    setError && setError({});
    return validateForm(authSchema, obj, setError);
}

export const validateCustomer = (obj, setError = null) => {
    let noError = true;
    setError && setError({});
    if (!validateCPF(obj?.cpf)) {
        setError && setError((prev) => ({ ...prev, cpf: "CPF inválido" }));
        noError = false;
    }
    console.log(validateState(obj?.state));
    if (!validateState(obj?.state)) {
        setError && setError((prev) => ({ ...prev, state: "Estado inválido" }));
        noError = false;
    }
    const isValid = validateForm(customerSchema, obj, setError);
    return noError && isValid;
}

export const validateAppointment = (obj, setError = null) => {
    let noError = true;
    let noTimeError = true;
    setError && setError({});

    if (obj.name?.length < 3) {
        setError && setError((prev) => ({ ...prev, name: "Nome deve ter no mínimo 3 caracteres" }));
        noError = false;
    }
    if (!obj.customerId || obj.customerId === "0") {
        setError && setError((prev) => ({ ...prev, customer: "Cliente é obrigatório" }));
        noError = false;
    }
    if (!obj.date) {
        setError && setError((prev) => ({ ...prev, date: "Data é obrigatório" }));
        noError = false;
    }
    if (obj.date && moment(obj.date).isBefore(moment().format("YYYY-MM-DD"))) {
        setError && setError((prev) => ({ ...prev, date: "Data não pode ser anterior a data atual" }));
        noError = false;
    }
    if (!obj.initialTime) {
        setError && setError((prev) => ({ ...prev, initialTime: "Horário de início é obrigatório" }));
        noError = false;
        noTimeError = false;
    } else if (!validateTime(obj.initialTime)) {
        setError && setError((prev) => ({ ...prev, initialTime: "Horário de início inválido" }));
        noError = false;
        noTimeError = false;
    }
    if (!obj.endTime) {
        setError && setError((prev) => ({ ...prev, endTime: "Horário de término é obrigatório" }));
        noError = false;
        noTimeError = false;
    } else if (!validateTime(obj.endTime)) {
        setError && setError((prev) => ({ ...prev, endTime: "Horário de término inválido" }));
        noError = false;
        noTimeError = false;
    }
    if (noTimeError) {
        if (obj.initialTime === obj.endTime) {
            setError && setError((prev) => ({ ...prev, endTime: "Horário de término deve ser posterior ao de início" }));
            noError = false;
        }
        if (moment(`${obj.date} ${obj.initialTime}:00`, 'YYYY-MM-DD HH:mm:ss').isAfter(moment(`${obj.date} ${obj.endTime}:00`, 'YYYY-MM-DD HH:mm:ss'))) {
            setError && setError((prev) => ({ ...prev, endTime: "Horário de término deve ser posterior ao de início" }));
            noError = false;
        }
    }

    return noError;
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