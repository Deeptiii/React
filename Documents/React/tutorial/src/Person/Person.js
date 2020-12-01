import React from 'react';
import './Person.css'

const Person = (props)=> {
    return (
        <div className='Person'>
    <p onClick={props.click}>I'm a Person. My name is {props.name}. My age is {props.age}. {props.children}</p>
    {props.changed && <input type="text" onChange={props.changed} value={props.name}/>}
    </div>
    )
}

export default Person;