import * as React from "react";
import {ReactElement} from "react";
import {FormConsumer} from "./form";

/**
 * @internal
 * @param props
 * @constructor
 */
export const FormElementValidators = (props: any): ReactElement => {
    const {validators = null, name}: any = props;
    return (
        <>
            <FormConsumer>
                {(context: any) => {
                    const styles = !context.bare ? `alert mt-2 alert-danger ${props.className}` : props.className;
                    if(!context.state[name]) {
                        return null;
                    }
                    return (
                        <>{validators.map((key: any, index: number) => {
                            const validationResult = validators[index](context.state[name], context);
                            return validationResult.messages.map((msg: string) => {
                                return <div className={styles}>{msg}</div>
                            });
                        })}</>
                    );
                }}
            </FormConsumer>
        </>
    );
};
