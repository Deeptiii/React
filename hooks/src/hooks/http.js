import { useReducer, useCallback } from "react";

const initialState = {
    loading: false,
    error: null,
    data: null,
    extra: null,
    identifier: null
};

const httpReducer = (currState, action) => {
    switch (action.type) {
        case "SEND":
            return {
                loading: true,
                error: null,
                data: null,
                extra: null,
                identifier: null
            };
        case "RESPONSE":
            return {
                ...currState,
                loading: false,
                data: action.responseData,
                extra: action.extra,
                identifier: action.identifier
            };
        case "ERROR":
            return { loading: false, error: action.error };
        case "CLEAR":
            return initialState;
        default:
            throw new Error("something went wrong");
    }
};

const useHttp = () => {
    const [httpState, dispatchHttp] = useReducer(httpReducer, initialState);

    const clear = useCallback(() => dispatchHttp({ type: "CLEAR" }));

    const sendRequest = useCallback(
        (url, method, body, reqExtra, reqIdentifier) => {
            dispatchHttp({ type: "SEND" });
            fetch(url, {
                method: method,
                body: body,
                headers: {
                    "Content-Type": "application/json"
                }
            })
                .then((response) => {
                    return response.json();
                })
                .then((responseData) => {
                    dispatchHttp({
                        type: "RESPONSE",
                        responseData: responseData,
                        extra: reqExtra,
                        identifier: reqIdentifier
                    });
                })
                .catch((error) => {
                    dispatchHttp({
                        type: "ERROR",
                        error: "Something went wrong"
                    });
                });
        },
        []
    );

    return {
        isLoading: httpState.loading,
        data: httpState.data,
        error: httpState.error,
        sendRequest: sendRequest,
        reqExtra: httpState.extra,
        identifier: httpState.identifier,
        clear: clear
    };
};

export default useHttp;
