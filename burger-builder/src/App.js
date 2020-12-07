import React from "react";
import BurgerBuilder from "./containers/BurgerBuilder/BurgerBuilder";
import Layout from "./hoc/Layout/Layout";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Layout>
                    <BurgerBuilder />
                </Layout>
            </div>
        );
    }
}

export default App;
