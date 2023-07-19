exports.getDate = function () {

    const today = new Date();
    const options = {
        date: "long",
        weekday: "long",
        day: "numeric",
        month: "long",
        hour: "numeric",
        minute: "numeric"

    };
    return today.toLocaleDateString("en-IN", options);
}

exports.getDay = function () {
    const today = new Date();
    const options = {
        weekday: "long",
    };
    return today.toLocaleDateString("en-IN", options);
}