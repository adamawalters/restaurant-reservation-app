import React from "react";

function CancelButton({history}) {
  const cancelBtn = (
    <button
      type="button"
      className="btn btn-danger"
      onClick={() => history.goBack()}
    >
      Cancel
    </button>
  );

    return cancelBtn;
}

export default CancelButton;