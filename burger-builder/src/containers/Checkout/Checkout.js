import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";
import CheckoutSummary from "../../components/Order/CheckoutSummary/CheckoutSummary";
import ContactData from "./ContactData/ContactData";
import { connect } from "react-redux";

class Checkout extends Component {
    onCheckoutCancelledHandler = () => {
        this.props.history.goBack();
    };
    onCheckoutContinuedHandler = () => {
        this.props.history.replace("/checkout/contact-data");
    };

    render() {
        let summary = <Redirect to="/" />;
        if (this.props.ings) {
            const purchaseRedirect = this.props.purchased ? (
                <Redirect to="/" />
            ) : null;
            summary = (
                <div>
                    {purchaseRedirect}
                    <CheckoutSummary
                        ingredients={this.props.ings}
                        onCheckoutCancelled={this.onCheckoutCancelledHandler}
                        onCheckoutContinued={this.onCheckoutContinuedHandler}
                    />
                    <Route
                        path={this.props.match.path + "/contact-data"}
                        component={ContactData}
                    />
                </div>
            );
        }
        return summary;
    }
}

const mapStatedToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    };
};

export default connect(mapStatedToProps)(Checkout);
