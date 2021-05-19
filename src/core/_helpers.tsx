import * as React from "react";

import {METADATA_NAMES, TypeFieldValueTypes} from "../form";
import {FIELD_NAMES} from "../elements";



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
            return METADATA_NAMES.RADIO_GROUPS;
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
        case FIELD_NAMES.RADIO: {
            return "checked"
        }
        default: {
            return "value";
        }
    }
}

/** @internal */
export function isChar(charCode: number) {
    const charCodeStart = 48; // 0
    const charCodeEnd = 90; // z
    return charCode >= charCodeStart && charCodeEnd <= charCodeEnd;
}
