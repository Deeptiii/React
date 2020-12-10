import React, { useState } from "react";

import "./AddPerson.css";

const AddPerson = (props) => {
    const [name, setName] = useState("");
    const [age, setAge] = useState(null);

    const nameChangeHandler = (event) => {
        setName(event.target.value);
    };
    const ageChangeHandler = (event) => {
        setAge(event.target.value);
    };
    return (
        <div className="AddPerson">
            <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={nameChangeHandler}
            />
            <input
                type="number"
                placeholder="Age"
                value={age}
                onChange={ageChangeHandler}
            />
            <button onClick={() => props.personAdded(name, age)}>
                Add Person
            </button>
        </div>
    );
};

export default AddPerson;
