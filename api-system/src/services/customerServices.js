import customerRepository from "../repositories/customerRepository.js";

async function create(customer) {
    const exist = await customerRepository.findByCpf(customer.cpf);
    if (exist) throw { text: "CPF já cadastrado", status: 409 };

    await customerRepository.create(customer);
}

async function listAllPaginated(pagination, search) {
    return await customerRepository.listAllPaginated(pagination, search);
}

async function listAll(pagination, search) {
    return await customerRepository.listAll(pagination, search);
}

export default {
    create,
    listAll,
    listAllPaginated
};
