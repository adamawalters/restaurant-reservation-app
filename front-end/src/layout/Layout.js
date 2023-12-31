import React from "react";
import Menu from "./Menu";
import Routes from "./Routes";
import "./Layout.css";

/**
 * Defines the main layout of the application.
 *
 *
 * @returns {JSX.Element}
 */
function Layout() {
  return (
    <div className="container-fluid" style={{height: "100%"}}>
      <div id="main-row" className="row">
        <div className="col-md-2 side-bar">
          <Menu />
        </div>
        <div className="col">
          <Routes />
        </div>
      </div>
    </div>
  );
}

export default Layout;
