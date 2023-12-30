import React from "react";

import { Redirect, Route, Switch } from "react-router-dom";
import Dashboard from "../dashboard/Dashboard";
import NotFound from "./NotFound";
import NewReservation from "../reservations/NewReservation";
import NewTable from "../table/NewTable";
import SeatReservation from "../reservations/SeatReservation";
import SearchReservation from "../reservations/SearchReservation";
import EditReservation from "../reservations/EditReservation";

/**
 * Defines all the routes for the application.
 *
 * @returns {JSX.Element}
 */

function Routes() {
  return (
    <Switch>
      <Route exact={true} path="/">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route exact={true} path="/reservations">
        <Redirect to={"/dashboard"} />
      </Route>
      <Route path="/dashboard">
        <Dashboard />
      </Route>
      <Route path="/reservations/new">
          <NewReservation />
      </Route>
      <Route path="/tables/new">
          <NewTable />
      </Route>
      <Route path="/reservations/:reservation_id/seat">
          <SeatReservation />
      </Route>
      <Route path="/search">
        <SearchReservation />
      </Route>
      <Route path="/reservations/:reservation_id/edit">
        <EditReservation />
      </Route>
      <Route>
        <NotFound />
      </Route>
    </Switch>
  );
}

export default Routes;
