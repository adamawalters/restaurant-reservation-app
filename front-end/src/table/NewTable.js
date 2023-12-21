import React, {useState} from "react";
import ErrorAlert from "../layout/ErrorAlert";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import TableForm from "./TableForm";

function NewTable(){

    const [newTableError, setNewTableError] = useState(null);
    const history = useHistory();

    const initialTableForm = {
        table_name: "",
        capacity: "",
    }
    const [tableForm, setTableForm] = useState({...initialTableForm})

    function handleChange(e){
        setTableForm({
            ...tableForm,
            [e.target.name] : e.target.value
        })
    }

    function submitTable(e){
        e.preventDefault();
        console.log(`Table submitted!`)
    }

    return (
        <main>
          <h1>New Table</h1>
          <div className="d-md-flex mb-3">
            <h4 className="mb-0">Seat a table</h4>
          </div>
          <ErrorAlert error={newTableError} />
          <TableForm history={history} tableForm={tableForm} handleChange={handleChange} submitHandler={submitTable}/>
        </main>
      );
}

export default NewTable;