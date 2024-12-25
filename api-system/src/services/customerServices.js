import customerRepository from "../repositories/customerRepository.js";

async function create(customer) {
    await customerRepository.create(customer);
}

async function listAll() {
    return await customerRepository.listAll();
}

export default {
    create,
    listAll,
};
