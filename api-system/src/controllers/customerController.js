import customerServices from "../services/customerServices.js";

async function create(req, res) {
    const { customer } = res.locals.body;
    await customerServices.create(customer);
    return res.sendStatus(201);
}

async function listAllPaginated(req, res) {
    const { pagination } = res.locals.body;
    const { search } = req.query;
    const list = await customerServices.listAllPaginated(pagination, search);
    return res.send(list);
}

async function listAll(req, res) {
    const list = await customerServices.listAll();
    return res.send(list);
}

export default {
    create,
    listAll,
    listAllPaginated,
}