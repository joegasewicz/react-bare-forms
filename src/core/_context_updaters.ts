// Internal functions - Context Updaters
// Methods to update & track the state of all inputs, validators & general form metadata
import {IValidation} from "../validators";
import {IRadioField} from "../elements";
import {ICheckBoxesMetadata, IFileMetaData, IFormContext, IInputFieldMetadata, TypeMetadataNames,} from "../form";
import {IFile} from "./_file";


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
               },
           },
       };
    }
}

/** @internal */
function _isMatch(name: string, file: IFile, context: IFormContext): boolean {
    // Theres a bug here that makes file update twice, the second time wipes our all the data ..
    let fileInMetadata = context.metadata.files[name].file;
    if(!fileInMetadata && file || fileInMetadata && !file) return true;
    if(fileInMetadata) {
        if(fileInMetadata.name !== file.name) {
            return true;
        }
        // In case the user has duplicate filenames in different directories
        // we also coerce against the lastModified values.
        // @ts-ignore
        if(fileInMetadata.lastModified !== file.lastModified) {
            return true;
        }
    }
    return false;
}

/** @internal */
export const updateValidationMetadata = (context: any, update: any) => {
    /**
     * @param match
     *      - For input fields this is the passed value.
     *      - For Files this is the ReactRef.
     * @param name
     *      - For inputs & file inputs this is the name passed by the caller
     */
    return (name: string, match: any, validations: Array<IValidation>, type: TypeMetadataNames): void => {
        // Metadata field update types
        const updateInput = _updateValidationContext<IInputFieldMetadata>(context, "inputs");
        const updateFiles = _updateValidationContext<IFileMetaData>(context, "files");
        const updateCheckboxes = _updateValidationContext<ICheckBoxesMetadata>(context, "checkboxes");

        switch(type) {
            case "inputs": {
                if (!(name in context.metadata.inputs) || context.metadata.inputs[name].value !== match) {
                    let inputs = {
                        ...context.metadata.inputs,
                        [name]: {
                            validation: validations,
                            value: match,
                            isTouched: !!match,
                        },
                    };
                    const updatedData = updateInput(inputs);
                    update(updatedData);
                }
                break;
            }
            case "files": {
                if(!(name in context.metadata.files) || _isMatch(name, match, context)) {
                    let files = {
                        ...context.metadata.files,
                        [name]: {
                            validations: validations,
                            isTouched: name in context.metadata.files,
                            file: match,
                            refName: name,
                        }
                    };
                    update(updateFiles(files));
                }
                break;
            }
            case "checkboxes": {
                if(!(name in context.metadata.checkboxes) || context.metadata.checkboxes[name].isChecked !== match) {
                    let checkboxes = {
                        ...context.metadata.checkboxes,
                        [name]: {
                            validations: validations,
                            isTouched: name in context.metadata.checkboxes,
                            isChecked: match,
                        }
                    };
                    update(updateCheckboxes(checkboxes));
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
                validation: radioVal.props.validators
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
