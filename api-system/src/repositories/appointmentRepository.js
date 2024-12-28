import db from "../config/db.js";

async function create(appointment) {
    return await db.appointment.create({
        data: appointment,
    })
}

async function verifyConflictTimes(initialDate, endDate) {
    return await db.appointment.findMany({
        where: {
            OR: [
                {
                    AND: [
                        { initialDate: { lt: initialDate } },
                        { endDate: { gt: initialDate } },
                    ],
                },
                {
                    AND: [
                        { initialDate: { lt: endDate } },
                        { endDate: { gt: endDate } },
                    ],
                },
                {
                    AND: [
                        { initialDate: { gte: initialDate } },
                        { endDate: { lte: endDate } },
                    ],
                },
            ],
        },
    })
}

async function listAll() {
    const appointments = await db.$queryRawUnsafe(`
        SELECT a.id, a.name, a."initialDate", a."endDate", c.name as "customerName"
        FROM appointments a
        JOIN customers c ON a."customerId" = c.id
        ORDER BY a."initialDate" ASC;
    `);
    const total = await db.appointment.count();
    return { appointments, total };
}

export default {
    create,
    verifyConflictTimes,
    listAll
};
