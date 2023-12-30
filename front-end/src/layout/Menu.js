import React, {useRef, useState, useEffect} from "react";

import { Link } from "react-router-dom";

/**
 * Defines the menu for this application.
 *
 * @returns {JSX.Element}
 */

function Menu() {


 /*  const dashboard = useRef(null);
  const search = useRef(null);
  const newReservation = useRef(null);
  const newTable = useRef(null);
  const [currentMenu, setCurrentMenu] = useState(dashboard);

  useEffect(()=>{
    currentMenu.current.className = "nav-link active"
    return () => currentMenu.current.className = "nav-link"
  }, [currentMenu]) */


  return (
    <nav className="navbar navbar-dark align-items-start p-0">
      <div className="container-fluid flex-column p-0">
        <Link
          className="navbar-brand d-flex justify-content-center align-items-center sidebar-brand m-0"
          to="/"
        >
          <div className="sidebar-brand-text mx-3">
            <span>Periodic Tables</span>
          </div>
        </Link>
        <hr className="sidebar-divider my-0" />
        <ul className="nav navbar-nav text-light d-flex flex-row d-md-block" id="accordionSidebar">
          <li className="nav-item mx-1 mx-md-0">
            <Link className="nav-link" to="/dashboard" onClick={()=>setCurrentMenu(dashboard)} ref={dashboard}>
              <span className="oi oi-dashboard" />
              &nbsp;Dashboard
            </Link>
          </li>
          <li className="nav-item mx-1 mx-md-0">
            <Link className="nav-link" to="/search" onClick={()=>setCurrentMenu(search)} ref={search}>
              <span className="oi oi-magnifying-glass" />
              &nbsp;Search
            </Link>
          </li>
          <li className="nav-item mx-1 mx-md-0">
            <Link className="nav-link" to="/reservations/new" onClick={()=>setCurrentMenu(newReservation)} ref={newReservation}>
              <span className="oi oi-plus" />
              &nbsp;New Reservation
            </Link>
          </li>
          <li className="nav-item mx-1 mx-md-0">
            <Link className="nav-link" to="/tables/new" onClick={()=>setCurrentMenu(newTable)} ref={newTable}>
              <span className="oi oi-layers" />
              &nbsp;New Table
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
