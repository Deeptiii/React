import React, { Component } from "react";
import axios from "../../../axios";
import Post from "../../../components/Post/Post";
import "./Posts.css";
import { Route } from "react-router-dom";
import FullPost from "../FullPost/FullPost";

export default class Posts extends Component {
    state = {
        posts: []
    };
    componentDidMount() {
        axios
            .get("/posts")
            .then((response) => {
                const posts = response.data.slice(0, 4);
                const updatedPost = posts.map((post) => {
                    return {
                        ...post,
                        author: "Deepti"
                    };
                });
                this.setState({ posts: updatedPost });
            })
            .catch((error) => {
                // this.setState({ error: true });
            });
    }
    postSelectedHandler = (id) => {
        // this.props.history.push("/" + id);
        this.props.history.push({ pathname: "/posts/" + id });
    };
    render() {
        let posts = <p>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map((post) => {
                return (
                    // <Link to={"/" + post.id}>

                    <Post
                        key={post.id}
                        title={post.title}
                        author={post.author}
                        clicked={() => this.postSelectedHandler(post.id)}
                    />
                    // </Link>
                );
            });
        }
        return (
            <div>
                <section className="Posts">{posts}</section>
                <Route
                    path={this.props.match.url + "/:id"}
                    exact
                    component={FullPost}
                />
            </div>
        );
    }
}
