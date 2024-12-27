export const formatCpf = (value) => {
    value = value.replace(/\D/g, "")
    if (value.length > 11) value = value.subString(0, 11);
    if (value.length < 11) value = value.padStart(11, "0");
    return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{2})$/, "$1-$2");
};

export const formatPhone = (value) => {
    if (value.length > 16) value = value.subString(0, 16);
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d{4})$/, "$1-$2");
};

export const formatCep = (value) => {
    value = value.replace(/\D/g, "")
    if (value.length > 8) value = value.subString(0, 9);
    if (value.length < 8) value = value.padStart(8, "0");
    return value.replace(/(\d{5})(\d{2})/, "$1-$2")
};

export const formatName = (value) => {
    if (!value || value?.length === 0) return "";
    const name = value.split(" ");
    return name.reduce((acc, n) => {
        if (["DA", "DE", "DO", "DAS", "DOS"].includes(n.toUpperCase())) return acc + (acc.length > 0 ? " " : "") + n.toLowerCase();
        else if (n.replace(".", "").toUpperCase() === "JR") return acc + (acc.length > 0 ? " " : "") + "Junior";
        else if (n.includes(".")) return acc;
        else if (n.length === 1) return acc + (acc.length > 0 ? " " : "") + n.toUpperCase();
        else if (n.length > 1) {
            return acc + (acc.length > 0 ? " " : "") + n[0].toUpperCase() + n.substring(1).toLowerCase();
        } else return acc
    }, "");
};

export const formatCity = (value) => {
    if (!value || value?.length === 0) return "";
    const name = value.split(" ");
    return name.reduce((acc, n) => {
        if (["DA", "DE", "DO", "DAS", "DOS"].includes(n.toUpperCase())) return acc + (acc.length > 0 ? " " : "") + n.toLowerCase();
        else
            return acc + (acc.length > 0 ? " " : "") + n[0].toUpperCase() + n.substring(1).toLowerCase();
    }, "");
};

export const formatTime = (value) => {
    if (value.length > 5) value = value.subString(0, 5);
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{2})/, "$1:$2")
};

export const formatAddress = (value) => {
    const name = value.split(" ");
    return formatCity(name.slice(1, name.length).join(" ")) + " " + name[0];
};

export const formatCustomer = (record) => {
    const customer = {
        name: record["Nome"] && formatName(record["Nome"]),
        phone: record["Telefone"] && formatPhone(record["Telefone"]),
        cpf: record["CPF"] && formatCpf(record["CPF"]),
        city: record["Cidade"] && formatCity(record["Cidade"]),
        state: record["Estado"] && formatName(record["Estado"], true),
        address: record["Endereço"] && formatAddress(record["Endereço"]),
        cep: record["CEP"] && formatCep(record["CEP"]),
    };
    return customer;
}