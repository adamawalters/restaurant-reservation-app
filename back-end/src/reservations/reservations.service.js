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

function read(reservation_id) {
    return knex("reservations")
            .select("*")
            .where({reservation_id : reservation_id})
        }


module.exports = {
    list,
    create,
    read,
}