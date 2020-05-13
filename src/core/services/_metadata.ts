//=================================================================
// PRIVATE CLASSES TO CREATE METADATA OBJECTS
//  1. AbstractMetadata
//  2. Metadata
//  3. MetadataGroup
//
//  IMPORTANT: Objects that implement AbstractMetadata DO NOT care about the IFormContext.
//  IMPORTANT: Metadata objects only care about their own IMetadata state type (see METADATA_NAMES).
//  IMPORTANT: Children objects of MetadataGroup care about their parent & their own state type only.
import {
    IFieldValidation,
    IInputFieldMetadata,
    METADATA_NAMES, TypeFieldValueTypes, TypeFormMetadata, TypeIFieldMetadata, TypeInputMetadata,
} from "../../form";
import {IValidation} from "../../validators";
import {getFieldValueType} from "../_helpers";
import {FIELD_NAMES} from "../../elements";

/** @internal **/
interface IMetadata<T> {
    state: {[k: string]: T};
    readonly updateState: Function;
    readonly metaType: string;
    fieldType: FIELD_NAMES;
    readonly parentName?: string;
    readonly name: string;
    defaultState: {};
    init: () => void;
    update: (props: any, validation: Array<IValidation>) => void;
}

/** @internal **/
export abstract class AbstractMetadata<T> implements IMetadata<T> {
    public state: {[k: string]: T};
    public readonly updateState: Function;
    public readonly metaType: METADATA_NAMES;
    private _fieldType: FIELD_NAMES;
    public readonly parentName?: string;
    private _name: string;
    public abstract defaultState: T;

    protected constructor(state: {[k: string]: T}, updateState: Function, metaType: METADATA_NAMES) {
        this.state = state;
        this.updateState = updateState;
        this.metaType = metaType;
    }

    get name() {
        return this._name;
    }

    set name(val: string) {
        this._name = val;
    }

    get fieldType() {
        return this._fieldType;
    }

    set fieldType(val: FIELD_NAMES) {
        this._fieldType = val;
    }

    abstract init(): void

    abstract update(props: any, validation: Array<IValidation>): void;

}

/** @internal **/
export class Metadata<T extends IFieldValidation> extends AbstractMetadata<T> {
    public defaultState: T;

    constructor(state: {[k: string]: T}, updateState: Function, type: METADATA_NAMES) {
       super(state, updateState, type);
    }

    public init(): void {
        // if(!this.state) {
        //     this.updateState(this.defaultState);
        // }
    }

    public update(value: any, validation: Array<IValidation>): void {
        let state: IFieldValidation;
        if(!(this.name in this.state)){
            state = {
                ...this.state,
                [this.name]: {
                    name: this.name,
                    validation,
                    isTouched: false,
                    fieldValues: {
                        type: getFieldValueType(this.fieldType),
                        currentValue: this.state[this.name].fieldValues.currentValue,
                    },
                },
            };
            this.updateState(state);
        } else if(this.state[this.name] && value !== this.state[this.name].fieldValues.currentValue) {
            state = {
                ...this.state,
                [this.name]: {
                    name: this.name,
                    validation,
                    fieldValues: {
                        type: getFieldValueType(this.fieldType),
                        currentValue: this.state[this.name].fieldValues.currentValue,
                    },
                    isTouched: false,
                },
            };
            this.updateState(state);
        }
    }
}

/** @internal **/
export class MetadataGroup<T> extends AbstractMetadata<T> {
    public defaultState = {} as T;
    public readonly parentName: string;

    constructor(state: {[k: string]: T}, updateState: Function, type: METADATA_NAMES) {
        super(state, updateState, type);
    }

    public init(): void {
        if(!this.state) {
            this.updateState(this.defaultState);
        }
    }

    public update(props: any, validation: Array<IValidation>): void {

    }
}
