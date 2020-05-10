import * as React from "react";
import {ReactElement, useContext, useEffect} from "react";
import {FormContext, IFormContext, TypeFieldNames, TypeMetadataNames} from "./form";
import {IValidation, IValidators} from "./validators";
import {FIELD_NAMES} from "./elements";


/** @internal */
interface IFormElementValidators {
    validators: any; // todo
    name: string;
    value: any;
    type: TypeMetadataNames;
    className?: string;
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
    const {validators = null, name, value = null, type} = props;
    const context: IFormContext = useContext(FormContext);
    const styles = !context.bare ? `alert mt-2 alert-danger ${props.className}` : props.className;
    if(context.metadata.inputs) {
        // Collect validators results before updating context
        let validationResults: Array<IValidation> = [];
        switch(type) {
            case "inputs": {
                validators.map((key: any, index: number) => {
                    validationResults = [...validationResults , validators[index](context.state[name], context)];
                });
                useEffect(() => {
                    context.updateFieldValidation(name, context.state[name], validationResults)
                }, [context.state]);
                if(context.metadata.inputs[name] && context.metadata.inputs[name].isTouched) {
                    return <ValidationResults results={validationResults} styles={styles} />;
                }
                return null;
            }
            case "files": {
                validators.map((key: any, index: number) => {
                    validationResults = [...validationResults , validators[index](name, context)];
                });
                useEffect(() => {
                    context.updateFieldValidation(name, context.state[name], validationResults, "files")
                }, [context.state]);
                if(context.metadata.files[name] && context.metadata.files[name].isTouched) {
                    return <ValidationResults results={validationResults} styles={styles} />;
                }
                return null;
            }
            default: {
                return null;
            }
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
export function getMetadataNameType(type: FIELD_NAMES): TypeMetadataNames {
    switch(type) {
        case FIELD_NAMES.TEXT: {
            return "inputs";
        }
        case FIELD_NAMES.EMAIL: {
            return "inputs";
        }
        case FIELD_NAMES.PASSWORD: {
            return "inputs";
        }
        case FIELD_NAMES.TEXTAREA: {
            return "inputs";
        }
        case FIELD_NAMES.RADIO: {
            return "fieldGroups";
        }
        case FIELD_NAMES.CHECKBOX: {
            return "fieldGroups";
        }
        case FIELD_NAMES.SELECT: {
            return "inputs";
        }
        case FIELD_NAMES.FILE: {
            return "files";
        }
        default: {
            return "inputs";
        }
    }
}
