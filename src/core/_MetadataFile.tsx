import {IFieldValidation, METADATA_NAMES} from "../form";
import {IValidation} from "../validators";
import {getFieldValueType, IFile} from "./index";
import {FIELD_NAMES} from "../elements";
import {AbstractMetadata} from "./_AbstractMetadata";
import { useEffect } from "react";


/** @internal **/
export class MetadataFile<T extends IFieldValidation> extends AbstractMetadata<T> {
    public defaultState = {} as any;

    constructor(state: {[k: string]: T}, updateState: Function, type: METADATA_NAMES) {
        super(state, updateState, type);
    }

    public init(name: string, fieldType: FIELD_NAMES): void {
        this.name = name;
        this.fieldType = fieldType;
    }

    public update(value: any, validation: Array<IValidation>, name: string): void {
        let state: {[k: string]: IFieldValidation};
        if(!(name in this.state)){
            state = {
                ...this.state,
                [name]: {
                    name,
                    validation,
                    isTouched: false,
                    fieldValues: {
                        type: getFieldValueType(this.fieldType),
                        currentValue: {},
                    },
                },
            };
            useEffect(() => {
               this.updateState(state);
            }, [state])
        } else if(this.state[name]) {
            let currentValue: IFile = this.state[name].fieldValues.currentValue;
            if(value === null && Object.keys(currentValue).length || value && value.name !== currentValue.name) {
                state = {
                    ...this.state,
                    [name]: {
                        name,
                        validation,
                        fieldValues: {
                            type: getFieldValueType(this.fieldType),
                            currentValue: value || {},
                        },
                        isTouched: true,
                    },
                };
                this.updateState(state);
            }
        }
    }
}
