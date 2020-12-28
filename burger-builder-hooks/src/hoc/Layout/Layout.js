import React, { useState } from "react";
import Aux from "../_Aux/_Aux";
import SideDrawer from "../../components/Navigation/SideDrawer/SideDrawer";
import Toolbar from "../../components/Navigation/Toolbar/Toolbar";
import classes from "./Layout.css";
import { connect } from "react-redux";

const Layout = (props) => {
    const [showSideDrawer, setShowSideDrawer] = useState(false);
    const sideDrawerClosedHandler = () => {
        setShowSideDrawer(false);
    };

    const toggleSidebarHandler = () => {
        setShowSideDrawer(!showSideDrawer);
    };

    return (
        <Aux>
            <Toolbar
                isAuth={props.isAuthenticated}
                toggleSidebar={toggleSidebarHandler}
            />
            <SideDrawer
                isAuth={props.isAuthenticated}
                open={showSideDrawer}
                closed={sideDrawerClosedHandler}
            />
            <main className={classes.Content}>{props.children}</main>
        </Aux>
    );
};

const mapStateToprops = (state) => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToprops)(Layout);
