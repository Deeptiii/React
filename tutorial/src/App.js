import React from "react";
// import Radium, { StyleRoot } from "radium";
import "./App.css";
import Person from "./Person/Person";
import styled from "styled-components";

const StyledButton = styled.button`
    background-color: ${(props) => (props.alt ? "#d05c5c" : "#53a553")};
    color: white;
    border: none;
    padding: 8px;
    font: inherit;

    &:hover {
        background-color: ${(props) => (props.alt ? "red" : "lightgreen")};
        box-shadow: ${(props) =>
            props.alt ? "0 2px 12px 3px #b39696" : "0 2px 12px 3px #99a593"};
    }
`;

class App extends React.Component {
    state = {
        persons: [
            { id: 1, name: "Max", age: 32 },
            { id: 2, name: "Manu", age: 24 },
            { id: 3, name: "Sunny", age: 29 }
        ]
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

    render() {
        let persons = null;
        if (this.state.showPersons) {
            persons = (
                <div>
                    {this.state.persons.map((person, index) => {
                        return (
                            <Person
                                key={person.name}
                                name={person.name}
                                age={person.age}
                                click={this.deletePersonHandler.bind(
                                    this,
                                    index
                                )}
                                changed={(event) =>
                                    this.nameChangeHandler(event, person.id)
                                }
                            />
                        );
                    })}
                </div>
            );
        }

        let classes = [];
        if (this.state.persons.length <= 2) {
            classes.push("red");
        }
        if (this.state.persons.length <= 1) {
            classes.push("bold");
        }

        return (
            <div className="App">
                <h1>Hi I'm a React App!</h1>
                <p className={classes.join(" ")}>This is relly working!</p>
                <StyledButton
                    alt={this.state.showPersons}
                    onClick={this.togglePersonHandler}
                >
                    Toggle Persons
                </StyledButton>
                {persons}
            </div>
        );
    }
}

export default App;
