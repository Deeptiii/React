import React, { useReducer, useEffect, useCallback, useMemo } from "react";

import IngredientForm from "./IngredientForm";
import IngredientList from "./IngredientList";
import Search from "./Search";
import ErrorModal from "../UI/ErrorModal";
import useHttp from "../../hooks/http";

const ingredientReducer = (currentIngredients, action) => {
    switch (action.type) {
        case "SET":
            return action.ingredients;
        case "ADD":
            return [...currentIngredients, action.ingredient];
        case "DELETE":
            return currentIngredients.filter((ing) => ing.id !== action.id);

        default:
            throw new Error("something went wrong");
    }
};

const Ingredients = () => {
    const [ingredients, dispatch] = useReducer(ingredientReducer, []);
    const {
        isLoading,
        error,
        data,
        sendRequest,
        reqExtra,
        identifier,
        clear
    } = useHttp();

    // const [ingredients, setIngredients] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);
    // const [error, setError] = useState();

    useEffect(() => {
        if (identifier === "DELETE") {
            dispatch({ type: "DELETE", id: reqExtra });
        } else if (identifier === "ADD") {
            dispatch({
                type: "ADD",
                ingredient: { id: data.name, ...reqExtra }
            });
        }
        console.log("lello", ingredients);
        // dispatch({ type: "DELETE", id: reqExtra });
    }, [data, reqExtra, identifier]);

    const addIngredientHandler = useCallback(
        (ingredient) => {
            sendRequest(
                `https://react-hooks-ab937-default-rtdb.firebaseio.com/ingredients.json`,
                "POST",
                JSON.stringify(ingredient),
                ingredient,
                "ADD"
            );
        },
        [sendRequest]
    );
    const removeIngredientHandler = useCallback(
        (id) => {
            sendRequest(
                `https://react-hooks-ab937-default-rtdb.firebaseio.com/ingredients/${id}.json`,
                "DELETE",
                null,
                id,
                "DELETE"
            );
        },
        [sendRequest]
    );

    const filteredIngredientsHandlers = useCallback((filteredIngredients) => {
        // setIngredients(filteredIngredients);
        dispatch({ type: "SET", ingredients: filteredIngredients });
    }, []);

    const ingredientList = useMemo(() => {
        return (
            <IngredientList
                ingredients={ingredients}
                onRemoveItem={removeIngredientHandler}
            />
        );
    }, [ingredients]);

    return (
        <div className="App">
            {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}
            <IngredientForm
                onAddIngredient={addIngredientHandler}
                loading={isLoading}
            />

            <section>
                <Search onLoadIngredients={filteredIngredientsHandlers} />
                {ingredientList}
            </section>
        </div>
    );
};

export default Ingredients;
