import db from "../config/db.js";

async function create(customer) {
    return await db.customer.create({
        data: customer,
    })
}

async function listAll() {
    return await db.customer.findMany()
}

export default {
    create,
    listAll
};
