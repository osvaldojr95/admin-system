import customerRepository from "../repositories/customerRepository.js";
import { send } from "../webSocket/index.js";
import { wss } from "../index.js";
import { states } from "../utils/validate.js";

async function create(customer) {
    const exist = await customerRepository.findByCpf(customer.cpf);
    if (exist) throw { text: "CPF já cadastrado", status: 409 };

    await customerRepository.create(customer);
    await calculatePublicInfos();
}

async function listAllPaginated(pagination, search) {
    return await customerRepository.listAllPaginated(pagination, search);
}

async function listAll(pagination, search) {
    return await customerRepository.listAll(pagination, search);
}

async function calculatePublicInfos() {
    const totalCustomers = await customerRepository.totalCustomers();
    const totalDuplicatedPhone = await customerRepository.totalDuplicatedPhone();
    const totalCustomersPerStateDB = await customerRepository.totalCustomersPerState();

    const totalCustomersPerState = states.map((state) => {
        const stateDB = totalCustomersPerStateDB.find((s) => s.state === state);
        return {
            state,
            total: stateDB ? stateDB._count._all : 0
        };
    });

    await send(wss, JSON.stringify({ totalCustomers, totalDuplicatedPhone, totalCustomersPerState }));
}

export default {
    create,
    listAll,
    listAllPaginated,
    calculatePublicInfos
};
