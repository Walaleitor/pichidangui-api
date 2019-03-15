let reservaMenorAHoy = (reserva) => {
    let today = new Date(Date.now());

    if (reserva.getYear() <= today.getYear()) {

        if (reserva.getYear() < today.getYear()) {
            return true;
        }

        if (reserva.getMonth() <= today.getMonth()) {

            if (reserva.getMonth() < today.getMonth()) {
                return true;

            }

            if (reserva.getDate() < today.getDate()) {
                return true
            }

        }

    }
    return false;
}

module.exports = {
    reservaMenorAHoy
}