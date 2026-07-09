import React from "react";

const Alert = (props) => {
  const capitalize = (Word) => {
    if(Word === "danger") Word = "error";
    const lower = Word.toLowerCase();
    return lower.charAt(0).toUpperCase() + lower.slice(1);
  };

  return (
    props.alert && (
      <div
        className={`alert alert-${props.alert.type} alert-dismissible fade show`}
        role="alert"
        style={{ marginTop: "60px" }}
      >
        <strong> {capitalize(props.alert.type)} </strong>: {props.alert.msg}
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="alert"
          aria-label="Close"
        ></button>
      </div>
    )
  );
};

export default Alert;
