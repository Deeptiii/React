import React from "react";

function WithClass(props) {
    return <div className={props.className}>{props.children}</div>;
}

export default WithClass;
