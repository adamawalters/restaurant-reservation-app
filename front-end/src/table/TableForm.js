import React from "react";
import SubmitButton from "../ui-elements/SubmitButton";
import CancelButton from "../ui-elements/CancelButton";

function TableForm({tableForm, history, handleChange, submitHandler}){

    const form = (
        <form onSubmit={submitHandler}>
          <div className="form-group">
            <label htmlFor="first_name">Table Name</label>
            <input
              type="text"
              className="form-control"
              id="table_name"
              name="table_name"
              value={tableForm.table_name}
              onChange={handleChange}
              minLength="2"
              required
              placeholder="Enter a table name"
            />
          </div>
          <div className="form-group">
            <label htmlFor="last_name">Capacity</label>
            <input
              type="number"
              className="form-control"
              id="capacity"
              name="capacity"
              value={tableForm.capacity}
              onChange={handleChange}
              placeholder="Enter a capacity (minimum 1)"
              min="1"
              required
            />
          </div>
          <div className="d-flex justify-content-between">
            <SubmitButton />
            <CancelButton history={history} />
          </div>
        </form>
      );
    
      return form;
}

export default TableForm;