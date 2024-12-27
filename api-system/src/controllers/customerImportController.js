import customerImportServices from "../services/customerImportServices.js";

export async function listAll(req, res) {
    const list = await customerImportServices.listAll();
    return res.send(list);
}

export async function importFile(req, res) {
    const { file } = req;
    if (!file) return res.sendStatus(400);
    await customerImportServices.addFileQueue(file);
    return res.sendStatus(201);
}

export default {
    listAll,
    importFile,
}