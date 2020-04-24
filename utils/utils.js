
function formatDate() {
    let t = new Date(),
        y = t.getFullYear(),
        month = (t.getMonth() + 1) < 10 ? '0' + (t.getMonth() + 1) : (t.getMonth() + 1),
        d = t.getDate() < 10 ? '0' + t.getDate() : t.getDate(),
        h = t.getHours() < 10 ? '0' + t.getHours() : t.getHours(),
        min = t.getMinutes() < 10 ? '0' + t.getMinutes() : t.getMinutes();
    return [month, d, y].join("/") + " " + [h, min].join(":");
}

module.exports = {
    formatDate:formatDate
}