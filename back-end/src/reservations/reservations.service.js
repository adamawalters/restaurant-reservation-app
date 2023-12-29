const knex = require("../db/connection")


function list(date){
    if(date) {
        return knex("reservations")
        .select("*")
        .where({reservation_date : date})
        .andWhereNot({status : "finished"})
        .orderBy("reservation_time")
    } else {
        return knex("reservations")
        .select("*")
        .andWhereNot({status : "finished"})
        .orderBy("reservation_time")
    }
    
}

function search(mobile_number){
    return knex("reservations")
    .whereRaw(
      "translate(mobile_number, '() -', '') like ?",
      `%${mobile_number.replace(/\D/g, "")}%`
    )
    .orderBy("reservation_date");
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
            .then((response)=> response[0])
        }

function updateStatus(reservation_id, newStatus) {
    return knex("reservations")
                .where({reservation_id : reservation_id})
                .update("status", newStatus)
                .returning("*")
                .then((response) => response[0])
}



module.exports = {
    list,
    create,
    read,
    updateStatus,
    search
}