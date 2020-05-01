// Context Updaters
// Methods to update & track the state of all inputs, validators & general form metadata
import {IValidation} from "./validators";
import {IRadioField} from "./form-elements";

/**
 * @internal
 * @param context
 * @param update
 */
export const updateValidationMetadata = (context: any, update: any) =>
    (fieldName: string, fieldValue: any, validation: IValidation): void => {
        if(typeof context.metadata === "undefined") {
            return;
        } else if(!(fieldName in context.metadata.inputs) || context.metadata.inputs[fieldName].value != fieldValue) {
            let contextUpdates = {
                ...context,
                metadata: {
                    ...context.metadata,
                    inputs: {
                      ...context.metadata.inputs,
                        [fieldName]: {
                            ...validation,
                            value: fieldValue,
                            isTouched: true,
                        }
                    },
                },
            };
            update(contextUpdates);
        }
    };

/**
 * @internal
 * @param radioProps
 * @private
 */
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

/**
 * @internal
 * @param context
 * @param update
 */
export function updateRadioGroupMetadata(context: any, update: any) {
    return (fieldGroupKey: string, radioProps: Array<{ props: IRadioField}>) => {
        if(typeof context.metadata === "undefined" || fieldGroupKey in context.metadata.fieldGroups) {
            return;
        }
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
