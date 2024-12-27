import customerServices from "../services/customerServices.js";

export async function create(req, res) {
    const { customer } = res.locals.body;
    await customerServices.create(customer);
    return res.sendStatus(201);
}

export async function listAll(req, res) {
    const { pagination } = res.locals.body;
    const list = await customerServices.listAll(pagination);
    return res.send(list);
}

export async function importFile(req, res) {
    const { file } = req;
    if (!file) return res.sendStatus(400);
    await customerServices.importFile(file);
    return res.sendStatus(201);
}
