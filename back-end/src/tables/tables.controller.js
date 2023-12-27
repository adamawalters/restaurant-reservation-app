/**
 * List handler for table resources
 */

const service = require("./tables.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");

async function list(req, res) {

  const {available} = req.query;
  if (available === "true") {
    res.json({
      data: await service.listAvailable(),
    }); 
  } else {
    res.json({
      data: await service.list(),
    });
  }
}

async function create(req, res) {
  const { data } = res.locals;
  const response = await service.create(data);
  res.status(201).json({ data: response, otherkey: "other!" });
}

async function update(req, res) {
  const { data } = res.locals;
  const { table } = res.locals;

  const response = await service.update(data.reservation_id, table.table_id);

  res.json({ data: response });
}

/*Validation functions  */

const requiredProperties = ["table_name", "capacity"];
const requiredReservationProperties = ["reservation_id"];

function bodyHasRequiredProperties(propertiesList) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    propertiesList.forEach((property) => {
      if (!data[property]) {
        return next({
          status: 400,
          message: `Body needs to be an object containing a data key whose value is object containing a "${property}" property.`,
        });
      }
    });

    res.locals.data = data;

    next();
  };
}

function bodyOnlyHasRequiredProperties(propertiesList) {
  return function (req, res, next) {
    const { data } = res.locals;

    for (let key of Object.keys(data)) {
      if (!propertiesList.includes(key)) {
        return next({
          status: 400,
          message: `Body has unecessary "${key}" property. Please only include required properties.`,
        });
      }
    }
    next();
  };
}

function tableCapacityIsANumber(req, res, next) {
  const {data : {capacity}} = res.locals;
  if(typeof capacity !== "number" || isNaN(capacity)){
    return next({
      status: 400,
      message: `capacity must be a number`
    })
  }

  next();
}

async function tableExists(req, res, next) {
  const { table_id } = req.params;

  const response = await service.read(table_id);

  if (response) {
    res.locals.table = response;
    return next();
  }

  next({
    status: 404,
    message: `table_id ${table_id} not found`,
  });
}

async function reservationExists(req, res, next) {
  const {
    data: { reservation_id },
  } = res.locals;
  const response = await service.readReservation(reservation_id);

  if (response) {
    res.locals.reservation = response;
    return next();
  }

  return next({
    status: 404,
    message: `Reservation ${reservation_id} does not exist.`,
  });
}

function tableSeatsReservation(req, res, next) {
  const { table } = res.locals;
  const { reservation } = res.locals;

  if (reservation.people > table.capacity) {
    return next({
      status: 400,
      message: `Table ${table.table_id} has capacity ${table.capacity} but reservation is for ${reservation.people} people.`,
    });
  }

  next();
}

function tableIsUnoccupied(req, res, next) {
  const { table } = res.locals;

  if (table.reservation_id) {
    return next({
      status: 400,
      message: `Table ${table.table_id} is occupied.`,
    });
  }

  next();
}

function tableNameIsTwoCharsOrMore(req, res, next) {
  const {
    data: { table_name },
  } = res.locals;
  if (table_name.length < 2) {
    return next({
      status: 400,
      message: `Length of table_name must be at least 2 characters.`,
    });
  }
  next();
}

function tableCapacityIsAtLeastOne(req, res, next) {
  const {
    data: { capacity },
  } = res.locals;
  if (capacity < 1) {
    return next({
      status: 400,
      message: `capacity must be at least 1.`,
    });
  }
  next();
}

module.exports = {
  list: [asyncErrorBoundary(list)],
  create: [
    bodyHasRequiredProperties(requiredProperties),
    bodyOnlyHasRequiredProperties(requiredProperties),
    tableNameIsTwoCharsOrMore,
    tableCapacityIsANumber,
    tableCapacityIsAtLeastOne,
    asyncErrorBoundary(create),
  ],
  update: [
    asyncErrorBoundary(tableExists),
    bodyHasRequiredProperties(requiredReservationProperties),
    bodyOnlyHasRequiredProperties(requiredReservationProperties),
    asyncErrorBoundary(reservationExists),
    tableSeatsReservation,
    tableIsUnoccupied,
    asyncErrorBoundary(update),
  ],
};
