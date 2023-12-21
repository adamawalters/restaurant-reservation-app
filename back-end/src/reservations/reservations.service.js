const knex = require("../db/connection")


function list(date){
    return knex("reservations")
        .select("*")
        .where({reservation_date : date})
        .orderBy("reservation_time")

}

function create(data){
    return knex("reservations")
            .insert(data)
            .returning("*")
            .then((response) => response[0])
}


module.exports = {
    list,
    create,
}