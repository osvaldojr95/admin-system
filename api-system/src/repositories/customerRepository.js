import db from "../config/db.js";

async function create(customer) {
    return await db.customer.create({
        data: customer,
    })
}

async function listAll() {
    return await db.customer.findMany()
}

async function findByCpf(cpf) {
    return await db.customer.findUnique({
        where: {
            cpf: cpf
        }
    });
}

async function findById(customerId) {
    return await db.customer.findUnique({
        where: {
            id: customerId
        }
    });
}

export default {
    create,
    listAll,
    findByCpf, 
    findById
};
