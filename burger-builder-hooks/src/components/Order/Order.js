import React from "react";
import classes from "./Order.css";

function Order(props) {
    let price = +props.price;
    const ingredientSummary = Object.keys(props.ingredients).map((igKey) => {
        return (
            <li key={igKey}>
                <span style={{ textTransform: "capitalize" }}>{igKey}</span>(
                {props.ingredients[igKey]})
            </li>
        );
    });
    return (
        <div className={classes.Order}>
            <p>Ingredients: </p>
            {ingredientSummary}
            <p>
                Price: <strong>USD {price.toFixed(2)}</strong>
            </p>
        </div>
    );
}

export default Order;
