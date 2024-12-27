import db from "../config/db.js";

async function listAll() {
  const imports = await db.customerImport.findMany();
  const total = await db.customerImport.count();
  return { imports, total };
}

async function createCustomerImport(file) {
  return await db.customerImport.create({
    data: {
      fileName: file.originalname,
      path: file.path,
      status: 'PENDING',
      processingDate: null,
    },
    select: {
      id: true,
    },
  })
}

async function doneCustomerImport(id) {
  return await db.customerImport.update({
    where: {
      id: id,
    },
    data: {
      status: 'DONE',
      processingDate: new Date(Date.now()),
    },
  })
}

export default {
  listAll,
  createCustomerImport,
  doneCustomerImport,
};
