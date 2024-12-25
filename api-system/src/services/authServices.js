import { v4 as uuid } from "uuid";
import configRepository from "../repositories/configRepository.js";

async function signIn(email, password) {
    const emailConfig = await configRepository.findByKey("email");
    if (!emailConfig) {
        throw { text: "", status: 404 };
    }

    const passwordConfig = await configRepository.findByKey("password");
    if (!passwordConfig) {
        throw { text: "", status: 404 };
    }

    if (email !== emailConfig.value || password !== passwordConfig.value) {
        throw { text: "", status: 401 };
    }

    const token = uuid();
    await configRepository.updateConfig("token", token);
    return token;
}

async function verifyToken(token) {
    const tokenConfig = await configRepository.findByKey("token");
    if (!tokenConfig) {
        throw { text: "", status: 404 };
    }

    if (token !== tokenConfig.value) {
        throw { text: "", status: 401 };
    }
}

export default {
    signIn,
    verifyToken
};
