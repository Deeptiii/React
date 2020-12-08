import React, { Component } from "react";

class Course extends Component {
    state = {
        title: null,
        id: null
    };
    componentDidMount() {
        this.loadedCourse();
    }

    componentDidUpdate() {
        this.loadedCourse();
    }

    loadedCourse = () => {
        if (
            this.props.match.params.id &&
            this.props.match.params.id !== this.state.id
        ) {
            const query = new URLSearchParams(this.props.location.search);
            for (let param of query.entries()) {
                this.setState({
                    title: param[1],
                    id: this.props.match.params.id
                }); // yields ['start', '5']
            }
        }
    };
    render() {
        console.log(this.props);
        return (
            <div>
                <h1>{this.state.title}</h1>
                <p>
                    You selected the Course with ID:{" "}
                    {this.props.match.params.id}
                </p>
            </div>
        );
    }
}

export default Course;
