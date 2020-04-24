import * as React from "react";
import {ReactElement} from "react";
import {FormConsumer} from "./form";

/** @internal */
type TypeHandler = (e: React.ChangeEvent<any>, name: string) => void;

/** @internal */
export function updateStateFromPassedInContext(parentState: any, setParentState: Function): TypeHandler {
    return (e: React.ChangeEvent<any>, name: string) => {
        setParentState({
           [name]: e.target.value,
        });
    };
}


/**
 * @internal
 * @param props
 * @constructor
 */
export const FormElementValidators = (props: any): ReactElement => {
    const {validators = null, name}: any = props;
    return (
        <FormConsumer>
            {(context: any) => {
                const styles = !context.bare ? `alert mt-2 alert-danger ${props.className}` : props.className;
                const fieldValue = context.state[name];
                if(!fieldValue) return null;
                return (
                    <>{validators.map((key: any, index: number) => {
                        const validationResult = validators[index](fieldValue);
                        return validationResult.messages.map((msg: string) => {
                            return <div className={styles}>{msg}</div>
                        });
                    })}</>
                );
            }}
        </FormConsumer>
    );
};
