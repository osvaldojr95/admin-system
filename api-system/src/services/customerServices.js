import { parse } from "csv-parse";
import fs from "fs";
import customerRepository from "../repositories/customerRepository.js";

async function create(customer) {
    await customerRepository.create(customer);
}

async function listAll() {
    return await customerRepository.listAll();
}

// async function importFile(file) {
//     const parser = fs
//         .createReadStream(file.path)
//         .pipe(parse({
//             delimiter: ',',
//             columns: true,
//             skip_empty_lines: true
//         }));

//     const columns = [
//         {
//             headername: "Nome",
//             field: "name",
//         },
//         {
//             headername: "CPF",
//             field: "cpf",
//         },
//         {
//             headername: "Telefone",
//             field: "phone",
//         },
//         {
//             headername: "Endereço",
//             field: "address",
//         },
//         {
//             headername: "Cidade",
//             field: "city",
//         },
//         {
//             headername: "Estado",
//             field: "state",
//         },
//         {
//             headername: "CEP",
//             field: "cep",
//         },
//     ];
//     const results = [];
//     const errors = [];
//     let rowNumber = 0;

//     for await (const record of parser) {
//         rowNumber++;

//         const isValid = validateCustomer(customer, setError))


//         results.push(record);
//         // try {
//         //     if (!record.name || !record.email) {
//         //         throw new Error('Missing required fields');
//         //     }

//         //     const processedRecord = {
//         //         name: record.name.trim(),
//         //         email: record.email.toLowerCase(),
//         //         age: record.age ? parseInt(record.age) : null,
//         //         processedAt: new Date()
//         //     };

//         //     results.push(processedRecord);
//         // } catch (err) {
//         //     errors.push({
//         //         row: rowNumber,
//         //         data: record,
//         //         error: err.message
//         //     });
//         // }
//     }

//     console.log(results.slice(0, 2));

//     return { results, errors };
// }

async function importFile(file) {
    console.log(file);
    return;
}

export default {
    create,
    listAll,
    importFile
};
