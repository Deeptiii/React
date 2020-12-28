import React from "react";
import Modal from "../../components/UI/Modal/Modal";
import Aux from "../_Aux/_Aux";
import useHttpErrorHandler from "../../hooks/httpErrorHandler";

function withErrorHandler(WrapperComponent, axios) {
    return (props) => {
        const [error, clearError] = useHttpErrorHandler(axios);

        return (
            <Aux>
                <Modal show={error} modalClosed={clearError}>
                    {error ? error.message : null}
                </Modal>
                <WrapperComponent {...props} />
            </Aux>
        );
    };
}

export default withErrorHandler;
