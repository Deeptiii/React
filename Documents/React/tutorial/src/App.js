import React from 'react'
import './App.css';
import Person from './Person/Person'

class App extends React.Component {
  state = {
    persons: [
      {name: 'Max', age: 32},
      {name: 'Manu', age: 24},
      {name: 'Sunny', age: 29},
    ]
  }

  switchNameHandler = (newName) => {
    this.setState({
      persons: [
        {name: newName, age: 32},
        {name: 'Manu', age: 24},
        {name: 'Riteish', age: 100},
      ]
    })
  }

  nameChangeHandler = (event) => {
    this.setState({
      persons: [
        {name: 'Max', age: 32},
        {name: event.target.value, age: 24},
        {name: 'Riteish', age: 100},
      ]
    });
  }

  render(){

    const style = {
      backgroundColor: 'white',
      border: '1px solid blue',
      padding: '8px',
      font: 'inherit'
    }

    return (
    <div className="App">
     <h1>Hi I'm a React App!</h1>
     <button style={style} onClick={() => this.switchNameHandler("Qwerty")}>Switch Name</button>
     <Person name={this.state.persons[0].name} age={this.state.persons[0].age} />     
     <Person 
          name={this.state.persons[1].name} 
          age={this.state.persons[1].age} 
          click = {this.switchNameHandler.bind(this, "Rie")}
          changed ={this.nameChangeHandler}
          >And I love going out</Person>
     <Person name={this.state.persons[2].name} age={this.state.persons[2].age} />
    </div>
    // return React.createElement("div", {className: 'App'}, React.createElement('h1',null ,'Hi I\'m a React App!'));
  
    );
  }
}

export default App;
