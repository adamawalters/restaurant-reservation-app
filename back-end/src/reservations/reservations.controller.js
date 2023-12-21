/**
 * List handler for reservation resources
 */

const service = require("./reservations.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary")

async function list(req, res) {
  const {date} = res.locals;
  res.json({
    data: await service.list(date),
  });
}

async function create(req, res) {
  const {data} = res.locals;
  const response = await service.create(data);
  res.status(201).json({ data : response})
}


/*Validation functions  */


function urlHasDate(req, res, next) {

  const {date} = req.query;

  if(date) {
    res.locals.date = date;
    return next();
  } 

  return next({
    status: 400,
    message: `URL must contain date to list reservations`
  })

}


const requiredProperties = ["first_name", "last_name", "mobile_number", "reservation_date", "reservation_time", "people"];

function bodyOnlyHasRequiredProperties(req, res, next){
  const {data} = res.locals;

  for(let key of Object.keys(data)) {
    if(!requiredProperties.includes(key)) {
      return next({
        status: 400,
        message: `Body has unecessary "${key}" property. Please only include required properties.`
      })
    }
  }
  next();

}

function peoplePropertyIsPositive(req, res, next){
  const {data : {people}} = res.locals;
  if(isNaN(people) || people < 1){
    return next({
      status: 400,
      message: `"People" needs to be a positive integer`
    })
  }

  next();
}

function bodyHasRequiredProperties(req, res, next) {
  const {data = {}} = req.body;

  requiredProperties.forEach((property) => {
    if(!data[property]) {
      return next({
        status: 400,
        message: `Body needs "${property}" property.`
      })
    }
  })

  res.locals.data = data;

  next();

}


module.exports = {
  list: [urlHasDate, asyncErrorBoundary(list)],
  create: [
    bodyHasRequiredProperties,
    peoplePropertyIsPositive,
    bodyOnlyHasRequiredProperties,
    asyncErrorBoundary(create),
  ],
};
