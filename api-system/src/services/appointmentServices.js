import appointmentRepository from "../repositories/appointmentRepository.js";

async function create(appointment) {
    await appointmentRepository.create(appointment);
}

async function listAll() {
    return await appointmentRepository.listAll();
}

export default {
    create,
    listAll,
};
