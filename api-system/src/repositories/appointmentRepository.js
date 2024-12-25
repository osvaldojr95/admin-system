import db from "../config/db.js";

async function create(appointment) {
    return await db.appointment.create({
        data: appointment,
    })
}

async function listAll() {
    return await db.appointment.findMany()
}

export default {
    create,
    listAll
};
