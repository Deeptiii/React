import React, { Component } from "react";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Burger from "../../components/Burger/Burger";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../../hoc/_Aux/_Aux";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import { connect } from "react-redux";
import * as actions from "../../store/actions/index";

export class BurgerBuilder extends Component {
    state = {
        purchasing: false
    };

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState = (ingredients) => {
        const sum = Object.keys(ingredients)
            .map((igKey) => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);

        return sum > 0;
    };

    purchaseHandler = () => {
        if (this.props.isAuthenticated) {
            this.setState({ purchasing: true });
        } else {
            this.props.onSetAuthRedirectPath("/checkout");
            this.props.history.push("/auth");
        }
    };
    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    };

    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push("/checkout");
    };

    render() {
        const disabledInfo = {
            ...this.props.ings
        };

        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0;
        }

        let orderSummary = null;

        if (this.state.loading) {
            orderSummary = <Spinner />;
        }

        let burger = this.props.error ? (
            <p>Ingredient's can't be loaded</p>
        ) : (
            <Spinner />
        );

        if (this.props.ings) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        disabledInfo={disabledInfo}
                        ingredientAdded={this.props.onIngredientAdd}
                        ingredientRemoved={this.props.onIngredientRemove}
                        price={this.props.price}
                        purchasable={this.updatePurchaseState(this.props.ings)}
                        order={this.purchaseHandler}
                        isAuth={this.props.isAuthenticated}
                    />
                </Aux>
            );

            orderSummary = (
                <OrderSummary
                    ingredients={this.props.ings}
                    price={this.props.price}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.purchaseContinueHandler}
                />
            );
        }
        return (
            <Aux>
                <Modal
                    show={this.state.purchasing}
                    modalClosed={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuthenticated: state.auth.token !== null
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        onIngredientAdd: (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemove: (ingName) =>
            dispatch(actions.removeIngredient(ingName)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onInitPurchase: () => dispatch(actions.purchaseInit()),
        onSetAuthRedirectPath: (path) =>
            dispatch(actions.setAuthRedirectPath(path))
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withErrorHandler(BurgerBuilder, axios));
