import { parse } from "csv-parse";
import fs from "fs";
import customerRepository from "../repositories/customerRepository.js";
import { validateCustomer } from "../utils/validate.js";
import { formatCustomer } from "../utils/formats.js";

async function create(customer) {
    const exist = await customerRepository.findByCpf(customer.cpf);
    if (exist) throw { text: "CPF já cadastrado", status: 409 };

    await customerRepository.create(customer);
}

async function listAll() {
    return await customerRepository.listAll();
}

async function importFile(file) {
    const parser = fs
        .createReadStream(file.path)
        .pipe(parse({
            delimiter: ',',
            columns: true,
            skip_empty_lines: true
        }));

    const results = [];
    const errors = [];
    let rowNumber = 0;

    for await (const record of parser) {
        rowNumber++;

        const formattedCustomer = formatCustomer(record);
        const { isValid, errors: validateError } = validateCustomer(formattedCustomer, {});
        if (isValid) results.push(formattedCustomer);
        else errors.push({
            row: rowNumber,
            data: record,
            formattedData: formattedCustomer,
            error: JSON.stringify(validateError)
        });
    }

    //! SAVE TO DATABASE - NO CONFLIT CPF!!

    //! CREATE ImportCUSTOMER

    return { results, errors };
}

export default {
    create,
    listAll,
    importFile
};
