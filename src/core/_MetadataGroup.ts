import {IRadioGroupParentContext, METADATA_NAMES} from "../form";
import {IValidation} from "../validators";
import {getFieldValueType} from "./index";
import {FIELD_NAMES} from "../elements";
import {AbstractMetadata} from "./_AbstractMetadata";
import {TypeMetadataRadioGroupValue} from "../field_classes/_RadioField";
import { useEffect } from "react";


/** @internal **/
export class MetadataGroup<T> extends AbstractMetadata<T> {
    public defaultState = {} as T;
    public parentName?: string;

    constructor(state: {[k: string]: T}, updateState: Function, type: METADATA_NAMES) {
        super(state, updateState, type);
    }

    public init(name: string, fieldType: FIELD_NAMES): void {
        this.name = name;
        this.fieldType = fieldType;
    }

    /**
     * @internal
     * @param current
     * @param validation
     * @param isTouched {Boolean} - Set this to false on init
     * @private
     */
    private _createGroupState(current: TypeMetadataRadioGroupValue, validation: Array<IValidation>, isTouched=true): IRadioGroupParentContext {
        return {
            ...this.state,
            [current.parentName]: {
                ...this.state[current.parentName],
                [this.name]: {
                    parent: current.parentName,
                    name: this.name,
                    validation: validation || [],
                    isTouched,
                    fieldValues: {
                        type: getFieldValueType(this.fieldType),
                        value: current.value,
                    },
                },
            },
        };
    }

    /** @internal */
    public update(current: TypeMetadataRadioGroupValue, validation: Array<IValidation>): void {
        let state = {};
        if(!this.state[current.parentName]) {
            state = this._createGroupState(current, validation, false);
            useEffect(() => {
                this.updateState(state);
            });
        } else if(this.state[current.parentName] && !(this.name in this.state[current.parentName])) {
            // For readability - keep this clause & the next, separate please
            state = this._createGroupState(current, validation);
            useEffect(() => {
                this.updateState(state);
            });
        } else if((this.state[current.parentName] as any)[this.name] &&
            (this.state[current.parentName] as any)[this.name].fieldValues.value !== current.value) {
            state = this._createGroupState(current, validation);
            useEffect(() => {
                this.updateState(state);
            });
        }
    }

    public isFieldTouched(): boolean {
        let parentState = (this.state);
        if(parentState) {
            if(this.parentName && this.name && this.state[this.parentName]) {
                let metaGroup = (this.state[this.parentName] as any)[this.name as keyof T];
                if(metaGroup) return metaGroup.isTouched;
            }
        }
        return false;
    }
}
