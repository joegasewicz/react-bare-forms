import * as React from "react";
import {ReactElement} from "react";
import {METADATA_NAMES, TypeFieldValueTypes, TypeFormMetadata} from "../form";
import {IValidation} from "../validators";
import {FIELD_NAMES} from "../elements";
import {AbstractMetadata} from "../classes/_AbstractMetadata";


/** @internal */
interface IFormElementValidators {
    validators: Array<(...args: Array<any>) => IValidation>;
    name: string;
    value: any;
    type: METADATA_NAMES;
    className?: string;
    /* If a field is part of a group e.g Radio buttons then this is the name of parent field **/
    readonly parent?: string;
    metadata: AbstractMetadata<TypeFormMetadata>;
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
        // case FIELD_NAMES.RADIO: {
        //     return METADATA_NAMES.RADIO_GROUPS;
        // }
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

/** @internal */
export function getFieldValueType(type: FIELD_NAMES): TypeFieldValueTypes {
    switch(type) {
        case FIELD_NAMES.TEXT: {
            return "value";
        }
        case FIELD_NAMES.EMAIL: {
            return "value";
        }
        case FIELD_NAMES.PASSWORD: {
            return "value";
        }
        case FIELD_NAMES.TEXTAREA: {
            return "value";
        }
        case FIELD_NAMES.CHECKBOX: {
            return "checked";
        }
        case FIELD_NAMES.SELECT: {
            return "value";
        }
        case FIELD_NAMES.FILE: {
            return "file";
        }
        default: {
            return "value";
        }
    }
}
