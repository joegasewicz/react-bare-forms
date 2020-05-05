// Context Updaters
// Methods to update & track the state of all inputs, validators & general form metadata
import {IValidation} from "./validators";
import {IRadioField} from "./form-elements";
import {useEffect} from "react";

/** @internal */
export const updateValidationMetadata = (context: any, update: any) => {

    return (fieldName: string, fieldValue: any, validation: IValidation): void => {

        console.log("props 1---------> ", fieldName)
        console.log("props 2---------> ", fieldValue)
        console.log("props 3---------> ", validation)
        console.log("props 4---------> ", context.metadata.inputs)


        if (typeof context.metadata === "undefined") {
            return;
        } else if (!(fieldName in context.metadata.inputs) || context.metadata.inputs[fieldName].value !== fieldValue) {
            let contextUpdates = {
                ...context,
                metadata: {
                    ...context.metadata,
                    inputs: {
                        ...context.metadata.inputs,
                        [fieldName]: {
                            ...validation,
                            value: fieldValue,
                            isTouched: !!fieldValue,
                        }
                    },
                },
            };
            update(contextUpdates);
        }
    };
};

/** @internal */
function _addFieldGroupToMetadata(radioProps: Array<{ props: IRadioField}>) {
    let fieldGroups = {};
    for(let radioVal of radioProps) {
        fieldGroups = {
            ...fieldGroups,
            [radioVal.props.name]: {
                name: radioVal.props.name,
                isChecked: radioVal.props.checked,
                disabled: radioVal.props.disabled || false,
            }

        }
    }
    return fieldGroups;
}

/** @internal */
export function shouldUpdateRadioGroupContext(radioProps: Array<{ props: IRadioField}>, context: any, fieldGroupKey: string) {
    for(let radio of radioProps) {
        let radioContext = context.metadata.fieldGroups[fieldGroupKey][radio.props.name];
        let radioState = radio.props;
        if(radioContext.isChecked !== radioState.checked) {
            return true;
        }
    }
}

/** @internal */
// This function will be called nth (the length of radioProps) times
// but will only update the context once per radio field group
export function updateRadioGroupMetadata(context: any, update: any) {
    return (fieldGroupKey: string, radioProps: Array<{ props: IRadioField}>) => {
        if(typeof context.metadata === "undefined") {
            return;
        } else if(!(fieldGroupKey in context.metadata.fieldGroups) ||
            fieldGroupKey in context.metadata.fieldGroups && shouldUpdateRadioGroupContext(radioProps, context, fieldGroupKey)) {
            let contextUpdates = {
                ...context,
                metadata: {
                    ...context.metadata,
                    fieldGroups: {
                        ...context.metadata.fieldGroups,
                        [fieldGroupKey]: _addFieldGroupToMetadata(radioProps),
                    }
                }
            };
            update(contextUpdates);
        }
    }
}
