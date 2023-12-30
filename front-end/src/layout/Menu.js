import React, { useRef, useEffect } from "react";

import { Link, useLocation } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {
  const dashboard = useRef(null);
  const search = useRef(null);
  const newReservation = useRef(null);
  const newTable = useRef(null);
  const {pathname} = useLocation();


  useEffect(()=>{
    const refs = [dashboard, search, newReservation, newTable]
    refs.forEach((ref) => ref.current.className = `nav-link text-white`)

    if(pathname.startsWith("/dashboard")) {
      dashboard.current.className = `nav-link active`
    } else if (pathname.startsWith("/search")){
      search.current.className = `nav-link active`
    } else if (pathname.startsWith("/reservations/new")){
      newReservation.current.className = `nav-link active`
    } else if (pathname.startsWith("/tables/new")) {
      newTable.current.className = `nav-link active`
    }
  }, [pathname]) 




  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0 mb-md-3"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul
          className="nav nav-pills text-light d-flex flex-row d-md-block"
          id="accordionSidebar"
        >
          <li className="nav-item mx-1 mx-md-0 my-1 my-md-0 my-1 my-md-0">
            <Link
              className="nav-link text-white"
              to="/dashboard"
              ref={dashboard}
            >
              <span className="oi oi-dashboard mr-1" />
              <span className="d-none d-md-inline">&nbsp;Dashboard</span>
            </Link>
          </li>
          <li className="nav-item mx-1 mx-md-0 my-1 my-md-0">
            <Link
              className="nav-link text-white"
              to="/search"
              ref={search}
            >
              <span className="oi oi-magnifying-glass mr-1" />
              <span className="d-none d-md-inline">&nbsp;Search</span>
            </Link>
          </li>
          <li className="nav-item mx-1 mx-md-0 my-1 my-md-0">
            <Link
              className="nav-link text-white"
              to="/reservations/new"
              ref={newReservation}
            >
              <span className="oi oi-plus mr-1" />
              <span className="d-none d-md-inline">&nbsp;New Reservation</span>
            </Link>
          </li>
          <li className="nav-item mx-1 mx-md-0 my-1 my-md-0">
            <Link
              className="nav-link"
              to="/tables/new"
              ref={newTable}
            >
              <span className="oi oi-layers mr-1" />
              <span className="d-none d-md-inline">&nbsp;New Table</span>
            </Link>
          </li>
        </ul>
        <div className="text-center d-none d-md-inline">
          <button
            className="btn rounded-circle border-0"
            id="sidebarToggle"
            type="button"
          />
        </div>
      </div>
    </nav>
  );
}

export default Menu;
