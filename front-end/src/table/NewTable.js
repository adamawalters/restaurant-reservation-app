import React, { useState } from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TableForm from "./TableForm";
import { createTable } from "../utils/api";

function NewTable() {
  const [newTableError, setNewTableError] = useState(null);
  const history = useHistory();
  let abortController = new AbortController();

  const initialTableForm = {
    table_name: "",
    capacity: "",
  };
  const [tableForm, setTableForm] = useState({ ...initialTableForm });

  function handleChange(e) {
    setTableForm({
      ...tableForm,
      [e.target.name]: e.target.value,
    });
  }

  async function submitTable(e) {
    e.preventDefault();
    abortController.abort();
    abortController = new AbortController();

    try {
      await createTable(tableForm, abortController.signal);
      history.push("/");
    } catch (error) {
        setNewTableError(error);
    }

  }

  return (
    <main style={{height: "100%", overflow: "hidden"}}>
      <h1>New Table</h1>
      <div className="d-md-flex mb-3">
        <h4 className="mb-0">Create a table where reservations can be seated</h4>
      </div>
      <ErrorAlert error={newTableError} />
      <TableForm
        history={history}
        tableForm={tableForm}
        handleChange={handleChange}
        submitHandler={submitTable}
      />
    </main>
  );
}

export default NewTable;
