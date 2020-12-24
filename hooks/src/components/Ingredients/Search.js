import React, { useState, useEffect, useRef } from "react";

import Card from "../UI/Card";
import "./Search.css";
import useHttp from "../../hooks/http";
import ErrorModal from "../UI/ErrorModal";

const Search = React.memo((props) => {
    const { onLoadIngredients } = props;
    const [filterInput, setFilterInput] = useState("");
    const inputRef = useRef();
    const { isLoading, data, error, sendRequest, clear } = useHttp();

    useEffect(() => {
        const timer = setTimeout(() => {
            if (filterInput === inputRef.current.value) {
                const query =
                    filterInput.length === 0
                        ? ""
                        : `?orderBy="title"&equalTo="${filterInput}"`;
                sendRequest(
                    `https://react-hooks-ab937-default-rtdb.firebaseio.com/ingredients.json${query}`,
                    "GET"
                );
            }
        }, 500);
        return () => {
            clearTimeout(timer);
        };
    }, [filterInput, onLoadIngredients, inputRef]);

    useEffect(() => {
        if (!isLoading && !error && data) {
            const loadedIngredients = [];
            for (let key in data) {
                loadedIngredients.push({
                    id: key,
                    title: data[key].title,
                    amount: data[key].amount
                });
            }
            onLoadIngredients(loadedIngredients);
        }
    }, [data, isLoading, error, onLoadIngredients]);

    return (
        <section className="search">
            {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
            <Card>
                <div className="search-input">
                    <label>Filter by Title</label>
                    {isLoading && <span>Loading...</span>}
                    <input
                        type="text"
                        value={filterInput}
                        ref={inputRef}
                        onChange={(event) => setFilterInput(event.target.value)}
                    />
                </div>
            </Card>
        </section>
    );
});

export default Search;
