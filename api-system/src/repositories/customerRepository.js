import db from "../config/db.js";

async function create(customer) {
    return await db.customer.create({
        data: customer,
    })
}

async function listAllPaginated(pagination, search) {
    const skip = (pagination.page - 1) * pagination.pageSize;
    const take = pagination.pageSize;

    let customers = [];
    let total = 0;

    if (search) {
        const formattedSearch = `%${search}%`;
        const orderBy = pagination.orderBy.name.toString();
        const direction = pagination.orderBy.direction.toString().toUpperCase();
        const query = `
            SELECT * 
            FROM "customers"
            WHERE TO_CHAR("createdDate", 'DD/MM/YYYY HH24:MI') ILIKE $1
               OR "name" ILIKE $1
               OR "state" ILIKE $1
            ORDER BY "${orderBy}" ${direction}
            LIMIT $2 OFFSET $3
        `;
        const countQuery = `
            SELECT COUNT(*) 
            FROM "customers"
            WHERE TO_CHAR("createdDate", 'DD/MM/YYYY HH24:MI') ILIKE $1
               OR "name" ILIKE $1
               OR "state" ILIKE $1
        `;
        customers = await db.$queryRawUnsafe(query, formattedSearch, take, skip);
        const count = await db.$queryRawUnsafe(countQuery, formattedSearch);
        total = Number(count[0].count.toString().replace(/\D/g, ''));
    } else {
        customers = await db.customer.findMany({
            skip,
            take,
            orderBy: {
                [pagination.orderBy.name]: pagination.orderBy.direction
            }
        });
        total = await db.customer.count({});
        return { customers, total };
    }
    return { customers, total };
}

async function listAll() {
    const customers = await db.customer.findMany({
        select: {
            id: true,
            name: true
        },
        orderBy: {
            name: "asc"
        }
    });
    return customers;
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
    listAllPaginated,
    findByCpf,
    findById
};
