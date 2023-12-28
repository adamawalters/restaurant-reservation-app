/**
 * Defines the base URL for the API.
 * The default values is overridden by the `API_BASE_URL` environment variable.
 */
import formatReservationDate from "./format-reservation-date";
import formatReservationTime from "./format-reservation-time";

const API_BASE_URL =
  process.env.REACT_APP_API_BASE_URL || "http://localhost:5001";

/**
 * Defines the default headers for these functions to work with `json-server`
 */
const headers = new Headers();
headers.append("Content-Type", "application/json");

/**
 * Fetch `json` from the specified URL and handle error status codes and ignore `AbortError`s
 *
 * This function is NOT exported because it is not needed outside of this file.
 *
 * @param url
 *  the url for the requst.
 * @param options
 *  any options for fetch
 * @param onCancel
 *  value to return if fetch call is aborted. Default value is undefined.
 * @returns {Promise<Error|any>}
 *  a promise that resolves to the `json` data or an error.
 *  If the response is not in the 200 - 399 range the promise is rejected.
 */
async function fetchJson(url, options, onCancel) {
  try {
    const response = await fetch(url, options);

    if (response.status === 204) {
      return null;
    }

    const payload = await response.json();

    if (payload.error) {
      return Promise.reject({ message: payload.error });
    }
    return payload.data;
  } catch (error) {
    if (error.name !== "AbortError") {
      console.error(error.stack);
      throw error;
    }
    return Promise.resolve(onCancel);
  }
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservations(params, signal) {
  const url = new URL(`${API_BASE_URL}/reservations`);
  Object.entries(params).forEach(([key, value]) =>
    url.searchParams.append(key, value.toString())
  );
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Retrieves all existing reservation.
 * @returns {Promise<[reservation]>}
 *  a promise that resolves to a possibly empty array of reservation saved in the database.
 */

export async function listReservation(reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/reservations/${reservation_id}`);
  return await fetchJson(url, { headers, signal }, [])
    .then(formatReservationDate)
    .then(formatReservationTime);
}

/**
 * Creates a reservation.
 * @param reservationForm
 * The data to use to create the reservation
 * @param signal
 * The AbortController signal
 * @returns {Promise<{reservation}>}
 *  a promise that resolves to a reservation saved in the database with additional reservation_id, created_at, and updated_at fields.
 */
export async function createReservation(reservationForm, signal) {
  reservationForm.people = Number(reservationForm.people);

  const url = new URL(`${API_BASE_URL}/reservations`);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: reservationForm }),
    signal,
  };
  let response = await fetchJson(url, options, {});
  response = formatReservationDate(response);
  response = formatReservationTime(response);

  return response;
}

/**
 * Creates a table.
 * @param tableForm
 * The data to use to create the table (an object with table_name and capacity fields)
 * @param signal
 * The AbortController signal
 * @returns {Promise<{table}>}
 *  a promise that resolves to a table saved in the database with additional table_id, reservation_id, created_at, and updated_at fields.
 */
export async function createTable(tableForm, signal) {
  
  tableForm.capacity = Number(tableForm.capacity);
  const url = new URL(`${API_BASE_URL}/tables`);

  const options = {
    method: "POST",
    headers,
    body: JSON.stringify({ data: tableForm }),
    signal,
  };

  const response = await fetchJson(url, options, {});

  return response;
}

/**
 * Lists table in database.
 * @param signal
 * The AbortController signal
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possibly empty array of tables saved in the database.
 */
export async function listTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables`);
  const response = await fetchJson(url, { headers, method: "GET", signal }, []);
  return response;
}

/**
 * Lists available table in database.
 * @param signal
 * The AbortController signal
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possibly empty array of available tables saved in the database.
 */
export async function listAvailableTables(signal) {
  const url = new URL(`${API_BASE_URL}/tables?available=true`);
  const response = await fetchJson(url, { headers, method: "GET", signal }, []);
  return response;
}

/**
 * Adds reservation to  table in database.
 * @param table_id
 * The table_id to which the reservation will be assigned
 * @param reservation_id
 * The reservation_id that will be assigned to the table
 * @param signal
 * The AbortController signal
 * @returns {Promise<[table]>}
 *  a promise that resolves to a possibly empty array of available tables saved in the database.
 */
export async function updateTable(table_id, reservation_id, signal) {
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const response = await fetchJson(
    url,
    {
      headers,
      method: "PUT",
      body: JSON.stringify({
        data: {
          reservation_id: reservation_id
        },
      }),
      signal,
    },
    []
  );
  return response;
}

/**
 * Deletes reservation from  table in database.
 * @param table_id
 * The table_id to which the reservation will be assigned

 * @param signal
 * The AbortController signal
 * @returns null
 */
export async function removeReservationFromTable(table_id, signal){
  const url = new URL(`${API_BASE_URL}/tables/${table_id}/seat`);
  const response = await fetchJson(
    url,
    {
      headers,
      method: "DELETE",
      body: JSON.stringify({
        data: {
          table_id: table_id
        },
      }),
      signal,
    },
    []
  );
}
