import db from "../config/db.js";

async function createConfig(config) {
  return await db.config.create({
    data: {
      key: config.key,
      value: config.value,
    },
  })
}

async function findByKey(key) {
  return await db.config.findFirst({
    where: {
      key: key,
    }
  })
}

async function updateConfig(key, value) {
  return await db.config.upsert({
    where: {
      key: key,
    },
    create: {
      key: key,
      value: value,
    },
    update: {
      value: value,
    },
  })
}

export default {
  createConfig,
  findByKey,
  updateConfig,
};
