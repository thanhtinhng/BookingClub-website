const removeVietnameseAccents = (str) => {
    return str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/Đ/g, "D")
    .toLowerCase();
};

const escapeRegex = (str) => {
    return str.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&');
}

export { removeVietnameseAccents, escapeRegex };