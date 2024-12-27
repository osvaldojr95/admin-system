import appointmentServices from "../services/appointmentServices.js";

async function create(req, res) {
    const { appointment } = res.locals.body;
    await appointmentServices.create(appointment);
    return res.sendStatus(201);
}

async function listAll(req, res) {
    const list = await appointmentServices.listAll();
    return res.send(list);
}

export default {
    create,
    listAll,
}