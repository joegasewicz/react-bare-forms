// Internal functions - Context Updaters
// Methods to update & track the state of all inputs, validators & general form metadata
import {IValidation} from "./validators";
import {IRadioField} from "./elements";
import {
    IFileMetaData,
    IFormContext, IInputFieldMetadata,
    TypeMetadataNames,
    TypeMetadataTypes
} from "./form";


/** @internal */
type TypeUpdateValidation<T> = (updateData: T) => IFormContext;

/** @internal */
function _updateValidationContext<T>(context: IFormContext, type: TypeMetadataNames): TypeUpdateValidation<T> {
    return function(updateData: T) {
       return {
            ...context,
                metadata: {
                ...context.metadata,
                    [type]: {
                    ...context.metadata[type],
                    ...updateData,
                }
            },
        };
    }
}

/** @internal */
export const updateValidationMetadata = (context: any, update: any) => {
    return (fieldName: string, fieldValue: any, validations: Array<IValidation>, type: TypeMetadataNames = "inputs"): void => {
        const updateInput = _updateValidationContext<IInputFieldMetadata>(context, "inputs");
        const updateFieldGroup = _updateValidationContext<IInputFieldMetadata>(context, "fieldGroups");
        const updateFiles = _updateValidationContext<IFileMetaData>(context, "files");

        switch(type) {
            case "inputs": {
                if (!(fieldName in context.metadata.inputs) || context.metadata.inputs[fieldName].value !== fieldValue) {
                    let inputs = {
                        ...context.metadata.inputs,
                        [fieldName]: {
                            validation: validations,
                            value: fieldValue,
                            isTouched: !!fieldValue,
                        },
                    };
                    update(updateInput(inputs));
                }
                break;
            }
            case "fieldGroups": {
                if(!("" in context.metadata.fieldGroups) || context.metadata.fieldGroups[fieldName].value !== fieldValue) {
                    let fieldGroups = {
                        ...context.metadata.fieldGroups,
                        [fieldName]: {
                            validations: validations,
                            isTouched: true,
                        }
                    }
                    // update context
                }
                break;
            }
            case "files": {
                if(!(fieldName in context.metadata.files) || context.metadata.files[fieldName].value !== fieldValue) {
                    let files = {
                        ...context.metadata.files,
                        [fieldName]: {
                            validations: validations,
                            isTouched: true,
                        }
                    }
                }
                break;
            }
            default: {
                return null;
            }
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
        if(!(fieldGroupKey in context.metadata.fieldGroups) ||
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
