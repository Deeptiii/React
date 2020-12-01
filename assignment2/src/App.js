import React from "react";
import "./App.css";
import Char from "./CharComponent/Char";
import Validation from "./Validation/Validation";

class App extends React.Component {
    state = {
        textLen: 0,
        text: ""
    };

    lenChangeHandler = (event) => {
        const text = event.target.value;
        const len = text.length;
        this.setState({
            textLen: len,
            text: text
        });
    };

    deleteCharHandler = (charIndex) => {
        const text = this.state.text;
        const textArr = text.split("");
        textArr.splice(charIndex, 1);
        this.setState({
            text: textArr.join("")
        });
    };

    render() {
        return (
            <div className="App">
                <input
                    style={{
                        display: "flex",
                        width: "100%",
                        alignItems: "center",
                        justifyContent: "center",
                        margin: "16px"
                    }}
                    type="text"
                    onChange={this.lenChangeHandler}
                    value={this.state.text}
                />

                <Validation len={this.state.textLen} />

                {this.state.text.split("").map((c, index) => (
                    <Char
                        char={c}
                        click={() => this.deleteCharHandler(index)}
                    />
                ))}
            </div>
        );
    }
}

export default App;
