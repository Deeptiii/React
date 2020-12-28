import React from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

const Checkout = (props) => {
    const onCheckoutCancelledHandler = () => {
        props.history.goBack();
    };
    const onCheckoutContinuedHandler = () => {
        props.history.replace("/checkout/contact-data");
    };

    let summary = <Redirect to="/" />;
    if (props.ings) {
        const purchaseRedirect = props.purchased ? <Redirect to="/" /> : null;
        summary = (
            <div>
                {purchaseRedirect}
                <CheckoutSummary
                    ingredients={props.ings}
                    onCheckoutCancelled={onCheckoutCancelledHandler}
                    onCheckoutContinued={onCheckoutContinuedHandler}
                />
                <Route
                    path={props.match.path + "/contact-data"}
                    component={ContactData}
                />
            </div>
        );
    }
    return summary;
};

const mapStatedToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStatedToProps)(Checkout);
