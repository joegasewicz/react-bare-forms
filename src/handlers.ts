import {ChangeEvent, SyntheticEvent, useContext, useState} from "react";
import {FormContext, FormState, FormType, IFormContext, IFormState} from "./form";

export function handleSubmit(e: SyntheticEvent, localState: IFormContext, updateState: any) {
    e.preventDefault();
    let currentErrors: Array<string> = [];

    if(localState.formKey && localState.state) {
        const formData = localState.state[localState.formKey];

        if (formData) {
            Object.keys(formData).map((key) => {

                if(!formData[key] || formData[key] === "") {
                    const currentError = `Missing ${key} details.`;
                    currentErrors = [...currentErrors, currentError];
                    updateState({
                        ...localState,
                        formErrors: currentErrors,
                    });
                }
            });

            if(currentErrors.length) {
                alert("ERRORS!")
            } else {
                alert("Submitted Success!");
            }
        }
    }

}



/**
 *
 * @param name
 */
export const handleChange = <T, K extends keyof IFormState>(name: K) => {
    const currentState: any = useContext(FormContext);
    const [_, updateState] = useState(currentState);
    if(currentState) {
        return (e: ChangeEvent<FormType>): void => {
            updateState({
                ...currentState,
                formData: {
                    ...currentState[name],
                    [name]: (e.target.value as any)
                } as FormState<IFormState>
            });
        }
    }
};
