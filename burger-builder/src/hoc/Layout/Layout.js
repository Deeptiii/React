import React from "react";
import Aux from "../_Aux/_Aux";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import { connect } from "react-redux";

class Layout extends React.Component {
    state = {
        showSideDrawer: false
    };
    sideDrawerClosedHandler = () => {
        this.setState({
            showSideDrawer: false
        });
    };

    toggleSidebarHandler = () => {
        // const showSideDrawer = this.state.showSideDrawer;
        this.setState((prevState) => {
            return { showSideDrawer: !prevState.showSideDrawer };
        });
    };
    render() {
        return (
            <Aux>
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    toggleSidebar={this.toggleSidebarHandler}
                />
                <SideDrawer
                    isAuth={this.props.isAuthenticated}
                    open={this.state.showSideDrawer}
                    closed={this.sideDrawerClosedHandler}
                />
                <main className={classes.Content}>{this.props.children}</main>
            </Aux>
        );
    }
}

const mapStateToprops = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToprops)(Layout);
