import React from "react";
import BuildControl from "./BuildControl/BuildControl";
import classes from "./BuildControls.css";

const controls = [
    { label: "Salad", type: "salad" },
    { label: "Bacon", type: "bacon" },
    { label: "Cheese", type: "cheese" },
    { label: "Meat", type: "meat" }
];

function BuildControls(props) {
    return (
        <div className={classes.BuildControls}>
            <p>
                Current Price: <strong> {props.price.toFixed(2)}</strong>
            </p>
            {controls.map((ctrl) => {
                return (
                    <BuildControl
                        key={ctrl.label}
                        label={ctrl.label}
                        added={() => props.ingredientAdded(ctrl.type)}
                        disabled={props.disabledInfo[ctrl.type]}
                        subtracted={() => props.ingredientRemoved(ctrl.type)}
                    />
                );
            })}
            <button
                className={classes.OrderButton}
                disabled={!props.purchasable}
                onClick={props.order}
            >
                {props.isAuth ? "ORDER NOW" : "SIGNUP TO ORDER"}
            </button>
        </div>
    );
}

export default BuildControls;
