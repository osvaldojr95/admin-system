import customerServices from "../services/customerServices.js";

export async function create(req, res) {
    const { customer } = res.locals.body;
    await customerServices.create(customer);
    res.sendStatus(201);
}

export async function listAll(req, res) {
    const list = await customerServices.listAll();
    res.send(list);
}

export async function importFile(req, res) {
    res.send("imported");
}
