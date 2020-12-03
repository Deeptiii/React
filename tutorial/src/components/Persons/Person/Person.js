import React from "react";
import Radium from "radium";
import PropTypes from "prop-types";
import "./Person.css";
import AuthContext from "../../../context/auth-context";

// const StyledDiv = styled.div`
//     width: 60%;
//     margin: 16px auto;

//     border: 1px solid #eee;
//     box-shadow: 0 2px 3px #ccc;
//     padding: 16px;
//     text-align: center;

//     @media (min-width: 500px) : {
//         width: "450px";
//     }
// `;

class Person extends React.Component {
    constructor(props) {
        super(props);
        this.inputElement = React.createRef();
    }

    static contextType = AuthContext;

    componentDidMount() {
        this.inputElement.current.focus();
    }

    render() {
        const props = this.props;
        return (
            <div className="Person">
                {/* <AuthContext.Consumer> */}
                {/* {(this.context) => */}
                {this.context.authenticated ? (
                    <p>Authenticated</p>
                ) : (
                    <p>Please login</p>
                )}
                {/* </AuthContext.Consumer> */}
                <p onClick={props.click}>
                    I'm a Person. My name is {props.name}. My age is {props.age}
                    . {props.children}
                </p>
                <input
                    type="text"
                    onChange={props.changed}
                    value={props.name}
                    ref={this.inputElement}
                />
            </div>
        );
    }
}

Person.propTypes = {
    name: PropTypes.string,
    click: PropTypes.func,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default Radium(Person);
