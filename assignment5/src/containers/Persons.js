import React, { Component } from "react";
import { connect } from "react-redux";

import Person from "../components/Person/Person";
import AddPerson from "../components/AddPerson/AddPerson";

class Persons extends Component {
    state = {
        persons: []
    };

    personAddedHandler = () => {
        const newPerson = {
            id: Math.random(), // not really unique but good enough here!
            name: "Max",
            age: Math.floor(Math.random() * 40)
        };
        this.props.onAddPerson(newPerson);
    };

    personDeletedHandler = (personId) => {
        this.setState((prevState) => {
            return {
                persons: prevState.persons.filter(
                    (person) => person.id !== personId
                )
            };
        });
    };

    render() {
        return (
            <div>
                <AddPerson personAdded={this.personAddedHandler} />
                {this.props.persons.map((person) => (
                    <Person
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        clicked={() => this.props.onRemovePerson(person.id)}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        persons: state.persons
    };
};

const mapDispathToProps = (dispatch) => {
    return {
        onAddPerson: (person) =>
            dispatch({ type: "ADD_PERSON", person: person }),
        onRemovePerson: (id) =>
            dispatch({ type: "REMOVE_PERSON", personId: id })
    };
};

export default connect(mapStateToProps, mapDispathToProps)(Persons);
