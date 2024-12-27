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
    const appointments = await db.appointment.findMany();
    const total = await db.appointment.count();
    return { appointments, total };
}

export default {
    create,
    verifyConflictTimes,
    listAll
};
