import React, { useEffect } from "react";
import Order from "../../components/Order/Order";
import axios from "../../axios-orders";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from "../../store/actions/index";
import { connect } from "react-redux";

const Orders = (props) => {
    const { token, userId, onFetchOrders } = props;
    useEffect(() => {
        onFetchOrders(token, userId);
    }, [token, userId, onFetchOrders]);

    return (
        <div>
            {props.orders.map((order) => (
                <Order
                    key={order.id}
                    ingredients={order.ingredients}
                    price={order.price}
                />
            ))}
        </div>
    );
};

const mapStateToProps = (state) => {
    return {
        orders: state.order.orders,
        token: state.auth.token,
        userId: state.auth.userId
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onFetchOrders: (token, userId) =>
            dispatch(actions.fetchOrders(token, userId))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(Orders, axios));
