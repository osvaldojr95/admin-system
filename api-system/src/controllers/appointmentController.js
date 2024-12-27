import appointmentServices from "../services/appointmentServices.js";

export async function create(req, res) {
    const { appointment } = res.locals.body;
    await appointmentServices.create(appointment);
    return res.sendStatus(201);
}

export async function listAll(req, res) {
    const list = await appointmentServices.listAll();
    return res.send(list);
}
