import React from "react";

function Button({name, eventHandler}) {
    const button = <button onclick={eventHandler}>{name}</button>;

    return button;
}

export default Button;