/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");
const { update } = require("../db/connection");

async function list(req, res) {
  const { date } = res.locals;
  res.json({
    data: await service.list(date),
  });
}

async function read(req, res) {
  const { reservation_id } = req.params;
  res.json({
    data: await service.read(reservation_id),
  });
}

async function create(req, res) {
  const { data } = res.locals;
  const response = await service.create(data);
  res.status(201).json({ data: response });
}

async function updateStatus(req, res){
  const {reservation} = res.locals;
  const {status} = res.locals;
  const response = await service.updateStatus(reservation.reservation_id, status)
  res.json({
    data : response
  })
}

/*Validation functions  */

function urlHasDate(req, res, next) {
  const { date } = req.query;

  if (date) {
    res.locals.date = date;
    return next();
  }

  return next({
    status: 400,
    message: `URL must contain a date in the query parameters to list reservations.`,
  });
}

const requiredProperties = [
  "first_name",
  "last_name",
  "mobile_number",
  "reservation_date",
  "reservation_time",
  "people",
];

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

function peoplePropertyIsPositive(req, res, next) {
  const {
    data: { people },
  } = res.locals;

  if (typeof people !== "number" || people < 1) {
    return next({
      status: 400,
      message: `"people (number of guests) " needs to be a positive integer.`,
    });
  }

  next();
}

function reservationDateIsValid(req, res, next) {
  const {
    data: { reservation_date },
  } = res.locals;
  if (isNaN(new Date(reservation_date))) {
    return next({
      status: 400,
      message: `"reservation_date" is invalid - should be YYYY-MM-DD`,
    });
  }

  next();
}

function reservationTimeIsValid(req, res, next) {
  const {
    data: { reservation_time },
  } = res.locals;
  const regex = new RegExp(
    /^(?:[01]?[0-9]|2[0-3]):[0-5]?[0-9](?::[0-5]?[0-9])?$/
  );

  if (!regex.test(reservation_time)) {
    return next({
      status: 400,
      message: `"reservation_time" is invalid - should be HH:MM:SS`,
    });
  }

  next();
}

function reservationIsFutureAndRestaurantIsOpen(req, res, next) {
  const {
    data: { reservation_date, reservation_time },
  } = res.locals;

  const [year, month, day] = reservation_date.split("-");
  const [hour, minutes] = reservation_time
    .split(":")
    .map((time) => Number(time));

  const reservationDate = new Date(year, month - 1, day);
  const weekDay = reservationDate.getDay();
  const now = new Date();
  now.setHours(0, 0, 0, 0);

  let errorString = "";

  if (reservationDate.getTime() < now.getTime()) {
    errorString += `Reservation must be in the future.`;
  }

  if (weekDay === 2) {
    errorString += `No reservations on Tuesdays as the restaurant is closed. `;
  }

  if ((hour === 10 && minutes < 30) || hour < 10) {
    errorString += `Restaurant opens at 10:30 AM. `;
  }

  if ((hour === 21 && minutes > 30) || hour > 21) {
    errorString += `Last reservation is at 9:30 PM. `;
  }

  errorString
    ? next({
        status: 400,
        message: errorString,
      })
    : next();
}

function bodyHasRequiredProperties(propertiesList) {
  return function (req, res, next) {
    const { data = {} } = req.body;

    propertiesList.forEach((property) => {
      if (!data[property]) {
        return next({
          status: 400,
          message: `Body needs a "${property}" property.`,
        });
      }
    });

    res.locals.data = data;

    next();
  };
}

async function reservationExists(req, res, next) {
  const { reservation_id } = req.params;

  const response = await service.read(reservation_id);

  if (response) {
    res.locals.reservation = response;
    return next();
  }

  next({
    status: 404,
    message: `Reservation ${reservation_id} does not exist.`,
  });
}

const validReservationStatuses = ["booked", "seated", "finished"];
const requiredReservationStatusProperties = ["status"];

async function reservationStatusIsValid(req, res, next) {
  const { data: {status} } = req.body;
  if (!validReservationStatuses.includes(status)) {
    return next({
      status: 400,
      message: `Reservation status "${status}" is invalid.`,
    });
  }
  res.locals.status = status;
  next();

}

module.exports = {
  list: [urlHasDate, asyncErrorBoundary(list)],
  create: [
    bodyHasRequiredProperties(requiredProperties),
    bodyOnlyHasRequiredProperties(requiredProperties),
    peoplePropertyIsPositive,
    reservationDateIsValid,
    reservationTimeIsValid,
    reservationIsFutureAndRestaurantIsOpen,
    asyncErrorBoundary(create),
  ],
  read: [asyncErrorBoundary(reservationExists), asyncErrorBoundary(read)],
  updateStatus: [
    asyncErrorBoundary(reservationExists),
    bodyHasRequiredProperties(requiredReservationStatusProperties),
    asyncErrorBoundary(reservationStatusIsValid),
    updateStatus,
  ],
};
