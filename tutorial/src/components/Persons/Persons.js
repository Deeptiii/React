import React, { Component } from "react";
import Person from "./Person/Person";

export class Persons extends Component {
    render() {
        console.log("[persons.js] rendering...");
        return this.props.persons.map((person, index) => {
            return (
                <Person
                    key={person.id}
                    name={person.name}
                    age={person.age}
                    click={() => this.props.click(index)}
                    changed={(event) => this.props.changed(event, person.id)}
                />
            );
        });
    }
}

export default Persons;
