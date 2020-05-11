import * as React from "react";
import {ReactElement, useContext, useEffect} from "react";
import {FormContext, IFormContext, IRadioGroupChildren, METADATA_NAMES, TypeRadioGroup} from "../form";
import {IValidation} from "../validators";
import {FIELD_NAMES} from "../elements";


/** @internal */
interface IFormElementValidators {
    validators: Array<(...args: Array<any>) => IValidation>;
    name: string;
    value: any;
    type: METADATA_NAMES;
    className?: string;
    /* If a field is part of a group e.g Radio buttons then this is the name of parent field **/
    readonly parent?: string;
}
/** @internal */
type TypeValidationElement = { results: Array<IValidation>, styles: string };

/** @internal */
function ValidationResults(props: TypeValidationElement): ReactElement<TypeValidationElement> {
    const { results, styles } = props;
    return (<>{results.map((result: IValidation) =>
        result.messages.map((msg: string, index: number) =>
            <div key={index} className={styles}>{msg}</div>
        ))}</>);
}

/** @internal */
export const FormElementValidators = (props: IFormElementValidators): ReactElement => {
    const {validators = null, name, parent, type} = props;
    const context: IFormContext = useContext(FormContext);
    const styles = !context.bare ? `alert mt-2 alert-danger ${props.className}` : props.className;
    // Collect validators results before updating context
    let validationResults: Array<IValidation> = [];
    switch(type) {
        case METADATA_NAMES.INPUTS: {
            validators.map((key: any, index: number) => {
                validationResults = [...validationResults , validators[index](context.state[name], context)];
            });
            useEffect(() => {
                context.updateFieldValidation(name, context.state[name], validationResults, "inputs")
            }, [context]);
            if(context.metadata.inputs[name] && context.metadata.inputs[name].isTouched) {
                return <ValidationResults results={validationResults} styles={styles} />;
            }
            return null;
        }
        case METADATA_NAMES.FILES: {
            validators.map((key: any, index: number) => {
                validationResults = [...validationResults , validators[index](name, context)];
            });
            useEffect(() => {
                context.updateFieldValidation(name, context.state[name], validationResults, "files")
            }, [context]);
            if(context.metadata.files[name] && context.metadata.files[name].isTouched) {
                return <ValidationResults results={validationResults} styles={styles} />;
            }
            return null;
        }
        case METADATA_NAMES.FIELD_GROUPS: {
            validators.map((key: any, index: number) => {
                validationResults = [...validationResults , validators[index]([name, parent], context)];
            });
            useEffect(() => {
                context.updateFieldValidation(name, context.state[name], validationResults, "fieldGroups")
            }, [context]);

            const fieldGroups = context.metadata.fieldGroups[parent];
            if(fieldGroups) {
                // @ts-ignore TODO
                if(fieldGroups[name]) {
                    return <ValidationResults results={validationResults} styles={styles} />;
                }
            }
            return null;
        }
        case METADATA_NAMES.CHECKBOXES: {
            validators.map((key: any, index: number) => {
                validationResults = [...validationResults , validators[index](name, context)];
            });
            useEffect(() => {
                context.updateFieldValidation(name, context.state[name], validationResults, "checkboxes")
            }, [context]);
            if(context.metadata.checkboxes[name] && context.metadata.checkboxes[name].isTouched) {
                return <ValidationResults results={validationResults} styles={styles} />;
            }
            return null;
        }
        default: {
            return null;
        }
    }

};

/** @internal */
export function mergeDefaultCssWithProps(defaultValue: string, cssProps: any, bare: boolean): string {
    let cssStr = "";
    if(!bare) {
        cssStr += `${defaultValue} `;
    }
    if (cssProps) {
        cssStr += `${cssProps}`;
    }
    return cssStr;
}

/** @internal */
export function getMetadataNameType(type: FIELD_NAMES): METADATA_NAMES {
    switch(type) {
        case FIELD_NAMES.TEXT: {
            return METADATA_NAMES.INPUTS;
        }
        case FIELD_NAMES.EMAIL: {
            return METADATA_NAMES.INPUTS;
        }
        case FIELD_NAMES.PASSWORD: {
            return METADATA_NAMES.INPUTS;
        }
        case FIELD_NAMES.TEXTAREA: {
            return METADATA_NAMES.INPUTS;
        }
        case FIELD_NAMES.RADIO: {
            return METADATA_NAMES.FIELD_GROUPS;
        }
        case FIELD_NAMES.CHECKBOX: {
            return METADATA_NAMES.CHECKBOXES;
        }
        case FIELD_NAMES.SELECT: {
            return METADATA_NAMES.INPUTS;
        }
        case FIELD_NAMES.FILE: {
            return METADATA_NAMES.FILES;
        }
        default: {
            return METADATA_NAMES.INPUTS;
        }
    }
}
