import React, { useEffect, useRef, useContext } from "react";
import AuthContext from "../../context/auth-context";
import WithClass from "../../hoc/WithClass";
import "./Cockpit.css";

const Cockpit = (props) => {
    const toggleBtnRef = useRef(null);
    const authContext = useContext(AuthContext);

    useEffect(() => {
        console.log("[Cockpit.js] useEffect");
        toggleBtnRef.current.click();
        // return () => {
        //     console.log("[Cockpit.js] Clean up");
        // };
    }, []);

    let classes = [];
    let btnClass = "";
    if (props.showPersons) {
        btnClass = "Red";
    }
    if (props.persons.length <= 2) {
        classes.push("red");
    }
    if (props.persons.length <= 1) {
        classes.push("bold");
    }
    return (
        <WithClass className="Cockpit">
            <h1>Hi I'm a React App!</h1>
            <p className={classes.join(" ")}>This is relly working!</p>
            <button
                ref={toggleBtnRef}
                className={btnClass}
                onClick={props.click}
            >
                Toggle Persons
            </button>

            {authContext.authenticated ? (
                <button onClick={authContext.login}>Logout</button>
            ) : (
                <button onClick={authContext.login}>Login</button>
            )}
        </WithClass>
    );
};

export default Cockpit;
