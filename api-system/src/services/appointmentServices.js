import appointmentRepository from "../repositories/appointmentRepository.js";
import customerRepository from "../repositories/customerRepository.js";

async function create(appointment) {
    const customerExist = await customerRepository.findById(appointment.customerId);
    if (!customerExist) throw { text: "Cliente não encotrado", status: 404 };

    const conflictTimes = await appointmentRepository.verifyConflictTimes(appointment.initialDate, appointment.endDate);
    if (conflictTimes.length > 0) throw { text: "Horário de atendimento conflitante", status: 409 };

    await appointmentRepository.create(appointment);
}

async function listAll() {
    return await appointmentRepository.listAll();
}

export default {
    create,
    listAll,
};
