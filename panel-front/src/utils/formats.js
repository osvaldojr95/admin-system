export const formatCpf = (value) => {
    if (value.length > 14) value.subString(0, 14);
    return value
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{2})$/, "$1-$2");
};

export const formatPhone = (value) => {
    if (value.length > 16) value.subString(0, 16);
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{4})(\d{4})$/, "$1-$2");
};

export const formatCep = (value) => {
    if (value.length > 9) value.subString(0, 9);
    return value
        .replace(/\D/g, "")
        .replace(/(\d{5})(\d{2})/, "$1-$2")
};

export const formatName = (value) => {
    if (!value || value?.length === 0) return "";
    const name = value.split(" ");
    return name.map((n) => {
        if (["DA", "DE", "DO", "DAS", "DOS"].includes(n.toUpperCase())) return n.toLowerCase();
        else
            return n[0].toUpperCase() + n.substring(1).toLowerCase();
    }).join(" ");
};

export const formatTime = (value) => {
    if (value.length > 5) value.subString(0, 5);
    return value
        .replace(/\D/g, "")
        .replace(/(\d{2})(\d{2})/, "$1:$2")
};

