import amqp from "amqplib";
import { parse } from "csv-parse";
import fs from "fs";
import customerRepository from "../repositories/customerRepository.js";
import customerImportRepository from "../repositories/customerImportRepository.js";
import { validateCustomer } from "../utils/validate.js";
import { formatCustomer } from "../utils/formats.js";

async function listAll() {
    return await customerImportRepository.listAll();
}

async function addFileQueue(file) {
    const { id } = await customerImportRepository.createCustomerImport(file);

    const queueName = 'import-customers';
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    await channel.assertQueue(queueName, { durable: true });
    channel.sendToQueue(queueName, Buffer.from(JSON.stringify({ id, path: file.path })));

    await channel.close();
    await connection.close();
    return;
}

async function importFile(id, path) {
    const parser = fs
        .createReadStream(path)
        .pipe(parse({
            delimiter: ',',
            columns: true,
            skip_empty_lines: true
        }));


    const results = [];
    let rowNumber = 0;

    for await (const record of parser) {
        rowNumber++;

        const formattedCustomer = formatCustomer(record);
        const { isValid } = validateCustomer(formattedCustomer, {});
        if (isValid) results.push(formattedCustomer);
    }

    const success = [];
    results.forEach(async (customer) => {
        try {
            const exist = await customerRepository.findByCpf(customer.cpf);
            if (!exist && success.find((c) => c.cpf === customer.cpf) === undefined) {
                await customerRepository.create(customer);
                success.push(customer);
            }
        } catch (error) { }
    });

    await customerImportRepository.doneCustomerImport(id);
    return;
}

export default {
    listAll,
    addFileQueue,
    importFile
}