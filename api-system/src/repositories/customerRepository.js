import db from "../config/db.js";

async function create(customer) {
    return await db.customer.create({
        data: customer,
    })
}

async function listAll(pagination) {
    const skip = (pagination.page - 1) * pagination.pageSize;
    const take = pagination.pageSize;

    const customers = await db.customer.findMany({
        skip: skip,
        take: take,
        orderBy: {
            [pagination.orderBy.name]: pagination.orderBy.direction
        }
    })
    const total = await db.customer.count();
    return { customers, total };
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
