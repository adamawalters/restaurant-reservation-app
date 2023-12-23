const knex = require("../db/connection")

function list(){
    return knex("tables")
        .select("*")
        .orderBy("table_name")

}

function read(table_id) {
    return knex("tables")
                .select("*")
                .where({table_id : table_id})
                .then((response) => response[0])
}

function create(data){
    return knex("tables")
            .insert(data)
            .returning("*")
            .then((response) => response[0])
}

function update(reservation_id, table_id){
    return knex("tables")
            .update({
                reservation_id : reservation_id
            })
            .where({
                table_id : table_id
            })
            .returning("*")
            .then((response) => response[0])
}

function readReservation(reservation_id) {
    return knex("reservations")
            .select("*")
            .where({reservation_id : reservation_id})
            .then((response) => response[0])
}


module.exports = {
    list,
    create,
    read,
    update,
    readReservation,
}