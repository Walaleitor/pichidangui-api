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


let obtenerNombreMes = (month) => {
    if (month === 0) {
        return "Enero";
    } else if (month === 1) {
        return "Febrero"
    } else if (month === 2) {
        return "Marzo"
    } else if (month === 3) {
        return "Abril"
    } else if (month === 4) {
        return "Mayo"
    } else if (month === 5) {
        return "Junio"
    } else if (month === 6) {
        return "Julio"
    } else if (month === 7) {
        return "Agosto"
    } else if (month === 8) {
        return "Septiembre"
    } else if (month === 9) {
        return "Octubre"
    } else if (month === 10) {
        return "Noviembre"
    } else if (month === 11) {
        return "Diciembre"
    }
}

module.exports = {
    reservaMenorAHoy,
    obtenerNombreMes
}