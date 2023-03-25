const dateFormat = (date) => {
    let year = date.toLocaleString("default", { year: "numeric" });
    let month = date.toLocaleString("default", { month: "2-digit" });
    let day = date.toLocaleString("default", { day: "2-digit" });
    date = year + "-" + month + "-" + day;
    return date;
}

export default dateFormat;