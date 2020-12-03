import React from "react";
import "./App.css";
import Persons from "../components/Persons/Persons";
import Cockpit from "../components/Cockpit/Cockpit";

import AuthContext from "../context/auth-context";

// import styled from "styled-components";
// import Radium, { StyleRoot } from "radium";
// const StyledButton = styled.button`
//     background-color: #53a553;
//     color: white;
//     border: none;
//     padding: 8px;
//     font: inherit;

//     &:hover {
//         background-color: lightgreen;
//         box-shadow: 0 2px 12px 3px #99a593;
//     }
// `;

class App extends React.Component {
    constructor(props) {
        super(props);
        console.log("[App.js] constructor");
    }

    state = {
        persons: [
            { id: 1, name: "Max", age: 32 },
            { id: 2, name: "Manu", age: 24 },
            { id: 3, name: "Sunny", age: 29 }
        ],
        showPersons: false,
        showCockpit: true,
        authenticated: false
    };

    // static getDerivedStateFromProps(props, state) {
    //     console.log("[App.js] getDerivedStateFromProps", props);
    //     return state;
    // }

    loginHandler = () => {
        const authenticated = this.state.authenticated;
        this.setState({ authenticated: !authenticated });
    };

    deletePersonHandler = (personIndex) => {
        // const persons = this.state.persons.slice();
        const persons = [...this.state.persons];
        persons.splice(personIndex, 1);
        this.setState({
            persons: persons
        });
    };

    nameChangeHandler = (event, id) => {
        const personIndex = this.state.persons.findIndex((p) => {
            return p.id === id;
        });

        const person = { ...this.state.persons[personIndex] };
        person.name = event.target.value;

        const persons = [...this.state.persons];
        persons[personIndex] = person;
        this.setState({
            persons: persons
        });
    };

    togglePersonHandler = () => {
        const doesShow = this.state.showPersons;
        this.setState({
            showPersons: !doesShow
        });
    };

    componentDidMount = () => {
        console.log("[App.js] componentDidMount");
    };

    removeCockpitHandler = () => {
        const showCockpit = this.state.showCockpit;
        this.setState({
            showCockpit: !showCockpit
        });
    };

    render() {
        console.log("[App.js] render");
        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    <Persons
                        persons={this.state.persons}
                        click={this.deletePersonHandler}
                        changed={this.nameChangeHandler}
                    />
                </div>
            );
        }

        return (
            <div className="App">
                <button onClick={this.removeCockpitHandler}>
                    Toggle Cockpit
                </button>
                <AuthContext.Provider
                    value={{
                        authenticated: this.state.authenticated,
                        login: this.loginHandler
                    }}
                >
                    {this.state.showCockpit ? (
                        <Cockpit
                            showPersons={this.state.showPersons}
                            persons={this.state.persons}
                            click={this.togglePersonHandler}
                            login={this.loginHandler}
                        />
                    ) : null}
                    {persons}
                </AuthContext.Provider>
            </div>
        );
    }
}

export default App;
