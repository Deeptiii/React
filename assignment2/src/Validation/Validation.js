import React from "react";

function Validation({ len }) {
    const style = {
        display: "flex",
        justifyContent: "center",
        margin: "16px auto"
    };
    return (
        <div style={style}>
            {len <= 5 ? "Text too short" : "Text long enough"}
        </div>
    );
}

export default Validation;
